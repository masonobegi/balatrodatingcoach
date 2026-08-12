"use client";

import type { ChartConfig, PaperSize } from "@/lib/chart/types";
import { MIN_GENERATIONS, PAPER_SIZES } from "@/lib/chart/types";
import { THEME_LIST } from "@/lib/chart/themes";
import { PRINT_VARIANTS, formatMoneyShort } from "@/lib/pricing";
import { track } from "@/lib/analytics";

export function StyleControls({
  config,
  onChange,
  maxGenerations,
}: {
  config: ChartConfig;
  onChange: (patch: Partial<ChartConfig>) => void;
  maxGenerations: number;
}) {
  const genOptions = Array.from(
    { length: maxGenerations - MIN_GENERATIONS + 1 },
    (_, i) => MIN_GENERATIONS + i,
  );

  return (
    <div className="mt-6 space-y-5">
      <Group label="Shape">
        <Segmented
          options={[
            { value: "fan", label: "Fan" },
            { value: "tree", label: "Tree" },
          ]}
          value={config.style}
          onChange={(v) => onChange({ style: v as ChartConfig["style"] })}
        />
      </Group>

      <Group label="Generations">
        <Segmented
          options={genOptions.map((g) => ({ value: String(g), label: String(g) }))}
          value={String(config.generations)}
          onChange={(v) => onChange({ generations: Number(v) })}
        />
      </Group>

      <Group label="Colour">
        <div className="flex flex-wrap gap-2">
          {THEME_LIST.map((t) => {
            const active = config.theme === t.name;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => onChange({ theme: t.name })}
                aria-pressed={active}
                title={t.description}
                className={`flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-ink text-ink"
                    : "border-rule text-ink-muted hover:border-rule-strong"
                }`}
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-sm border border-rule"
                  style={{ background: t.paper }}
                />
                <span
                  aria-hidden
                  className="-ml-3.5 h-4 w-2 rounded-l-sm"
                  style={{ background: t.accent }}
                />
                {t.label}
              </button>
            );
          })}
        </div>
      </Group>

      <Group label="Size">
        <div className="grid gap-2">
          {Object.values(PRINT_VARIANTS).map((v) => {
            const active = config.size === v.size;
            return (
              <button
                key={v.size}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  onChange({ size: v.size as PaperSize });
                  track("size_selected", { props: { size: v.size } });
                }}
                className={`flex items-baseline justify-between rounded-sm border px-3 py-2.5 text-left transition-colors ${
                  active ? "border-ink bg-paper-deep" : "border-rule hover:border-rule-strong"
                }`}
              >
                <span className="font-display text-lg">{PAPER_SIZES[v.size].label}</span>
                <span className="text-sm font-semibold">{formatMoneyShort(v.price)}</span>
              </button>
            );
          })}
        </div>
      </Group>

      <Group label="Wording">
        <div className="space-y-2.5">
          <input
            className="field"
            placeholder="Title — e.g. The Doyle Family"
            maxLength={60}
            value={config.title}
            onChange={(e) => onChange({ title: e.target.value })}
            aria-label="Chart title"
          />
          <input
            className="field"
            placeholder="Line underneath — e.g. Christmas 2026"
            maxLength={60}
            value={config.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            aria-label="Chart subtitle"
          />
        </div>
      </Group>

      <Group label="Detail">
        <div className="flex flex-wrap gap-4">
          {/* Framed as adding something optional, not as revealing a field
              they failed to fill in. */}
          <Toggle
            label="Add birth & death years"
            checked={config.showDates}
            onChange={(v) => onChange({ showDates: v })}
          />
          <Toggle
            label="Add birthplaces"
            checked={config.showPlaces}
            onChange={(v) => onChange({ showPlaces: v })}
          />
        </div>
      </Group>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label mb-2">{label}</p>
      {children}
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-sm border border-rule p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`min-w-9 rounded-sm px-3 py-1.5 text-sm transition-colors ${
              active ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-deep"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[var(--color-walnut)]"
      />
      {label}
    </label>
  );
}
