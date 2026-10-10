"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/lib/property-media";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}

/** Main photo with arrows, counter, swipe, and a thumbnail strip. Arrow keys work while `keyboard` is true. */
export function PropertyGallery({ photos, keyboard }: { photos: GalleryPhoto[]; keyboard: boolean }) {
  const [i, setI] = useState(0);
  const n = photos.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const touchX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboard, n]);

  // Keep the active thumbnail visible.
  useEffect(() => {
    thumbsRef.current?.children[i]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [i]);

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Property photos"
        className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-700 xl:aspect-[4/3] xl:short:aspect-[16/10]"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {photos.map((p, k) => (
          <Image
            key={k}
            src={p.src}
            alt={p.alt}
            fill
            priority={k === 0}
            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 760px, 100vw"
            style={{ objectPosition: p.position ?? "center" }}
            aria-hidden={k !== i}
            className={`object-cover transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-ink sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/70 text-white backdrop-blur transition hover:bg-ink sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <Chevron dir="right" />
            </button>
            <p aria-live="polite" className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              {i + 1} / {n}
            </p>
          </>
        )}
      </div>

      {n > 1 && (
        <div ref={thumbsRef} className="-mx-1 mt-2 flex gap-2 overflow-x-auto p-1">
          {photos.map((p, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show photo ${k + 1} of ${n}`}
              aria-current={k === i}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition sm:h-[4.5rem] sm:w-28 xl:short:h-14 xl:short:w-20 ${
                k === i ? "ring-2 ring-brand ring-offset-2 ring-offset-ink-800" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={p.src} alt="" fill sizes="112px" style={{ objectPosition: p.position ?? "center" }} className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
