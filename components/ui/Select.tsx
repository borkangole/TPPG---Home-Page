"use client";

import { useId } from "react";
import { ChevronDown } from "@/components/ui/Icons";
import type { Option, OptionGroup } from "@/lib/filter-options";

type Props = {
  label: string;
  value: string;
  options: (Option | OptionGroup)[];
  onChange: (value: string) => void;
};

/** Controlled, dark-styled native select (keeps native mobile pickers). */
export function Select({ label, value, options, onChange }: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-zinc-400">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-ink-700 py-2.5 pl-3 pr-9 text-base text-white transition-colors focus:border-brand/60 focus:outline-none sm:text-sm [&_optgroup]:bg-ink-800 [&_optgroup]:text-zinc-400 [&_option]:bg-ink-800 [&_option]:text-white"
        >
          {options.map((o) =>
            "options" in o ? (
              <optgroup key={o.label} label={o.label}>
                {o.options.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      </div>
    </div>
  );
}
