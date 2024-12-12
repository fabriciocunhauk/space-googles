"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { classNames } from "@/app/utils/tilwind-jit-set";
import { useWindowDimensions } from "@/app/hooks/useDimension";
import backgroundMobile from "/public/assets/destination/background-destination-mobile.jpg";
import backgroundDesktop from "/public/assets/destination/background-destination-desktop.jpg";
import Container from "@/app/components/Container";
import { fetchPlanetData } from "@/app/api/fetchPlanetData";

type PlanesData = {
  name: string;
  tagline: string;
  tagline_icon: string;
  picture: string;
  textureUrl: string;
  description: string;
  distanceFromSun: string;
  yearLength: string;
  numberOfMoons: number;
  namesake: string;
  rings: {
    url_exists: boolean;
  };
  spaceTexture_url: string;
};

const planets = [
  {
    id: 1,
    name: "earth",
  },
  {
    id: 2,
    name: "mars",
  },
  {
    id: 3,
    name: "mercury",
  },
  {
    id: 4,
    name: "venus",
  },
  {
    id: 5,
    name: "saturn",
  },
  {
    id: 6,
    name: "uranus",
  },
  {
    id: 7,
    name: "jupiter",
  },
  {
    id: 8,
    name: "neptune",
  },
];

export default function Planets() {
  const [planetName, setPlanetName] = useState("earth");
  const [planetsData, setPlanetsData] = useState<PlanesData>();

  const { width } = useWindowDimensions();
  const sm = 640;

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const planetInfo = await fetchPlanetData(planetName);
      setPlanetsData(planetInfo);
    };
    fetchPlanetsData();
  }, [planetName]);

  return (
    <section
      className="flex min-h-screen items-center pt-32 text-white"
      style={{
        backgroundImage: `url(${
          width > sm ? backgroundDesktop.src : backgroundMobile.src
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        classes={{
          container:
            "flex flex-col items-center justify-center items-center gap-4",
        }}
      >
        <div className="flex md:flex-col items-center text-center">
          <ul className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            {planets.map(({ id, name }) => (
              <li
                key={id}
                className={classNames(
                  "text-base cursor-pointer pb-2",
                  name === planetName && "border-b-2"
                )}
              >
                <button onClick={() => setPlanetName(name)}>
                  {name.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center justify-center md:h-[550px] md:w-[550px]">
            <h2 className="font-Bellefair text-6xl uppercase">
              {planetsData?.name}
            </h2>

            {planetsData?.picture && (
              <Image
                className="mix-blend-lighten"
                src={planetsData?.picture}
                alt={planetsData?.name}
                width={500}
                height={500}
              />
            )}
          </div>
        </div>

        <hr className="opacity-20 w-full" />
        <p className="text-center  font-Barlow text-base md:text-base">
          {planetsData?.description}
        </p>

        <div className="flex justify-around gap-10 lg:grid-cols-2 text-center  text-xs md:text-base">
          <div className="flex flex-col items-center">
            <h2 className="font-Barlow text-secondary">
              DISTANCE FROM THE SUN
            </h2>
            <span className="font-Bellefair">
              {planetsData?.distanceFromSun}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="font-Barlow text-secondary">YEAR LENGTH</h2>
            <span className="font-Bellefair">
              {planetsData?.yearLength} DAYS
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="font-Barlow text-secondary">NUMBER OF MOONS</h2>
            <span className="font-Bellefair">{planetsData?.numberOfMoons}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
