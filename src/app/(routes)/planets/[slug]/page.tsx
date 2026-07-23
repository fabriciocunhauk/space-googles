import { Metadata } from "next";
import { notFound } from "next/navigation";
import backgroundDesktop from "/public/assets/planets/background-destination-desktop.jpg";
import Container from "@/app/components/Container";
import PlanetVisual from "../components/PlanetVisual";
import PlanetNav from "../components/PlanetNav";
import PlanetInfo from "../components/PlanetInfo";
import PlanetOverview from "../components/PlanetOverview";
import NasaGallery from "../components/NasaGallery";
import HistoricalMissions from "../components/HistoricalMissions";
import { AdUnit } from "@/app/components/AdUnit";
import { fetchPlanetImages } from "@/app/api/fetchPlanetImages";
import { PLANET_IMAGES, PLANET_LIST, PlanetName } from "../constants";
import { PLANET_CONTENT } from "../content";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return PLANET_LIST.map((name) => ({ slug: name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug.toLowerCase();
  if (!(slug in PLANET_IMAGES)) return { title: "Planet Not Found | Space Googles" };

  const planetName = slug as PlanetName;
  const content = PLANET_CONTENT[planetName];

  return {
    title: `${content.name} | Solar System Exploration | Space Googles`,
    description: content.overview[0].slice(0, 155),
    alternates: { canonical: `https://space-googles.co.uk/planets/${slug}` },
    openGraph: {
      title: `${content.name} | Space Googles`,
      url: `https://space-googles.co.uk/planets/${slug}`,
      images: [{ url: `https://space-googles.co.uk${PLANET_IMAGES[planetName]}` }],
    },
  };
}

export default async function PlanetPage({ params }: Props) {
  const slug = params.slug.toLowerCase();

  if (!(slug in PLANET_IMAGES)) notFound();

  const planetName = slug as PlanetName;
  const content = PLANET_CONTENT[planetName];

  const planetPhotos = await fetchPlanetImages(planetName);

  const imageSrc = PLANET_IMAGES[planetName];

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
            alt={content.name}
            loading={false}
          />

          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <PlanetNav selected={planetName} />
            <PlanetInfo planet={content} />
          </div>
        </div>

        <PlanetOverview planet={content} />

        <AdUnit slotId="9298088908" format="fluid" layout="in-article" />

        <HistoricalMissions
          explorationHistory={content.explorationHistory}
          missions={content.missions}
        />
        <NasaGallery photos={planetPhotos} loading={false} />
      </Container>
    </section>
  );
}
