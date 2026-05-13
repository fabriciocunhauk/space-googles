import { useCallback, useEffect, useState } from "react";
import { fetchPlanetData } from "@/app/api/fetchPlanetData";
import { fetchPlanetImages } from "@/app/api/fetchPlanetImages";
import { FALLBACK_PLANET_DATA, PLANET_IMAGES, PlanetName } from "./constants";
import type { NASAImage, PlanetData } from "./types";

type UsePlanetReturn = {
  planetData: PlanetData | null;
  planetPhotos: NASAImage[];
  loading: boolean;
  loadingPhotos: boolean;
  imageSrc: string | null;
};

function isPlanetName(name: string): name is PlanetName {
  return name in PLANET_IMAGES;
}

export function usePlanet(planetName: string): UsePlanetReturn {
  const [planetData, setPlanetData] = useState<PlanetData | null>(null);
  const [planetPhotos, setPlanetPhotos] = useState<NASAImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const loadPlanetData = useCallback(async () => {
    if (!isPlanetName(planetName)) return;
    setLoading(true);
    try {
      const data = await fetchPlanetData(planetName);
      if (data.error) {
        setPlanetData(FALLBACK_PLANET_DATA[planetName] ?? null);
      } else {
        setPlanetData(data);
      }
    } catch (err) {
      console.error("Error fetching planet data:", err);
      setPlanetData(FALLBACK_PLANET_DATA[planetName] ?? null);
    } finally {
      setLoading(false);
    }
  }, [planetName]);

  const loadPlanetPhotos = useCallback(async () => {
    setLoadingPhotos(true);
    try {
      const photos = await fetchPlanetImages(planetName);
      setPlanetPhotos(photos);
    } catch (err) {
      console.error("Error fetching NASA photos:", err);
    } finally {
      setLoadingPhotos(false);
    }
  }, [planetName]);

  useEffect(() => {
    loadPlanetData();
  }, [loadPlanetData]);

  useEffect(() => {
    loadPlanetPhotos();
  }, [loadPlanetPhotos]);

  const imageSrc = isPlanetName(planetName)
    ? PLANET_IMAGES[planetName]
    : (planetData?.picture ?? null);

  return { planetData, planetPhotos, loading, loadingPhotos, imageSrc };
}
