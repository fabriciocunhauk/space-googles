"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { classNames } from "@/app/utils/tilwind-jit-set";
import backgroundDesktop from "/public/assets/planets/background-destination-desktop.jpg";
import Container from "@/app/components/Container";
import { fetchPlanetData } from "@/app/api/fetchPlanetData";
import { fetchPlanetImages } from "@/app/api/fetchPlanetImages";

type PlanetData = {
  name: string;
  tagline: string;
  picture: string;
  description: string;
  distanceFromSun: string;
  yearLength: string;
  numberOfMoons: number;
};

type NASAImage = {
  href: string;
  title: string;
  description: string;
};

const planetList = [
  "earth",
  "mars",
  "mercury",
  "venus",
  "saturn",
  "uranus",
  "jupiter",
  "neptune",
  "pluto",
  "moon",
  "europa",
  "titan",
];

const planetImages: Record<string, string> = {
  earth: "/assets/planets/earth.webp",
  mars: "/assets/planets/mars.webp",
  mercury: "/assets/planets/mercury.webp",
  venus: "/assets/planets/venus.webp",
  saturn: "/assets/planets/saturn.webp",
  uranus: "/assets/planets/uranus.webp",
  jupiter: "/assets/planets/jupiter.webp",
  neptune: "/assets/planets/neptune.webp",
  pluto: "/assets/planets/pluto.webp",
  moon: "/assets/planets/moon.webp",
  europa: "/assets/planets/europa.webp",
  titan: "/assets/planets/titan.webp",
};

const fallbackPlanetData: Record<string, PlanetData> = {
  moon: {
    name: "Moon",
    tagline: "Earth's natural satellite",
    picture: "/assets/planets/moon.webp",
    description: "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    distanceFromSun: "384,400 km",
    yearLength: "27.3",
    numberOfMoons: 0,
  },
  europa: {
    name: "Europa",
    tagline: "One of Jupiter's moons",
    picture: "/assets/planets/europa.webp",
    description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distanceFromSun: "628,300,000 km",
    yearLength: "3.5",
    numberOfMoons: 0,
  },
  titan: {
    name: "Titan",
    tagline: "Saturn's largest moon",
    picture: "/assets/planets/titan.webp",
    description: "The only moon known to have a dense atmosphere, and the only object in space, other than Earth, where clear evidence of stable bodies of surface liquid has been found. Titan is a holiday for adventurers.",
    distanceFromSun: "1,400,000,000 km",
    yearLength: "15.9",
    numberOfMoons: 0,
  },
  pluto: {
    name: "Pluto",
    tagline: "The beloved dwarf planet",
    picture: "/assets/planets/pluto.webp",
    description: "Pluto is a complex world with mountains, valleys, plains, craters, and apparently even glaciers. It was long considered our ninth planet, but is now classified as a dwarf planet. It remains a fan favorite and a mysterious destination in the Kuiper Belt.",
    distanceFromSun: "5.9 billion km",
    yearLength: "248 years",
    numberOfMoons: 5,
  },
};

export default function Planets() {
  const [planetName, setPlanetName] = useState("earth");
  const [planetData, setPlanetData] = useState<PlanetData | null>(null);
  const [planetPhotos, setPlanetPhotos] = useState<NASAImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const info = await fetchPlanetData(planetName);
        if (info.error) {
          setPlanetData(fallbackPlanetData[planetName] || null);
        } else {
          setPlanetData(info);
        }
      } catch (error) {
        console.error("Error fetching planet data:", error);
        setPlanetData(fallbackPlanetData[planetName] || null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [planetName]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoadingPhotos(true);
      try {
        const photos = await fetchPlanetImages(planetName);
        setPlanetPhotos(photos);
      } catch (error) {
        console.error("Error fetching NASA photos:", error);
      } finally {
        setLoadingPhotos(false);
      }
    };
    getPhotos();
  }, [planetName]);

  return (
    <section
      className="relative min-h-screen pt-32 pb-20 text-white overflow-hidden"
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
          {/* Planet Visual */}
          <div className="flex justify-center animate-in zoom-in-75 duration-1000">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
              <div className="absolute inset-0 bg-nebula-blue/20 blur-[100px] rounded-full animate-pulse" />
              {(planetImages[planetName] || planetData?.picture) && (
                <Image
                  src={planetImages[planetName] || planetData!.picture}
                  alt={planetData?.name || planetName}
                  fill
                  className={classNames(
                    "object-contain transition-all duration-700 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]",
                    loading
                      ? "scale-90 opacity-50 blur-sm"
                      : "scale-100 opacity-100 blur-0",
                  )}
                  priority
                />
              )}
            </div>
          </div>

          {/* Planet Info */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <nav className="flex flex-wrap gap-6 md:gap-8 border-b border-white/10 pb-4">
              {planetList.map((name) => (
                <button
                  key={name}
                  onClick={() => setPlanetName(name)}
                  className={classNames(
                    "font-Barlow-Condensed tracking-[2.7px] uppercase transition-all duration-300 border-b-2 pb-2 -mb-[18px]",
                    planetName === name
                      ? "text-white border-white"
                      : "text-nebula-blue border-transparent hover:border-white/50",
                  )}
                >
                  {name}
                </button>
              ))}
            </nav>

            <div className="space-y-4">
              <h2 className="text-7xl md:text-8xl font-Bellefair uppercase tracking-widest text-glow">
                {planetData?.name || planetName}
              </h2>
              <p className="text-nebula-blue font-Barlow text-lg leading-relaxed max-w-xl">
                {planetData?.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <p className="text-[10px] font-Barlow-Condensed tracking-[2.35px] uppercase text-nebula-blue">
                  Avg. Distance
                </p>
                <p className="text-xl md:text-2xl font-Bellefair uppercase">
                  {planetData?.distanceFromSun}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-Barlow-Condensed tracking-[2.35px] uppercase text-nebula-blue">
                  Year Length
                </p>
                <p className="text-xl md:text-2xl font-Bellefair uppercase">
                  {planetData?.yearLength} d
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-Barlow-Condensed tracking-[2.35px] uppercase text-nebula-blue">
                  Moons
                </p>
                <p className="text-xl md:text-2xl font-Bellefair uppercase">
                  {planetData?.numberOfMoons}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NASA Photo Gallery */}
        <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <header className="flex items-center gap-4">
            <h3 className="text-2xl font-Bellefair uppercase">NASA Gallery</h3>
            <div className="h-[1px] flex-grow bg-white/10" />
            <p className="text-xs text-nebula-blue font-Barlow uppercase tracking-widest">
              Real Mission Photos
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loadingPhotos ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="glass-card aspect-square animate-pulse"
                  />
                ))
            ) : planetPhotos.length > 0 ? (
              planetPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="glass-card group relative aspect-square overflow-hidden cursor-pointer hover:scale-[1.05] transition-all duration-500"
                >
                  <Image
                    src={photo.href}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                    <p className="text-[10px] text-white font-Barlow uppercase line-clamp-2">
                      {photo.title}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-nebula-blue font-Barlow italic">
                No mission photography found in archives.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
