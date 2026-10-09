import { ChevronDown } from "@/components/ui/Icons";
import {
  BUDGET_OPTIONS,
  LOCATION_OPTIONS,
  TYPE_OPTIONS,
  type Option,
  type OptionGroup,
} from "@/lib/filter-options";
import { SearchInput } from "./SearchInput";

type FieldProps = {
  label: string;
  name: string;
  options: (Option | OptionGroup)[];
};

function Field({ label, name, options }: FieldProps) {
  return (
    <label className="relative block rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.03]">
      <span className="block text-[0.7rem] font-medium tracking-wide text-zinc-400">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-6 text-[0.95rem] font-medium text-white focus:outline-none [&_optgroup]:bg-ink-800 [&_optgroup]:text-zinc-400 [&_option]:bg-ink-800"
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
      <ChevronDown className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-zinc-500" />
    </label>
  );
}

/**
 * Plain GET form to /properties, so it works without JavaScript and produces
 * shareable, crawlable URLs (?q=&location=&type=&budget=).
 * Top row: live keyword search (property, place, unit, developer). Bottom row: optional filters.
 */
export function SearchBar() {
  return (
    <form
      action="/properties"
      method="get"
      role="search"
      aria-label="Search properties"
      className="rounded-xl border border-white/10 bg-ink-800/85 p-2 shadow-2xl shadow-black/40 backdrop-blur-md"
    >
      {/* Keyword search with live suggestions */}
      <SearchInput />

      {/* Filters */}
      <div className="mt-1 grid gap-1 border-t border-white/[0.07] pt-1 sm:grid-cols-3 sm:divide-x sm:divide-white/[0.07]">
        <Field label="Location" name="location" options={LOCATION_OPTIONS} />
        <Field label="Property type" name="type" options={TYPE_OPTIONS} />
        <Field label="Budget" name="budget" options={BUDGET_OPTIONS} />
      </div>
    </form>
  );
}
