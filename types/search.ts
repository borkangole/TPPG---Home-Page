export type SearchKind = "property" | "place" | "unit" | "developer" | "all";

export type SearchItem = {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
};

export type SearchGroup = {
  label: string;
  kind: Exclude<SearchKind, "all">;
  items: SearchItem[];
};
