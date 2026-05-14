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

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleMapApiKey}`,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [mapIsReady, setMapIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapIsReady) setShowFallback(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [mapIsReady]);

  // Auto-center on location update
  useEffect(() => {
    if (map && location.latitude !== 0) {
      map.setCenter(center); // Use setCenter for immediate positioning on load
    }
  }, [location.latitude, location.longitude, map]);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setMapIsReady(true);
    map.setZoom(2);
    map.setMapTypeId("satellite");
    if (location.latitude !== 0) {
      map.setCenter(center);
    }
  }, [location.latitude, location.longitude]);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError || showFallback) {
    return (
      <div className="relative w-full h-full bg-deep-space flex flex-col items-center justify-center p-12 text-center">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-ping-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-pulse" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="w-32 h-32 mx-auto relative">
             <div className="absolute inset-0 bg-nebula-blue/20 blur-2xl rounded-full animate-pulse" />
             <img src={issIcon.src} alt="ISS" className="w-full h-full relative z-10 animate-bounce-slow" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-Bellefair text-glow uppercase">Telemetry Mode Active</h3>
            <p className="text-nebula-blue font-Barlow max-w-sm mx-auto text-sm">Visual map stream currently unavailable. Tracking ISS via direct orbital telemetry.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="glass p-4 rounded-2xl border border-white/5">
              <span className="block text-[8px] uppercase tracking-widest text-nebula-blue mb-1">Status</span>
              <span className="text-green-400 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Linked
              </span>
            </div>
            <div className="glass p-4 rounded-2xl border border-white/5">
              <span className="block text-[8px] uppercase tracking-widest text-nebula-blue mb-1">Signal</span>
              <span className="text-white font-Bellefair">98.4%</span>
            </div>
          </div>
        </div>

        {/* Reusing the telemetry overlay for consistency */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 z-20 justify-center">
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
        </div>
      </div>
    );
  }

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
            gestureHandling: "greedy" // Make it easier to move on touch
          }}
        >
          {/* Field of View Circle */}
          <Circle
            center={center}
            radius={2200000} // ~2200km visibility radius
            options={{
              strokeColor: "#D0D6F9",
              strokeOpacity: 0.6,
              strokeWeight: 2,
              fillColor: "#D0D6F9",
              fillOpacity: 0.1,
              clickable: false,
              zIndex: 1
            }}
          />

          <Marker 
            position={center}
            icon={{
              url: issIcon.src,
              scaledSize: typeof window !== "undefined" && window.google ? new window.google.maps.Size(80, 80) : undefined,
              anchor: typeof window !== "undefined" && window.google ? new window.google.maps.Point(40, 40) : undefined,
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
