"use client";
import { useEffect, useState } from "react";
import background from "/public/assets/launch/background-technology-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";
import VideoPlayer from "@/app/components/VideoPlayer";
import { fetchLaunches } from "@/app/api/fetchLaunches";

type Fairings = {
  reused?: boolean | null;
  recovery_attempt?: boolean | null;
  recovered?: boolean | null;
  ships: string[];
};

type Patch = {
  small?: string | null;
  large?: string | null;
};

type Reddit = {
  campaign?: string | null;
  launch?: string | null;
  media?: string | null;
  recovery?: string | null;
};

type Flickr = {
  small: string[];
  original: string[];
};

type Links = {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit?: string | null;
  webcast?: string;
  youtube_id?: string;
  article?: string | null;
  wikipedia?: string | null;
};

type Core = {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused?: boolean | null;
  landing_attempt?: boolean | null;
  landing_success?: boolean | null;
  landing_type?: string | null;
  landpad?: string | null;
};

type LaunchData = {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc?: string | null; // Use Date type if actual date needed
  static_fire_date_unix?: number | null;
  net: boolean;
  window?: string | null; // Use Date type if actual window needed
  rocket: string;
  success?: boolean | null;
  failures: string[];
  details?: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string; // Use Date type if actual date needed
  date_unix: number;
  date_local: string; // Use Date type if actual date needed
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
  id: string;
};

export default function Launch() {
  const [card, setCard] = useState(0);
  const [upcomingLaunches, setUpcomingLaunches] = useState<LaunchData[]>([]);

  useEffect(() => {
    const getLaunches = async () => {
      const launchInfo = await fetchLaunches();

      setUpcomingLaunches(launchInfo);
    };
    getLaunches();
  }, []);

  return (
    <section
      className="h-screen w-full pt-52 overflow-hidden"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        classes={{
          container: "flex flex-col gap-10 text-white w-full",
        }}
      >
        <h1 className="text-2xl font-light lg:text-3xl">
          SPACE LAUNCHES {upcomingLaunches.length}
        </h1>

        <div className="flex flex-col justify-center h-full">
          {upcomingLaunches.map(({ links }, index) => {
            return (
              card === index && (
                <VideoPlayer
                  key={index}
                  classes={{ container: "h-[400px]" }}
                  videoId={links.youtube_id as string}
                />
              )
            );
          })}
        </div>

        <div className="flex flex-col gap-4 overflow-auto h-96">
          {upcomingLaunches.map(({ name }, index: number) => {
            return (
              <Card
                key={index}
                classes={{
                  card: "cursor-pointer bg-opacity-20 hover:bg-opacity-100 text-white hover:text-black transition-all duration-300",
                }}
                onClick={() => setCard(index)}
              >
                <p>NAME: {name}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
