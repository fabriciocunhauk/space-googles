"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { classNames } from "@/app/utils/tilwind-jit-set";
import { useWindowDimensions } from "@/app/hooks/useDimension";
import backgroundMobile from "/public/assets/destination/background-destination-mobile.jpg";
import backgroundDesktop from "/public/assets/destination/background-destination-desktop.jpg";

const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

type PlanesData = {
  planetOrder: number;
  name: string;
  description: string;
  imgSrc: { img: string; imgDescription: string };
  basicDetails: { volume: string; mass: string };
}[];

export default function DestinationIndex() {
  const [planetId, setPlanetId] = useState(1);
  const [planetsData, setPlanetsData] = useState<PlanesData>([]);

  const searchParams = useSearchParams();

  const { width } = useWindowDimensions();
  const sm = 640;

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const planetInfo = await fetch(
        `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": `${apiKey}`,
            "X-RapidAPI-Host": "planets-info-by-newbapi.p.rapidapi.com",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data);

      setPlanetsData(planetInfo);
    };
    fetchPlanetsData();
  }, [searchParams]);

  return (
    <section
      className="flex h-full items-center pt-40 p-20 text-white"
      style={{
        backgroundImage: `url(${
          width > sm ? backgroundDesktop.src : backgroundMobile.src
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-around items-center gap-4">
        <div className="text-center lg:text-left">
          <ul className="flex justify-between items-center gap-4 mb-4">
            {planetsData.map(({ planetOrder: id, name }) => {
              return (
                <li
                  key={id}
                  className={classNames(
                    "text-base cursor-pointer pb-2",
                    id === planetId && "border-b-2"
                  )}
                >
                  <button onClick={() => setPlanetId(id)}>
                    {name.toUpperCase()}
                  </button>
                </li>
              );
            })}
          </ul>

          {planetsData.map(
            ({ planetOrder: id, name, description, imgSrc }) =>
              planetId === id && (
                <div
                  key={id}
                  className="flex flex-col items-center max-w-[510px]"
                >
                  <div className="h-40 my-4">
                    <h2 className="font-Bellefair text-6xl uppercase">
                      {name}
                    </h2>
                    <p className="text-center lg:text-left font-Barlow">
                      {description}
                    </p>
                  </div>
                  <Image
                    key={id}
                    className="mix-blend-lighten w-72 h-72"
                    src={imgSrc.img}
                    alt={imgSrc.imgDescription}
                    width={400}
                    height={400}
                  />
                </div>
              )
          )}
        </div>
        <hr className="opacity-20 my-10 md:w-[510px]" />
        <div className="flex justify-around md:w-[535px] lg:w-[410px] lg:grid-cols-2">
          {planetsData.map(({ planetOrder: id, basicDetails }) => {
            if (id === planetId) {
              return (
                <Fragment key={id}>
                  <div className="flex flex-col items-center text-base">
                    <h2 className="font-Barlow text-secondary">VOLUME</h2>
                    <span className="font-Bellefair">
                      {basicDetails.volume}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-base">
                    <h2 className="font-Barlow text-secondary">MASS</h2>
                    <span className="font-Bellefair">{basicDetails.mass}</span>
                  </div>
                </Fragment>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}
