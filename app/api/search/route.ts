import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/search";

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 80);
  return NextResponse.json(
    { groups: searchCatalog(q) },
    { headers: { "Cache-Control": "public, max-age=30" } },
  );
}
