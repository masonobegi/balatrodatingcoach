"use client";

import { useRef, useState } from "react";

import { buildAncestry, parseGedcom, suggestRoots, MAX_GEDCOM_BYTES, type RootCandidate } from "@/lib/chart/gedcom";
import type { PeopleMap } from "@/lib/chart/types";
import { MAX_GENERATIONS } from "@/lib/chart/types";
import { track } from "@/lib/analytics";

/**
 * GEDCOM import for the family-historian segment.
 *
 * Parsed entirely in the browser. The parser is pure TypeScript, so there is no
 * reason to upload the file — and three good reasons not to. A GEDCOM contains
 * hundreds of living relatives who never consented to anything; it can be
 * several megabytes; and "your file never leaves this browser" is both true and
 * the most reassuring thing we can say to the one segment most likely to ask.
 *
 * This is deliberately secondary. It sits behind a disclosure, below the manual
 * fields, because the primary customer has never heard of a GEDCOM and showing
 * her a file upload first would suggest she is in the wrong place.
 */
export function GedcomImport({
  onImport,
  generations,
}: {
  onImport: (people: PeopleMap, rootLabel: string) => void;
  generations: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [roots, setRoots] = useState<RootCandidate[] | null>(null);
  const [parsed, setParsed] = useState<ReturnType<typeof parseGedcom> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    setBusy(true);
    setRoots(null);

    try {
      if (file.size > MAX_GEDCOM_BYTES) {
        setError(
          `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB, which is larger than we can read here. Export a smaller branch of your tree and try again.`,
        );
        track("gedcom_failed", { props: { reason: "too_large", size: file.size } });
        return;
      }

      const text = await file.text();
      const result = parseGedcom(text);

      if (result.individuals.length === 0) {
        setError(
          "We couldn't find anybody in that file. It should be a .ged export from Ancestry, MyHeritage, FamilySearch, Gramps or similar.",
        );
        track("gedcom_failed", { props: { reason: "no_individuals" } });
        return;
      }

      const candidates = suggestRoots(result, 25);
      setParsed(result);
      setRoots(candidates);
      track("gedcom_uploaded", {
        props: { individuals: result.individuals.length, families: result.families.size },
      });
    } catch {
      setError("We couldn't read that file. It may be corrupted or in an unusual format.");
      track("gedcom_failed", { props: { reason: "exception" } });
    } finally {
      setBusy(false);
    }
  };

  const choose = (candidate: RootCandidate) => {
    if (!parsed) return;
    const people = buildAncestry(parsed, candidate.id, Math.min(generations, MAX_GENERATIONS));
    onImport(people, candidate.label);
    setRoots(null);
    setParsed(null);
  };

  return (
    <details className="card mt-10 p-5">
      <summary className="cursor-pointer text-[0.9375rem] font-semibold">
        Already have your tree in Ancestry, MyHeritage or FamilySearch?
      </summary>

      <div className="mt-4">
        <p className="text-sm leading-relaxed text-ink-muted">
          Export a GEDCOM (<code>.ged</code>) file and we'll fill the chart in for you.
          The file is read here in your browser and never uploaded to us.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".ged,.gedcom,text/plain"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />

        <button
          type="button"
          className="btn btn-secondary mt-4"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? "Reading…" : "Choose a GEDCOM file"}
        </button>

        {error ? (
          <p role="alert" className="mt-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {roots && roots.length > 0 ? (
          <div className="mt-5">
            <p className="label">Who should the chart be centred on?</p>
            <p className="mt-1.5 text-sm text-ink-muted">
              These are the people in your file with the most complete ancestry.
            </p>
            <ul className="mt-3 max-h-64 space-y-1.5 overflow-y-auto">
              {roots.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => choose(r)}
                    className="flex w-full items-center justify-between gap-3 rounded-sm border border-rule px-3 py-2 text-left text-sm transition-colors hover:border-ink"
                  >
                    <span>{r.label}</span>
                    <span className="whitespace-nowrap text-xs text-ink-muted">
                      {r.depth} ancestor{r.depth === 1 ? "" : "s"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-muted">
              Importing replaces anything currently on the chart.
            </p>
          </div>
        ) : null}
      </div>
    </details>
  );
}
