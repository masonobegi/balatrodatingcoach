"use client";

import type { Person } from "@/lib/chart/types";

/**
 * One ancestor's inputs.
 *
 * Given name and surname are separate fields on purpose. The chart abbreviates
 * a long name by initialising the given name and keeping the surname whole,
 * which it can only do if it knows which is which — and asking for "full name"
 * then guessing at the split gets Irish, Spanish, and East Asian names wrong.
 *
 * Years are optional and free-text-ish, because half of what people remember is
 * "about 1910".
 */
export function PersonField({
  label,
  relation,
  person,
  onChange,
  autoFocus = false,
  showDates,
}: {
  label: string;
  relation?: string;
  person: Person | undefined;
  onChange: (p: Person) => void;
  autoFocus?: boolean;
  showDates: boolean;
}) {
  const value: Person = person ?? { given: "", surname: "" };
  const set = (patch: Partial<Person>) => onChange({ ...value, ...patch });

  const id = label.replace(/\W+/g, "-").toLowerCase();

  return (
    <fieldset className="card p-4">
      <legend className="sr-only">{label}</legend>
      <div className="flex items-baseline justify-between gap-3">
        <p className="label !text-ink-soft">{label}</p>
        {relation ? <p className="text-xs text-ink-muted">{relation}</p> : null}
      </div>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-given`} className="sr-only">
            {label} — first name
          </label>
          <input
            id={`${id}-given`}
            className="field"
            placeholder="First name"
            autoComplete="off"
            autoFocus={autoFocus}
            value={value.given}
            onChange={(e) => set({ given: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-surname`} className="sr-only">
            {label} — last name
          </label>
          <input
            id={`${id}-surname`}
            className="field"
            placeholder="Last name"
            autoComplete="off"
            value={value.surname}
            onChange={(e) => set({ surname: e.target.value })}
          />
        </div>
      </div>

      {showDates ? (
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor={`${id}-born`} className="sr-only">
              {label} — year born
            </label>
            <input
              id={`${id}-born`}
              className="field !text-base"
              placeholder="Born"
              inputMode="numeric"
              maxLength={4}
              value={value.birthYear ?? ""}
              onChange={(e) => set({ birthYear: e.target.value.replace(/\D/g, "") })}
            />
          </div>
          <div>
            <label htmlFor={`${id}-died`} className="sr-only">
              {label} — year died
            </label>
            <input
              id={`${id}-died`}
              className="field !text-base"
              placeholder="Died"
              inputMode="numeric"
              maxLength={4}
              value={value.deathYear ?? ""}
              onChange={(e) => set({ deathYear: e.target.value.replace(/\D/g, "") })}
            />
          </div>
        </div>
      ) : null}
    </fieldset>
  );
}
