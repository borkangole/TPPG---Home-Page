"use client";

/**
 * Leaflet map for the Properties page. Client-only (loaded with next/dynamic, ssr: false).
 * - Default view: Iloilo (province + city), satellite base map.
 * - Street and Satellite base maps.
 * - Price-pill markers, clustered when close together; flies to the selected property,
 *   or fits the filtered results.
 */
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Plugin attaches to the global L that Leaflet sets; keep this import after "leaflet".
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { useEffect, useMemo, useRef, useState } from "react";

export type MapPoint = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  label: string; // text inside the marker, e.g. "₱3.45M"
};

/** Region VI: Aklan, Antique, Capiz, Guimaras, Iloilo. Used as a wider fallback/zoom-out target. */
export const WESTERN_VISAYAS: [L.LatLngTuple, L.LatLngTuple] = [
  [10.4, 121.85],
  [12.0, 123.25],
];

/** Iloilo province + city — the default view when no filters/selection are active. */
export const ILOILO: [L.LatLngTuple, L.LatLngTuple] = [
  [10.45, 122.15],
  [11.3, 122.95],
];

// Override with env vars for production (e.g. MapTiler keys). Defaults are fine for development.
const STREET_URL = process.env.NEXT_PUBLIC_MAP_STREET_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const STREET_ATTR =
  process.env.NEXT_PUBLIC_MAP_STREET_ATTRIBUTION ||
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const SATELLITE_URL =
  process.env.NEXT_PUBLIC_MAP_SATELLITE_URL ||
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const SATELLITE_ATTR =
  process.env.NEXT_PUBLIC_MAP_SATELLITE_ATTRIBUTION || "Imagery &copy; Esri, Maxar, Earthstar Geographics";
