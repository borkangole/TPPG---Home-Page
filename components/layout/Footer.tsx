import Link from "next/link";
import { Logo } from "./Logo";
import { NAV_LINKS, PORTAL_URL } from "./nav";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-site flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-zinc-400">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={PORTAL_URL} className="hover:text-white">
                Agent Login
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-xs text-zinc-500">© {new Date().getFullYear()} The Premier Property Group</p>
      </div>
    </footer>
  );
}
