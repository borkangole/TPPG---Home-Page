/**
 * Company content for the About page. These are verified company facts supplied by TPPG,
 * not sample data.
 */
import type { StaticImageData } from "next/image";

import shienna from "@/public/images/team/shienna-rose-cordero.jpg";
import ian from "@/public/images/team/ian-rey-yongque.jpg";
import rechel from "@/public/images/team/rechel-joy-villorente.jpg";

import { DEVELOPERS } from "@/lib/developers";

export const TEAM_SIZE = 50;

export type Leader = { name: string; role: string; photo: StaticImageData };

/** First entry is shown on top (CEO). */
export const LEADERS: Leader[] = [
  { name: "Shienna Rose Cordero", role: "CEO & Broker", photo: shienna },
  { name: "Ian Rey Yongque", role: "Unit Manager", photo: ian },
  { name: "Rechel Joy Villorente", role: "Unit Manager", photo: rechel },
];

export const STORY = [
  "The Premier Property Group began with three people who shared one belief: finding a home should feel exciting, not overwhelming.",
  "What started as a small team with a big idea has grown into a 50-strong family of agents, leaders, and professionals, all working to connect Filipino families with properties they’re proud to call their own.",
];

export const VISION =
  "To become one of the most trusted names in Philippine real estate, reaching ₱1 billion in sales by 2027.";

export const MISSION =
  "To guide every client with honesty, expertise, and care, from the first property tour to the day they receive their keys, while building a team where every agent can grow, lead, and succeed.";

export const SERVICES = [
  {
    title: "Find the right fit",
    text: "Tell us your budget, preferred location, and plans. We shortlist condos, house and lot, and lots that match.",
  },
  {
    title: "Tour the property",
    text: "We set up site visits and model unit tours, and walk you through the project, the neighborhood, and the developer.",
  },
  {
    title: "Understand the numbers",
    text: "Clear breakdowns of the total contract price, reservation fee, downpayment, and monthly terms, plus your financing options.",
  },
  {
    title: "Reserve and get your keys",
    text: "We handle the reservation, documents, and follow-ups with the developer, all the way to turnover.",
  },
];

/** Developer partners (shared with the homepage). */
export const PARTNERS = DEVELOPERS;

export type Award = { rank: string | null; title: string; by: string; year?: string };

export const AWARDS: Award[] = [
  { rank: "3", title: "Top 3 Master Broker Award, Visayas", by: "Cebu Landmasters Inc.", year: "2025" },
  { rank: "1", title: "Top 1 Iloilo Group", by: "Cebu Landmasters Inc.", year: "2025" },
  { rank: "6", title: "Top 6 Iloilo Broker Group", by: "Wee Comm", year: "2025" },
  { rank: null, title: "The Royals", by: "King Properties" },
  { rank: null, title: "Top Broker Group for Panay", by: "Vista Land" },
];

export const REGIONS_SERVED = ["Iloilo", "Cebu", "Palawan"];