const LABELS_URL =
  process.env.NEXT_PUBLIC_MAP_LABELS_URL ||
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const pinIcon = (label: string, state: "default" | "hover" | "selected") =>
  L.divIcon({
    className: "tppg-pin-anchor",
    html: `<span class="tppg-pin tppg-pin--${state}">${escapeHtml(label)}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

const clusterIcon = (cluster: L.MarkerCluster) => {
  const n = cluster.getChildCount();
  return L.divIcon({
    className: "tppg-cluster-anchor",
    html: `<span class="tppg-cluster" aria-label="${n} properties">${n}</span>`,
    iconSize: L.point(46, 46),
  });
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  points: MapPoint[];
  /** Points the "fit" view should frame (the filtered results). */
  fitPoints: MapPoint[];
  /** "region" = Western Visayas, "points" = frame fitPoints. */
  fitTo: "region" | "points";
  selected: string | null;
  hovered: string | null;
  onSelect: (slug: string) => void;
};

export default function PropertyMap({ points, fitPoints, fitTo, selected, hovered, onSelect }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ street: L.Layer; satellite: L.Layer } | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const [base, setBase] = useState<"street" | "satellite">("satellite");

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Create the map once.
  useEffect(() => {
    const el = elRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, { zoomControl: false, attributionControl: true, minZoom: 5 });
    map.attributionControl.setPrefix(false);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    const street = L.tileLayer(STREET_URL, {
      attribution: STREET_ATTR,
      maxZoom: 19,
      className: "tppg-street-tiles",
    });
    const satellite = L.layerGroup([
      L.tileLayer(SATELLITE_URL, { attribution: SATELLITE_ATTR, maxZoom: 19, maxNativeZoom: 18 }),
      L.tileLayer(LABELS_URL, { maxZoom: 19, maxNativeZoom: 18 }),
    ]);
    satellite.addTo(map);
    layersRef.current = { street, satellite };

    // Nearby properties merge into a numbered bubble; click it to zoom in.
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      disableClusteringAtZoom: 15,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: clusterIcon,
    });
    map.addLayer(cluster);
    clusterRef.current = cluster;

    map.fitBounds(ILOILO, { padding: [12, 12] });
    mapRef.current = map;

    // Keep tiles correct when the panel resizes (view switches, window resize).
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);

    // Expose for automated checks in development only.
    if (process.env.NODE_ENV !== "production") (window as unknown as { __tppgMap?: L.Map }).__tppgMap = map;

    const markers = markersRef.current;
    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      layersRef.current = null;
      clusterRef.current = null;
      markers.clear();
    };
  }, []);

  // Street / Satellite switch.
  useEffect(() => {
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!map || !layers) return;
    if (base === "street") {
      map.removeLayer(layers.satellite);
      layers.street.addTo(map);
    } else {
      map.removeLayer(layers.street);
      layers.satellite.addTo(map);
    }
  }, [base]);

  // (Re)build markers when the set of points changes.
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    const markers = markersRef.current;
    cluster.clearLayers();
    markers.clear();
    for (const p of points) {
      const marker = L.marker([p.lat, p.lng], {
        icon: pinIcon(p.label, "default"),
        title: p.name,
        alt: p.name,
        keyboard: true,
        riseOnHover: true,
      })
        .on("click", () => onSelectRef.current(p.slug))
        .on("keypress", (e: L.LeafletKeyboardEvent) => {
          if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") onSelectRef.current(p.slug);
        });
      markers.set(p.slug, marker);
    }
    cluster.addLayers([...markers.values()]);
  }, [points]);

  // Marker states (selected / hovered).
  useEffect(() => {
    const labels = new Map(points.map((p) => [p.slug, p.label]));
    markersRef.current.forEach((marker, slug) => {
      const state = slug === selected ? "selected" : slug === hovered ? "hover" : "default";
      marker.setIcon(pinIcon(labels.get(slug) ?? "", state));
      marker.setZIndexOffset(state === "selected" ? 1000 : state === "hover" ? 500 : 0);
    });
  }, [selected, hovered, points]);

  // Camera: fly to the selected property, else frame the results, else Western Visayas.
  const fitKey = useMemo(() => `${fitTo}|${fitPoints.map((p) => p.slug).join(",")}`, [fitTo, fitPoints]);
  const selectedPoint = useMemo(() => points.find((p) => p.slug === selected) ?? null, [points, selected]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const instant = prefersReducedMotion();

    if (selectedPoint) {
      const target: L.LatLngTuple = [selectedPoint.lat, selectedPoint.lng];
      if (instant) map.setView(target, 16);
      else map.flyTo(target, 16, { duration: 1.2 });
      return;
    }

    const bounds =
      fitTo === "points" && fitPoints.length
        ? L.latLngBounds(fitPoints.map((p) => [p.lat, p.lng] as L.LatLngTuple))
        : L.latLngBounds(ILOILO);
    const opts = { padding: [48, 48] as L.PointTuple, maxZoom: 14 };
    if (instant) map.fitBounds(bounds, opts);
    else map.flyToBounds(bounds, { ...opts, duration: 1 });
    // fitKey captures fitTo + fitPoints
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPoint, fitKey]);

  const resetView = () => {
    const map = mapRef.current;
    if (!map) return;
    if (prefersReducedMotion()) map.fitBounds(ILOILO, { padding: [12, 12] });
    else map.flyToBounds(ILOILO, { padding: [12, 12], duration: 1 });
  };

  return (
    <div className="tppg-map relative isolate h-full w-full">
      <div ref={elRef} className="h-full w-full" role="region" aria-label="Map of properties" />

      {/* Overlay controls (above Leaflet panes, contained by `isolate`) */}
      <div className="pointer-events-none absolute inset-x-3 top-3 z-[1000] flex items-start justify-between gap-2">
        <div
          role="radiogroup"
          aria-label="Map style"
          className="pointer-events-auto flex rounded-full border border-white/10 bg-ink/85 p-1 text-xs font-semibold shadow-lg backdrop-blur"
        >
          {(["street", "satellite"] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={base === b}
              onClick={() => setBase(b)}
              className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                base === b ? "bg-brand text-white" : "text-zinc-300 hover:text-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={resetView}
          className="pointer-events-auto rounded-full border border-white/10 bg-ink/85 px-3 py-2 text-xs font-semibold text-zinc-200 shadow-lg backdrop-blur hover:text-white"
        >
          Iloilo
        </button>
      </div>
    </div>
  );
}
