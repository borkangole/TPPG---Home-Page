/**
 * Developers TPPG sells for (verified company list). Logos are transparent PNGs cut from
 * TPPG's partner graphic; swap in official files with the same names when available.
 */
import type { StaticImageData } from "next/image";

import ayalaLand from "@/public/images/developers/ayala-land.png";
import avida from "@/public/images/developers/avida.png";
import smdc from "@/public/images/developers/smdc.png";
import megaworld from "@/public/images/developers/megaworld.png";
import rockwell from "@/public/images/developers/rockwell-land.png";
import vistaLand from "@/public/images/developers/vista-land.png";
import camella from "@/public/images/developers/camella.png";
import lumina from "@/public/images/developers/lumina.png";
import cebuLandmasters from "@/public/images/developers/cebu-landmasters.png";
import casaMira from "@/public/images/developers/casa-mira-iloilo.png";
import staLucia from "@/public/images/developers/sta-lucia-land.png";
import dbcHomes from "@/public/images/developers/dbc-homes.png";
import augusta from "@/public/images/developers/augusta-residences.png";
import profriends from "@/public/images/developers/profriends.png";
import westernland from "@/public/images/developers/westernland-property.png";
import wvTowers from "@/public/images/developers/wv-towers.png";
import southprime from "@/public/images/developers/southprime-developers.png";
import greenMeadows from "@/public/images/developers/green-meadows-east.png";
import emerald from "@/public/images/developers/emerald-estates.png";
import eon from "@/public/images/developers/eon-group.png";
import ccc from "@/public/images/developers/ccc-premium-land.png";

export type Developer = { slug: string; name: string; logo: StaticImageData };

export const DEVELOPERS: Developer[] = [
  { slug: "ayala-land", name: "Ayala Land", logo: ayalaLand },
  { slug: "avida", name: "Avida", logo: avida },
  { slug: "smdc", name: "SMDC", logo: smdc },
  { slug: "megaworld", name: "Megaworld", logo: megaworld },
  { slug: "rockwell-land", name: "Rockwell Land", logo: rockwell },
  { slug: "vista-land", name: "Vista Land", logo: vistaLand },
  { slug: "camella", name: "Camella", logo: camella },
  { slug: "lumina-homes", name: "Lumina Homes", logo: lumina },
  { slug: "cebu-landmasters", name: "Cebu Landmasters", logo: cebuLandmasters },
  { slug: "casa-mira-iloilo", name: "Casa Mira Iloilo", logo: casaMira },
  { slug: "sta-lucia-land", name: "Sta. Lucia Land", logo: staLucia },
  { slug: "dbc-homes", name: "DBC Homes", logo: dbcHomes },
  { slug: "augusta-residences", name: "Augusta Residences", logo: augusta },
  { slug: "profriends", name: "Profriends", logo: profriends },
  { slug: "westernland-property", name: "Westernland Property", logo: westernland },
  { slug: "wv-towers", name: "WV Towers", logo: wvTowers },
  { slug: "iloilo-southprime-developers", name: "Iloilo Southprime Developers", logo: southprime },
  { slug: "green-meadows-east", name: "Green Meadows East", logo: greenMeadows },
  { slug: "emerald-estates", name: "Emerald Estates", logo: emerald },
  { slug: "eon-group", name: "EON Group of Companies", logo: eon },
  { slug: "ccc-premium-land", name: "CCC Premium Land Development", logo: ccc },
];
