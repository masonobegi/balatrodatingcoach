"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { ChartCanvas } from "./chart-canvas";
import { GedcomImport } from "./gedcom-import";
import { PersonField } from "./person-field";
import { StyleControls } from "./style-controls";
import { fullRelationLabel, GENERATION_HEADINGS } from "@/lib/chart/relations";
import {
  type ChartDocument,
  type PeopleMap,
  type Person,
  MAX_GENERATIONS,
  MIN_GENERATIONS,
  countFilled,
  emptyDocument,
  generationRange,
  isEmptyPerson,
  slotsInGeneration,
  totalSlots,
} from "@/lib/chart/types";
import { MAX_TREE_GENERATIONS } from "@/lib/chart/layout-tree";
import { track } from "@/lib/analytics";
import { PRINT_VARIANTS, formatMoneyShort } from "@/lib/pricing";

const LOCAL_KEY = "kinline_draft_v1";

/**
 * The chart builder.
 *
 * The single biggest unvalidated assumption in this business is whether a gift
 * buyer will type in fifteen names. Every decision here is aimed at that:
 *
 *  · Generations are revealed one at a time. Fifteen empty boxes at once reads
 *    as homework; four boxes with a heading reads as a question you can answer.
 *  · The preview updates on every keystroke, so the reward arrives before the
 *    work is finished rather than after it.
 *  · Nothing is gated. No signup, no email wall, no "unlock your preview".
 *  · Progress is stated in names, not percentages, and skipping is explicitly
 *    encouraged — gaps are a designed part of the artwork, not a failure state.
 *  · Everything saves locally on every change, so a closed tab is never a loss.
 */
