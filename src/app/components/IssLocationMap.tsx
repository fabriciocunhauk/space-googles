"use client";
import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline, Circle, useJsApiLoader } from "@react-google-maps/api";
import issIcon from "../../../public/assets/International_Space_Station.svg";
import { getIssLocation } from "../api/getIssLocation";

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
];

interface PathPoint {
  lat: number;
  lon: number;
  time: string;
  country: string;
}

function IssLocationMap({ futurePath = [] }: { futurePath?: PathPoint[] }) {
  const [location, setLocation] = useState({ longitude: 0, latitude: 0, velocity: 0, altitude: 0 });

  useEffect(() => {
    const fetchLocation = async () => {
      const data = await getIssLocation();
      setLocation(data);
    };
    
    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  // Limit to next 120 minutes (approx 6 points if every 20m) to show a single clear orbit
  const polylinePath = [
    center,
    ...futurePath.slice(0, 6).map(p => ({ lat: p.lat, lng: p.lon }))
  ];

  // Helper to split path at the Date Line to avoid "line across the map" artifact
  const splitPathAtDateLine = (path: { lat: number, lng: number }[]) => {
    const segments: { lat: number, lng: number }[][] = [[]];
    let currentSegmentIndex = 0;

    for (let i = 0; i < path.length; i++) {
      const point = path[i];
      const prevPoint = path[i - 1];

      if (prevPoint && Math.abs(point.lng - prevPoint.lng) > 180) {
        // Date Line crossing detected
        currentSegmentIndex++;
        segments[currentSegmentIndex] = [];
      }
      segments[currentSegmentIndex].push(point);
    }
    return segments;
  };

  const pathSegments = splitPathAtDateLine(polylinePath);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleMapApiKey}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map && location.latitude !== 0) {
      map.panTo(center);
    }
  }, [location, map]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    map.setZoom(2);
    map.setMapTypeId("satellite");
  }, []);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="relative w-full h-full group select-none">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={handleMapLoad}
          onUnmount={handleMapUnmount}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {/* Field of View Circle */}
          <Circle
            center={center}
            radius={2200000} // ~2200km visibility radius
            options={{
              strokeColor: "#FFFFFF",
              strokeOpacity: 0.15,
              strokeWeight: 1,
              fillColor: "#FFFFFF",
              fillOpacity: 0.05,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1
            }}
          />

          {/* Trajectory Line Segments */}
          {pathSegments.map((segment, idx) => (
            <Polyline
              key={idx}
              path={segment}
              options={{
                strokeColor: "#FFD700",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                geodesic: true,
                icons: [
                  {
                    icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 },
                    offset: "0",
                    repeat: "15px",
                  },
                ],
              }}
            />
          ))}

          <Marker 
            position={center}
            icon={{
              url: issIcon.src,
              scaledSize: typeof window !== "undefined" && window.google ? new window.google.maps.Size(80, 80) : undefined,
            }}
          />
        </GoogleMap>
      )}

      {/* Telemetry Overlay */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 z-20">
        <div className="glass px-6 py-3 rounded-2xl flex flex-col">
          <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Latitude</span>
          <span className="text-xl font-Bellefair">{location.latitude.toFixed(4)}°</span>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex flex-col">
          <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Longitude</span>
          <span className="text-xl font-Bellefair">{location.longitude.toFixed(4)}°</span>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex flex-col border-l-4 border-accent-gold">
          <span className="text-[10px] text-accent-gold uppercase tracking-widest font-Barlow-Condensed">Velocity</span>
          <span className="text-xl font-Bellefair">{(location.velocity / 3600).toFixed(2)} km/s</span>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex flex-col border-l-4 border-nebula-blue">
          <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Altitude</span>
          <span className="text-xl font-Bellefair">{location.altitude.toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(IssLocationMap);
