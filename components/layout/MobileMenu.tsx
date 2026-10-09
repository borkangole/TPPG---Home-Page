"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { NAV_LINKS } from "./nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-ink px-5 pt-6">
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg font-medium text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full py-3.5">
            Talk to an Agent
          </Link>
        </div>
      )}
    </div>
  );
}
