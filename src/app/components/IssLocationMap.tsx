"use client";
import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import issIcon from "../../../public/assets/International_Space_Station.svg";
import { getIssLocation } from "../api/getIssLocation";

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    google: {
      maps: {
        Size: typeof google.maps.Size;
      };
    };
  }
}

function IssLocationMap() {
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const { longitude, latitude } = await getIssLocation();
      setLocation({ longitude, latitude });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "650px",
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
    map.setZoom(2);
    map.setMapTypeId("roadmap");
  }, []);

  const handleMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const marker = {
    position: {
      lat: location.latitude,
      lng: location.longitude,
    },
    icon: {
      url: issIcon.src,
      scaledSize:
        typeof window !== "undefined" && window.google
          ? new window.google.maps.Size(60, 60)
          : null,
    },
  };

  return (
    <div className="col-span-2 space-y-4">
      <h1 className="text-4xl font-light  text-center md:text-left">
        ISS REALTIME LOCATION
      </h1>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={handleMapLoad}
          onUnmount={handleMapUnmount}
        >
          <Marker {...marker} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(IssLocationMap);
