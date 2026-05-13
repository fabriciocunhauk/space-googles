"use client";
import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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
  // ... more styles can be added for a truly dark experience
];

function IssLocationMap() {
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleMapApiKey}`,
  });

  const [, setMap] = useState<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    map.setZoom(3);
    map.setMapTypeId("satellite");
  }, []);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="relative w-full h-full group">
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
