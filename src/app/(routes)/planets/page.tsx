import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import backgroundDesktop from "/public/assets/planets/background-destination-desktop.jpg";
import Container from "@/app/components/Container";
import { PLANET_LIST, PLANET_IMAGES } from "./constants";
import { PLANET_CONTENT } from "./content";

export const metadata: Metadata = {
  title: "Explore the Solar System | Space Googles",
  description:
    "Explore all 12 destinations in our solar system — from Mercury to Neptune, our Moon to Titan. Real NASA imagery, orbital data, and mission history for each world.",
  alternates: { canonical: "https://space-googles.co.uk/planets" },
};

export default function PlanetsIndex() {
  return (
    <section
      className="relative min-h-screen pt-44 pb-20 text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.75), rgba(11, 13, 23, 0.75)), url(${backgroundDesktop.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] bg-nebula-blue/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-12 relative z-10" }}>

        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">01</span> Solar Exploration
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Pick Your Destination
          </h1>
          <p className="text-nebula-blue/70 font-Barlow text-lg max-w-2xl leading-relaxed">
            12 worlds to explore. Select a destination to dive into NASA imagery, orbital statistics,
            historical missions, and real-time space context.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {PLANET_LIST.map((name) => {
            const tagline = PLANET_CONTENT[name].tagline;
            const displayName = PLANET_CONTENT[name].name;

            return (
              <Link
                key={name}
                href={`/planets/${name}`}
                className="glass-card group rounded-[24px] border border-white/10 hover:border-white/30 overflow-hidden flex flex-col hover:bg-white/5 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={PLANET_IMAGES[name]}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                    alt={displayName}
                  />
                </div>
                <div className="p-4 space-y-1 border-t border-white/5">
                  <p className="font-Bellefair text-lg uppercase leading-tight">{displayName}</p>
                  <p className="text-nebula-blue/60 font-Barlow text-xs">{tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