export function Builder({ initial }: { initial?: ChartDocument & { id?: string; token?: string } }) {
  const [doc, setDoc] = useState<ChartDocument>(() => initial ?? emptyDocument());
  const [chartId, setChartId] = useState<string | undefined>(initial?.id);
  const [token, setToken] = useState<string | undefined>(initial?.token);
  const [visibleGen, setVisibleGen] = useState(() =>
    initial && countFilled(initial.people, initial.config.generations) > 1 ? initial.config.generations : 1,
  );
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const startedRef = useRef(false);
  const namedRef = useRef(false);
  const completedRef = useRef(false);

  // ---- Restore a local draft ---------------------------------------------
  useEffect(() => {
    if (initial) return;
    try {
      const raw = window.localStorage.getItem(LOCAL_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { doc: ChartDocument; id?: string; token?: string };
      if (parsed?.doc?.config && parsed?.doc?.people) {
        setDoc(parsed.doc);
        setChartId(parsed.id);
        setToken(parsed.token);
        const filled = countFilled(parsed.doc.people, parsed.doc.config.generations);
        if (filled > 1) setVisibleGen(parsed.doc.config.generations);
      }
    } catch {
      // A corrupt draft must never block the builder.
    }
  }, [initial]);

  const filled = countFilled(doc.people, doc.config.generations);
  const capacity = totalSlots(doc.config.generations);

  // ---- Persistence --------------------------------------------------------
  const persist = useCallback(
    async (next: ChartDocument, id: string | undefined) => {
      try {
        window.localStorage.setItem(LOCAL_KEY, JSON.stringify({ doc: next, id, token }));
      } catch {
        // Storage full or blocked — the server save below still covers us.
      }

      setSaveState("saving");
      try {
        const res = await fetch("/api/charts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, config: next.config, people: next.people }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as { id: string; token: string };
        setChartId(json.id);
        setToken(json.token);
        try {
          window.localStorage.setItem(
            LOCAL_KEY,
            JSON.stringify({ doc: next, id: json.id, token: json.token }),
          );
        } catch {
          /* ignore */
        }
        setSaveState("saved");
      } catch {
        // The local copy is authoritative for the customer's peace of mind.
        setSaveState("error");
      }
    },
    [token],
  );

  // Debounced autosave. Typing a name should not fire a request per keystroke.
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (filled === 0) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => void persist(doc, chartId), 1200);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // chartId is intentionally excluded: it changes as a *result* of saving,
    // and including it would queue a second save for every first save.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, filled, persist]);

  // ---- Funnel instrumentation --------------------------------------------
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("builder_started");
    }
  }, []);

  useEffect(() => {
    if (!namedRef.current && filled >= 1) {
      namedRef.current = true;
      track("person_named", { chartId });
    }
    // "Completed" means the chart is worth printing, not that every slot is
    // full — nobody fills every slot, and treating that as the goal would make
    // the metric useless.
    if (!completedRef.current && filled >= 7) {
      completedRef.current = true;
      track("builder_completed", { chartId, props: { filled } });
    }
  }, [filled, chartId]);

  // ---- Mutators -----------------------------------------------------------
  const setPerson = (n: number, person: Person) => {
    setDoc((d) => {
      const people = { ...d.people };
      if (isEmptyPerson(person)) delete people[n];
      else people[n] = person;
      return { ...d, people };
    });
  };

  const patchConfig = (patch: Partial<ChartDocument["config"]>) => {
    setDoc((d) => {
      const config = { ...d.config, ...patch };
      // The tree style cannot carry more than five generations legibly, so
      // switching to it clamps depth rather than silently truncating the chart.
      if (config.style === "tree" && config.generations > MAX_TREE_GENERATIONS) {
        config.generations = MAX_TREE_GENERATIONS;
      }
      return { ...d, config };
    });
  };

  const maxGenForStyle =
    doc.config.style === "tree" ? MAX_TREE_GENERATIONS : MAX_GENERATIONS;

  /**
   * Replaces the chart from an imported GEDCOM. Reveals every generation at
   * once, because an importer is not being walked through anything — they
   * already have the data and want to see it laid out.
   */
  const importFromGedcom = (people: PeopleMap, rootLabel: string) => {
    setDoc((d) => {
      const deepest = Object.keys(people).reduce(
        (max, key) => Math.max(max, Math.floor(Math.log2(Number(key))) + 1),
        1,
      );
      const generations = Math.min(Math.max(deepest, MIN_GENERATIONS), maxGenForStyle);
      const surname = rootLabel.split("(")[0]?.trim().split(/\s+/).pop() ?? "";
      return {
        config: {
          ...d.config,
          generations,
          title: d.config.title || (surname ? `The ${surname} Family` : d.config.title),
        },
        people,
      };
    });
    setVisibleGen(maxGenForStyle);
  };

  const revealNext = () => {
    const next = Math.min(visibleGen + 1, maxGenForStyle);
    setVisibleGen(next);
    if (next > doc.config.generations) patchConfig({ generations: next });
  };

  const generations = useMemo(
    () => Array.from({ length: visibleGen }, (_, i) => i + 1),
    [visibleGen],
  );

  const canReveal = visibleGen < maxGenForStyle;
  const readyToBuy = filled >= 3;
  const variant = PRINT_VARIANTS[doc.config.size];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      {/*
        Mobile order matters more than it looks. The preview must come first —
        it is the reason anyone keeps going — but a full-width poster preview
        pushes the first input below the fold, and the style controls have no
        business appearing before a single name has been typed. So on small
        screens the right-hand column becomes `display: contents`, letting its
        two halves take their own places in the flex order:
        compact preview → name fields → controls → buy.
      */}
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
        {/* ------------------------------------------------------ Form column */}
        <div className="order-2 lg:order-1">
          <header>
            <h1 className="text-3xl sm:text-4xl">Build your chart</h1>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
              One person, then their parents, then their grandparents. Seven names is a
              finished chart — you don't need your whole family history, and there are
              no siblings or cousins to fill in. Skip anything you don't know; the chart
              leaves a space for them.
            </p>
          </header>

          <div className="mt-7 space-y-10">
            {generations.map((g) => {
              const [first] = generationRange(g);
              const slots = slotsInGeneration(g);
              const heading = GENERATION_HEADINGS[g];
              const numbers = Array.from({ length: slots }, (_, i) => first + i);

              return (
                <section key={g} aria-labelledby={`gen-${g}`}>
                  <h2 id={`gen-${g}`} className="text-2xl">
                    {heading?.title ?? `Generation ${g}`}
                  </h2>
                  {heading?.hint ? (
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-muted">
                      {heading.hint}
                    </p>
                  ) : null}

                  <div
                    className={`mt-4 grid gap-3 ${
                      slots > 1 ? "sm:grid-cols-2" : "max-w-md"
                    }`}
                  >
                    {numbers.map((n, i) => (
                      <PersonField
                        key={n}
                        label={fullRelationLabel(n)}
                        person={doc.people[n]}
                        onChange={(p) => setPerson(n, p)}
                        autoFocus={g === 1 && i === 0 && filled === 0}
                        showDates={doc.config.showDates}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {canReveal ? (
            <div className="mt-8">
              <button
                type="button"
                onClick={revealNext}
                className="btn btn-secondary w-full flex-wrap sm:w-auto"
              >
                <span>Add {GENERATION_HEADINGS[visibleGen + 1]?.title.toLowerCase() ?? "another generation"}</span>
                <span className="text-ink-muted">
                  +{slotsInGeneration(visibleGen + 1)}
                </span>
              </button>
              <p className="mt-2.5 text-sm text-ink-muted">
                You can stop whenever you like. Most charts given as gifts have three or
                four generations.
              </p>
            </div>
          ) : (
            <p className="mt-8 text-sm text-ink-muted">
              That's as far as {doc.config.style === "tree" ? "a tree" : "a fan chart"} goes
              {doc.config.style === "tree"
                ? " — switch to the fan for up to seven generations."
                : "."}
            </p>
          )}

          <GedcomImport generations={doc.config.generations} onImport={importFromGedcom} />
        </div>

        {/* --------------------------------------------------- Preview column */}
        <div className="contents lg:sticky lg:top-6 lg:order-2 lg:block lg:self-start">
          <div className="order-1">
            <ChartCanvas doc={doc} className="mx-auto max-w-[14rem] sm:max-w-xs lg:max-w-none" />

            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <p className="text-ink-muted">
                {/*
                  Deliberately NOT "3 of 15". Naming a denominator turns a
                  gift into an assignment, and the single biggest risk in this
                  business is the buyer deciding this is too much work.
                */}
                <strong className="font-semibold text-ink">{filled}</strong>{" "}
                {filled === 1 ? "name" : "names"} so far
              </p>
              <SaveIndicator state={saveState} />
            </div>
          </div>

          <div className="order-3 lg:mt-0">
            <StyleControls
              config={doc.config}
              onChange={patchConfig}
              maxGenerations={maxGenForStyle}
            />

            <div className="mt-6 card p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl">{variant.label}</p>
                <p className="font-display text-2xl text-walnut">
                  {formatMoneyShort(variant.price)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{variant.blurb}</p>

              <Link
                href={chartId ? `/checkout?chart=${chartId}` : "#"}
                aria-disabled={!readyToBuy || !chartId}
                onClick={(e) => {
                  if (!readyToBuy || !chartId) {
                    e.preventDefault();
                    return;
                  }
                  track("checkout_started", { chartId, props: { filled, size: doc.config.size } });
                }}
                className={`btn btn-primary mt-4 w-full ${
                  !readyToBuy || !chartId ? "pointer-events-none opacity-45" : ""
                }`}
              >
                {readyToBuy ? "Continue to checkout" : "Add a few more names"}
              </Link>

              {token ? (
                <ShareLink token={token} chartId={chartId} />
              ) : (
                <p className="mt-3 text-center text-xs text-ink-muted">
                  Your chart saves itself as you type.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveIndicator({ state }: { state: "idle" | "saving" | "saved" | "error" }) {
  const text =
    state === "saving"
      ? "Saving…"
      : state === "saved"
        ? "Saved"
        : state === "error"
          ? "Saved on this device"
          : "";
  if (!text) return null;
  return (
    <p className="text-ink-muted" aria-live="polite">
      {text}
    </p>
  );
}

/**
 * The share link is the growth loop, not a convenience feature. A builder who
 * cannot remember a great-grandmother's maiden name has a real reason to send
 * this to a relative — and that relative sees a chart of their own family.
 */
function ShareLink({ token, chartId }: { token: string; chartId?: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/chart/${token}` : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share_link_copied", { chartId });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard denied — the input below is selectable as a fallback.
    }
  };

  return (
    <div className="mt-5 border-t border-rule pt-4">
      <p className="text-sm font-semibold text-ink">Stuck on a name?</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
        Send this link to a relative and they can check it with you.
      </p>
      <div className="mt-2.5 flex gap-2">
        <input
          readOnly
          value={url}
          aria-label="Shareable chart link"
          onFocus={(e) => e.currentTarget.select()}
          className="field !py-2 !text-sm !font-sans"
        />
        <button type="button" onClick={copy} className="btn btn-secondary !px-3 !py-2 text-sm">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
