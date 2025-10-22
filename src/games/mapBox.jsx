import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const BROWSER_KEY =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GMAPS_KEY) ||
  process.env.NEXT_PUBLIC_GMAPS_KEY ||
  "";

export default function MapBox({ height = "300px", center = { lat: 37.7749, lng: -122.4194 }, zoom = 12 }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!BROWSER_KEY) return; // stay in placeholder mode until you add a key

    let cancelled = false;
    const loader = new Loader({
      apiKey: BROWSER_KEY,
      version: "weekly",
      libraries: ["maps", "marker"]
    });

    loader.load().then(async (google) => {
      if (cancelled || !containerRef.current) return;

      const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary("maps"),
        google.maps.importLibrary("marker")
      ]);

      const map = new Map(containerRef.current, { center, zoom });
      new AdvancedMarkerElement({ map, position: center, title: "Hello from Jump" });
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [center.lat, center.lng, zoom]);

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="position-relative"
      id="map"
      aria-label="Map"
    >
      {!BROWSER_KEY && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-body-tertiary text-muted">
          Map coming soon
        </div>
      )}
      {BROWSER_KEY && !ready && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-body-tertiary text-muted">
          Loading map…
        </div>
      )}
    </div>
  );
}
