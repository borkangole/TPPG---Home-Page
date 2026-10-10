import Image from "next/image";
import type { Developer } from "@/lib/developers";

/**
 * Developer logo rendered as a white mark for dark backgrounds.
 * Sizes are normalised by aspect ratio so wide wordmarks and square emblems carry similar
 * visual weight: wide logos get shorter, square ones taller, within a max width.
 */
export function DeveloperLogo({
  developer,
  scale = 1,
  maxWidth = 168,
  className = "",
}: {
  developer: Developer;
  scale?: number;
  maxWidth?: number;
  className?: string;
}) {
  const { width: w, height: h } = developer.logo;
  const aspect = w / h;
  let height = Math.max(28, Math.min(60, 46 * Math.pow(aspect, -0.3))) * scale;
  let width = height * aspect;
  if (width > maxWidth * scale) {
    width = maxWidth * scale;
    height = width / aspect;
  }
  return (
    <Image
      src={developer.logo}
      alt={developer.name}
      width={Math.round(width)}
      height={Math.round(height)}
      sizes={`${Math.round(width)}px`}
      style={{ width: Math.round(width), height: Math.round(height) }}
      className={`max-w-full object-contain brightness-0 invert ${className}`}
    />
  );
}
