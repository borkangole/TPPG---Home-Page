import Link from "next/link";

// Text wordmark, matching the Portal header. Swap for the logo file when available.
export function Logo() {
  return (
    <Link href="/" className="group flex items-baseline gap-2" aria-label="The Premier Property Group, home">
      <span className="text-lg font-bold tracking-tight text-white">TPPG</span>
      <span className="hidden text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-200 lg:inline">
        The Premier Property Group
      </span>
    </Link>
  );
}
