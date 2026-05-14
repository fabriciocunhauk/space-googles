"use client";
import { useState } from "react";
import backgroundDesktop from "/public/assets/planets/background-destination-desktop.jpg";
import Container from "@/app/components/Container";
import { usePlanet } from "./usePlanet";
import PlanetVisual from "./components/PlanetVisual";
import PlanetNav from "./components/PlanetNav";
import PlanetInfo from "./components/PlanetInfo";
import NasaGallery from "./components/NasaGallery";
import HistoricalMissions from "./components/HistoricalMissions";

export default function Planets() {
  const [planetName, setPlanetName] = useState("earth");
  const { planetData, planetPhotos, loading, loadingPhotos, imageSrc } =
    usePlanet(planetName);

  return (
    <section
      className="relative min-h-screen pt-44 pb-20 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.6), rgba(11, 13, 23, 0.6)), url(${backgroundDesktop.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container classes={{ container: "flex flex-col gap-12" }}>
        <header className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase">
            01 Pick your destination
          </p>
          <h1 className="text-4xl md:text-5xl font-Bellefair text-glow uppercase">
            Solar Exploration
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <PlanetVisual
            src={imageSrc}
            alt={planetData?.name ?? planetName}
            loading={loading}
          />

          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <PlanetNav selected={planetName} onSelect={setPlanetName} />
            <PlanetInfo 
              planetData={planetData} 
              planetName={planetName} 
              loading={loading}
            />
          </div>
        </div>

        <HistoricalMissions planetName={planetName} />
        <NasaGallery photos={planetPhotos} loading={loadingPhotos} />
      </Container>
    </section>
  );
}
