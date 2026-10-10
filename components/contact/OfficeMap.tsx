"use client";

/**
 * Dark Leaflet map centred on the TPPG office. Client-only (loaded with next/dynamic, ssr: false).
 * Default: OpenStreetMap tiles (no API key) darkened with a CSS filter (.tppg-dark-tiles).
 * For production, set NEXT_PUBLIC_MAP_DARK_URL to a natively dark style from a keyed provider
 * (e.g. MapTiler "dataviz-dark" or Stadia "alidade_smooth_dark"); the filter is then skipped.
 */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const CUSTOM_DARK_URL = process.env.NEXT_PUBLIC_MAP_DARK_URL;
const TILE_URL = CUSTOM_DARK_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTR =
  process.env.NEXT_PUBLIC_MAP_DARK_ATTRIBUTION ||
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

type Props = { lat: number; lng: number; label: string; zoom?: number };

export default function OfficeMap({ lat, lng, label, zoom = 16 }: Props) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const map = L.map(el, {
      center: [lat, lng],
      zoom,
      zoomControl: false,
      scrollWheelZoom: false, // don't hijack page scrolling
      attributionControl: true,
    });
    map.attributionControl.setPrefix(false);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTR,
      maxZoom: 19,
      // Only darken the default light tiles; a custom dark style is used as-is.
      className: CUSTOM_DARK_URL ? undefined : "tppg-dark-tiles",
    }).addTo(map);

    L.marker([lat, lng], {
      title: label,
      alt: label,
      keyboard: false,
      icon: L.divIcon({
        className: "tppg-office-anchor",
        html: '<span class="tppg-office-pulse"></span><span class="tppg-office-pin"></span>',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      }),
    }).addTo(map);

    // Let people scroll-zoom once they've clicked into the map.
    map.once("focus", () => map.scrollWheelZoom.enable());
    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => {
      ro.disconnect();
      map.remove();
    };
  }, [lat, lng, label, zoom]);

  return (
    <div className="tppg-map h-full w-full">
      <div ref={elRef} className="h-full w-full" role="region" aria-label={`Map showing ${label}`} />
    </div>
  );
}
