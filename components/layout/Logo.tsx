import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/tppg-logo.png";

type Props = { size?: "header" | "footer" };

/** TPPG logo (transparent PNG, made for dark backgrounds). */
export function Logo({ size = "header" }: Props) {
  const header = size === "header";
  return (
    <Link
      href="/"
      aria-label="The Premier Property Group, home"
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
    >
      <Image
        src={logo}
        alt="The Premier Property Group"
        priority={header}
        sizes={header ? "110px" : "150px"}
        className={header ? "h-11 w-auto sm:h-12" : "h-16 w-auto"}
      />
    </Link>
  );
}
