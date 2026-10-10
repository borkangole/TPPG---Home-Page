"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DeveloperLogo } from "@/components/ui/DeveloperLogo";
import type { Developer } from "@/lib/developers";

const CELLS = 8;
const INTERVAL_MS = 2200;
// Cells change one at a time in a scattered order, so the grid never "flips" all at once.
const ORDER = [5, 0, 3, 6, 1, 7, 2, 4];

/**
 * A fixed grid of developer logos. Every couple of seconds one cell crossfades to its next
 * logo, so all developers appear over time without a scrolling ticker.
 * Pauses on hover, when off-screen, and for users who prefer reduced motion.
 */
export function RotatingLogoGrid({ developers }: { developers: Developer[] }) {
  // Deal developers into cells: cell i holds developers i, i+8, i+16...
  const stacks = useMemo(
    () => Array.from({ length: CELLS }, (_, i) => developers.filter((_, j) => j % CELLS === i)),
    [developers],
  );

  const [active, setActive] = useState<number[]>(() => Array(CELLS).fill(0));
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const tick = useRef(0);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const cell = ORDER[tick.current % CELLS];
      tick.current += 1;
      setActive((prev) => {
        const next = [...prev];
        next[cell] = (next[cell] + 1) % stacks[cell].length;
        return next;
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, visible, stacks]);

  return (
    <ul
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4"
    >
      {stacks.map((stack, i) => (
        <li key={i} className="group relative h-28 bg-ink-800 transition-colors hover:bg-ink-700 sm:h-32">
          {stack.map((d, j) => {
            const on = j === active[i];
            return (
              <div
                key={d.slug}
                aria-hidden={!on}
                className={`absolute inset-0 flex items-center justify-center px-6 transition-[opacity,transform,filter] duration-700 ease-out ${
                  on ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-2 opacity-0 blur-[2px]"
                }`}
              >
                <DeveloperLogo
                  developer={d}
                  maxWidth={150}
                  className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
}
