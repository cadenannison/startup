// src/games/mapBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const BROWSER_KEY =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GMAPS_KEY) || "";

export default function MapBox({
  height = "360px",
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 12,
}) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState(BROWSER_KEY ? "loading" : "no-key");

  useEffect(() => {
    if (!BROWSER_KEY) return;

    let cancelled = false;

    async function init() {
      try {
        const loader = new Loader({
          apiKey: BROWSER_KEY,
          version: "weekly",
        });

        // Load the global google namespace
        const google = await loader.load();
        if (cancelled || !containerRef.current) return;

        // Import map + marker libraries
        const [{ Map }] = await Promise.all([google.maps.importLibrary("maps")]);
        let AdvancedMarkerElement;
        try {
          ({ AdvancedMarkerElement } = await google.maps.importLibrary("marker"));
        } catch {
          // marker library might not be available; that's fine
        }

        const map = new Map(containerRef.current, { center, zoom, mapId: "RAP_BASE" });

        // Prefer AdvancedMarker if available, else fallback to Marker
        if (AdvancedMarkerElement) {
          new AdvancedMarkerElement({ map, position: center, title: "Rise & Play" });
        } else if (google.maps.Marker) {
          new google.maps.Marker({ map, position: center, title: "Rise & Play" });
        }

        setStatus("ready");
      } catch (err) {
        console.error("Map init failed:", err);
        setStatus("error");
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [center.lat, center.lng, zoom]);

  return (
    <div
      ref={containerRef}
      style={{ height, minHeight: 240, width: "100%", background: "#f8f9fa" }} // 👈 bg helps confirm size
      className="position-relative"
      id="map"
      aria-label="Map"
    >
  
      {status !== "ready" && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center fw-semibold"
          style={{
            zIndex: 2,                 // make sure it's on top
            background: "#fffbe6",     // pale yellow
            color: "#6b5900",
            borderTop: "1px solid rgba(0,0,0,.08)"
          }}
        >
          {status === "no-key" && (
            <>
              <div>Map coming soon — no API key set</div>
              <div className="small fw-normal mt-1" style={{ color: "#8a7a2a" }}>
                Waiting on API Key
              </div>
            </>
          )}
          {status === "loading" && <div>Loading map…</div>}
          {status === "error" && <div>Map failed to load</div>}
        </div>
      )}
    </div>
  );
}
