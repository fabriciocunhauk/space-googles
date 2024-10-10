"use client";
import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import issIcon from "../../../public/assets/International_Space_Station.svg";

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type ISSPositionProps = {
  iss_position: { longitude: number; latitude: number };
};

declare global {
  interface Window {
    google: {
      maps: {
        Size: typeof google.maps.Size;
      };
    };
  }
}

const getIssLocation = async () => {
  const updateISSLocation = async () => {
    const dataISScurrentLocation: ISSPositionProps = await fetch(
      "http://api.open-notify.org/iss-now.json"
    )
      .then((response) => response.json())
      .then((data) => data);

    const { iss_position: ISScurrentLocation } = dataISScurrentLocation;

    const longitude = Number(ISScurrentLocation.longitude);
    const latitude = Number(ISScurrentLocation.latitude);

    return { longitude, latitude };
  };

  return updateISSLocation();
};

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
    // map.setOptions({
    //   styles: [
    //     { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    //     { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#1e1002" }] },
    //     { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    //     { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#283d6b" }] },
    //     { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1f4f24" }] },
    //     { featureType: "landscape", elementType: "all", stylers: [{ color: "#3b5258" }] },
    //     { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
    //     { featureType: "road", elementType: "all", stylers: [{ saturation: -70 }, { lightness: 40 }] },
    //     { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
    //     { featureType: "water", elementType: "all", stylers: [{ color: "#0e1726" }] },
    //   ],
    // });
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
