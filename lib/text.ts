/** Lowercase, strip accents and punctuation, collapse spaces. Used for search matching. */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9₱ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
