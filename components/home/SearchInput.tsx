"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, BriefcaseIcon, BuildingIcon, DoorIcon, PinIcon, SearchIcon } from "@/components/ui/Icons";
import type { SearchGroup, SearchItem, SearchKind } from "@/types/search";

const KIND_ICON: Record<SearchKind, (p: { className?: string }) => React.ReactElement> = {
  property: BuildingIcon,
  place: PinIcon,
  unit: DoorIcon,
  developer: BriefcaseIcon,
  all: SearchIcon,
};

/** Wraps the matched part of `text` in <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  const words = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!words.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${words.join("|")})`, "ig"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-transparent text-brand-soft">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

type Row = SearchItem & { index: number };

/**
 * Keyword search with live suggestions (properties, places, units, developers).
 * Without JavaScript it still works as a normal form field (?q=).
 * Suggestions come from /api/search.
 */
type SearchInputProps = {
  /** "hero" = big field + Search button (homepage). "compact" = slim field for the Properties page. */
  variant?: "hero" | "compact";
  defaultValue?: string;
};

export function SearchInput({ variant = "hero", defaultValue = "" }: SearchInputProps) {
  const compact = variant === "compact";
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [q, setQ] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<SearchGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);

  const trimmed = q.trim();

  // Long placeholder on wide screens, short one on phones (avoids a cut-off hint).
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Flatten for keyboard navigation; the last row always offers "search everything".
  const { rows, flat } = useMemo(() => {
    let i = 0;
    const rows = groups.map((g) => ({ ...g, items: g.items.map((item): Row => ({ ...item, index: i++ })) }));
    const flat: Row[] = rows.flatMap((g) => g.items);
    if (trimmed) {
      flat.push({
        id: "all",
        kind: "all",
        title: `Search all properties for “${trimmed}”`,
        subtitle: "",
        href: `/properties?q=${encodeURIComponent(trimmed)}`,
        index: i,
      });
    }
    return { rows, flat };
  }, [groups, trimmed]);

  // Fetch suggestions (debounced) while the panel is open.
  useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(
      async () => {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: ctrl.signal });
          if (!res.ok) throw new Error("search failed");
          const data = (await res.json()) as { groups: SearchGroup[] };
          setGroups(data.groups);
          setActive(-1);
        } catch (e) {
          if ((e as Error).name !== "AbortError") setGroups([]);
        } finally {
          if (!ctrl.signal.aborted) setLoading(false);
        }
      },
      trimmed ? 160 : 0,
    );
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [trimmed, open]);

  // Close when clicking elsewhere.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  // Keep the highlighted row visible.
  useEffect(() => {
    if (active >= 0) document.getElementById(`${listId}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const scrollIntoRoom = () => {
    const el = rootRef.current;
    if (!el || compact) return;
    const top = el.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.35) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: window.scrollY + top - 104, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      if (flat.length) setActive((i) => (i + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flat.length) setActive((i) => (i <= 0 ? flat.length - 1 : i - 1));
    } else if (e.key === "Enter" && open && active >= 0 && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  };

  const showPanel = open && (flat.length > 0 || loading);

  return (
    <div ref={rootRef} className={compact ? "relative" : "relative flex flex-col gap-2 sm:flex-row sm:items-center"}>
      <label
        className={
          compact
            ? "relative block rounded-lg border border-white/10 bg-ink-700 transition-colors focus-within:border-brand/60"
            : "relative block flex-1 rounded-lg transition-colors focus-within:bg-white/[0.04]"
        }
      >
        <span className="sr-only">Search properties, places, units, or developers</span>
        <SearchIcon className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 ${compact ? "left-3.5 h-4 w-4" : "left-4 h-5 w-5"}`} />
        <input
          type="search"
          name="q"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={wide ? "Search property, place, unit, or developer" : "Property, place, unit, developer"}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            scrollIntoRoom();
          }}
          onKeyDown={onKeyDown}
          className={`w-full bg-transparent text-base text-white placeholder:text-zinc-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-search-cancel-button]:hidden ${compact ? "py-2.5 pl-10 pr-3 lg:text-[0.95rem]" : "py-4 pl-12 pr-4"}`}
        />
      </label>

      <button type="submit" className={compact ? "sr-only" : "btn-primary px-8 py-4 sm:self-stretch"}>
        Search
      </button>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className={`absolute left-0 right-0 top-full z-40 ${compact ? "mt-2" : "mt-3"} max-h-[min(28rem,60svh)] overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-ink-800 p-2 shadow-2xl shadow-black/60`}
        >
          {rows.map((g) => (
            <div key={g.label} role="group" aria-label={g.label} className="pb-1">
              <p className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-500">
                {g.label}
              </p>
              {g.items.map((item) => (
                <Option key={item.id} item={item} listId={listId} active={active === item.index} query={trimmed}
                  onHover={() => setActive(item.index)} onPick={() => go(item.href)} />
              ))}
            </div>
          ))}

          {!loading && trimmed && rows.length === 0 && (
            <p className="px-3 py-4 text-sm text-zinc-400">
              No exact matches for “{trimmed}”. Try a different spelling, or search everything below.
            </p>
          )}

          {trimmed && flat.length > 0 && (
            <div className="mt-1 border-t border-white/[0.07] pt-1">
              <Option
                item={flat[flat.length - 1]}
                listId={listId}
                active={active === flat[flat.length - 1].index}
                query=""
                onHover={() => setActive(flat[flat.length - 1].index)}
                onPick={() => go(flat[flat.length - 1].href)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Option({
  item,
  listId,
  active,
  query,
  onHover,
  onPick,
}: {
  item: Row;
  listId: string;
  active: boolean;
  query: string;
  onHover: () => void;
  onPick: () => void;
}) {
  const Icon = KIND_ICON[item.kind];
  return (
    <div
      id={`${listId}-opt-${item.index}`}
      role="option"
      aria-selected={active}
      onMouseEnter={onHover}
      onMouseDown={(e) => e.preventDefault()} // keep focus in the input
      onClick={onPick}
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
        active ? "bg-white/[0.07]" : ""
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border ${
          active ? "border-brand/60 text-brand-soft" : "border-white/10 text-zinc-400"
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.95rem] font-medium text-white">
          <Highlight text={item.title} query={query} />
        </span>
        {item.subtitle && <span className="block truncate text-xs text-zinc-500">{item.subtitle}</span>}
      </span>
      <ArrowRight className={`h-4 w-4 shrink-0 text-brand transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
