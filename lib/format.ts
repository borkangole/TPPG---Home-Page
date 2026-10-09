const peso = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export function formatPeso(value: number | null | undefined): string {
  return value == null ? "—" : peso.format(value);
}

/** ₱3,450,000 -> "₱3.45M" (for compact labels) */
export function formatPesoShort(value: number): string {
  if (value >= 1_000_000) return `₱${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  if (value >= 1_000) return `₱${Math.round(value / 1_000)}K`;
  return `₱${value}`;
}

const TYPE_LABELS: Record<string, string> = {
  Condo: "Condominium",
  "House and Lot": "House & Lot",
  Lot: "Lot",
};

export const typeLabel = (t: string) => TYPE_LABELS[t] ?? t;
