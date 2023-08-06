"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWindowDimensions } from "../hooks/useDimension";
import { useSearchParams } from "next/navigation";
import { classNames } from "../utils/tilwind-jit-set";
import backgroundMobile from "../../../public/assets/destination/background-destination-mobile.jpg";
import backgroundDesktop from "../../../public/assets/destination/background-destination-desktop.jpg";
import LayoutContainer from "../components/LayoutContainer/LayoutContainer";
import Container from "../components/Container/Container";

export default function DestinationIndex() {
  const [planetId, setPlanetId] = useState(1);
  const [planetsData, setPlanetsData] = useState([]);

  const searchParams = useSearchParams();
  const planetName = searchParams.get("search");

  const { width } = useWindowDimensions();
  const sm = 640;

  useEffect(() => {
    const fetchPlanetsData = async () => {
      const planetInfo = await fetch(
        `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
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

  const handlePlanetSelection = (planetId: number) => {
    setPlanetId(planetId);
  };

  return (
    <LayoutContainer
      image={width > sm ? backgroundDesktop.src : backgroundMobile.src}
      classes={{ root: "text-white w-screen" }}
    >
      <Container>
        <div className="grid grid-cols-1 place-items-center">
          <h1 className="text-[20px] font-light font-Barlow md:place-self-start md:pl-10 lg:pl-28 lg:text-[28px]">
            01 PICK YOUR DESTINATION
          </h1>
          {planetsData.map(
            ({
              planetOrder: id,
              name,
              imgSrc,
            }: {
              planetOrder: number;
              name: string;
              imgSrc: { img: string; imgDescription: string };
            }) => {
              if (name === planetName) {
                return (
                  <Image
                    key={id}
                    className="mix-blend-lighten"
                    src={imgSrc.img}
                    alt={imgSrc.imgDescription}
                    width={400}
                    height={400}
                  />
                );
              }
            }
          )}
        </div>
        <div className="flex flex-col justify-around gap-4">
          <div className="py-5 text-center lg:text-left h-72">
            <ul className="flex justify-between items-center gap-4 w-[237.5px] sm:w-[330px] mb-4">
              {planetsData.map(
                ({
                  planetOrder: id,
                  name,
                }: {
                  planetOrder: number;
                  name: string;
                }) => {
                  return (
                    <li
                      key={id}
                      className={classNames(
                        "h-10 text-base",
                        name === planetName && "border-b-2"
                      )}
                    >
                      <Link
                        href={`/destination?search=${name}`}
                        onClick={() => handlePlanetSelection(id)}
                      >
                        {name.toUpperCase()}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
            {planetsData.map(
              ({
                planetOrder: id,
                name,
                description,
              }: {
                planetOrder: number;
                name: string;
                description: string;
              }) =>
                planetId === id ? (
                  <div key={id} className="max-w-[510px]">
                    <h2 className="text-[56px] font-Bellefair md:text-[80px] lg:text-8xl uppercase">
                      {name}
                    </h2>
                    <p className="text-center lg:text-left font-Barlow">
                      {description}
                    </p>
                  </div>
                ) : null
            )}
          </div>
          <hr className="opacity-20 my-10 md:w-[510px]" />
          <div className="flex justify-around md:w-[535px] lg:w-[410px] lg:grid-cols-2">
            {planetsData.map(({ planetOrder: id, basicDetails }: any) => {
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
                      <span className="font-Bellefair">
                        {basicDetails.mass}
                      </span>
                    </div>
                  </Fragment>
                );
              }
              return null;
            })}
          </div>
        </div>
      </Container>
    </LayoutContainer>
  );
}
