import { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { FaSatellite, FaRocket, FaGlobeAsia, FaNewspaper } from "react-icons/fa";

export const revalidate = false;

export const metadata: Metadata = {
  title: "About | Space Googles",
  description:
    "Space Googles is an independent space data dashboard bringing real-time NASA data, rocket launch schedules, ISS tracking, and space news to everyone.",
  alternates: { canonical: "https://space-googles.co.uk/about" },
  openGraph: {
    title: "About Space Googles",
    description:
      "An independent space data dashboard aggregating real-time data from NASA, SpaceX, and leading space agencies.",
    url: "https://space-googles.co.uk/about",
  },
};

const features = [
  {
    icon: FaSatellite,
    title: "ISS Live Tracking",
    description:
      "Follow the International Space Station in real time. We pull live telemetry data to show you the ISS's exact position, velocity, and next visible pass over your region — updated every 30 seconds.",
  },
  {
    icon: FaRocket,
    title: "Rocket Launch Schedule",
    description:
      "Every upcoming orbital launch, from NASA to SpaceX and beyond. We aggregate mission details, launchpad locations, countdown timers, and live video links so you never miss a launch.",
  },
  {
    icon: FaGlobeAsia,
    title: "Planetary Exploration",
    description:
      "Explore all eight planets, Earth's Moon, and beyond. Each destination includes NASA imagery, orbital statistics, historical mission records, and a curated gallery of high-resolution photography.",
  },
  {
    icon: FaNewspaper,
    title: "Space News Feed",
    description:
      "The latest headlines from the world's leading space journalism outlets, curated and presented with mission context. We add editorial commentary linking news stories to the live data you see on the dashboard.",
  },
];

const dataSources = [
  {
    name: "NASA Open APIs",
    url: "https://api.nasa.gov",
    description:
      "Astronomy Picture of the Day, Near Earth Object tracking, EPIC Earth imagery, solar weather events, and Mars InSight data.",
  },
  {
    name: "The Space Devs",
    url: "https://thespacedevs.com",
    description: "Comprehensive rocket launch schedules and active astronaut rosters from the Launch Library 2 API.",
  },
  {
    name: "Spaceflight News API",
    url: "https://api.spaceflightnewsapi.net",
    description: "Aggregated space news from SpaceNews, NASASpaceFlight, Space.com, and dozens of specialist outlets.",
  },
  {
    name: "Open Notify / WhereTheISS",
    url: "http://open-notify.org",
    description: "Real-time ISS orbital position data and crew manifest, updated every few seconds.",
  },
];

export default function About() {
  return (
    <section className="relative min-h-screen bg-deep-space pt-44 pb-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[700px] h-[500px] bg-nebula-blue/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-accent-gold/4 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-16 relative z-10" }}>

        {/* Header */}
        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">About</span> The Mission
          </p>
          <h1 className="text-5xl md:text-7xl font-Bellefair text-glow uppercase leading-tight">
            Space Googles
          </h1>
        </header>

        {/* Mission Statement */}
        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-xl md:text-2xl font-Bellefair text-nebula-blue/90 leading-relaxed">
            Space Googles is an independent space data dashboard built to make the wonders of space exploration
            accessible to everyone — for free, without paywalls, and without the noise.
          </p>
          <p className="text-nebula-blue/70 font-Barlow leading-relaxed text-lg">
            We believe that the most extraordinary data in human history — the position of the International Space
            Station, the next rocket launch, the latest image of a distant planet — should be a single click away
            for anyone curious enough to look up. Space Googles pulls real-time data from NASA, space agencies, and
            leading news providers and presents it through a clean, immersive interface designed to inspire.
          </p>
          <p className="text-nebula-blue/70 font-Barlow leading-relaxed text-lg">
            The project is maintained by an independent developer in the UK, with no institutional funding. Advertising
            revenue from Google AdSense covers server and API costs, keeping the service free for everyone.
          </p>
        </div>

        {/* What We Track */}
        <div className="space-y-8 animate-in fade-in duration-1000">
          <h2 className="text-3xl md:text-4xl font-Bellefair uppercase">What We Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="glass-card rounded-[28px] border border-white/10 p-8 space-y-4 hover:border-white/20 transition-all hover:bg-white/5"
              >
                <div className="p-3.5 bg-nebula-blue/10 rounded-2xl w-fit">
                  <Icon className="text-2xl text-nebula-blue" />
                </div>
                <h3 className="text-xl font-Bellefair uppercase">{title}</h3>
                <p className="text-nebula-blue/70 font-Barlow leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Space Googles */}
        <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-6 animate-in fade-in duration-1000">
          <h2 className="text-3xl md:text-4xl font-Bellefair uppercase">Why Space Googles?</h2>
          <p className="text-nebula-blue/80 font-Barlow leading-relaxed text-lg">
            Before Space Googles, following space meant juggling five or six different websites: NASA for imagery,
            the Space Devs for launches, a news outlet for headlines, another app for ISS tracking. The data was
            all public and free — but fragmented and often buried behind dated interfaces.
          </p>
          <p className="text-nebula-blue/80 font-Barlow leading-relaxed text-lg">
            Space Googles unifies it. One dashboard. Live data. A design that feels as epic as the subject matter.
            Whether you&apos;re a first-time stargazer or a seasoned space enthusiast, everything you need to follow
            humanity&apos;s journey into the cosmos is right here.
          </p>
        </div>

        {/* Data Sources */}
        <div className="space-y-8 animate-in fade-in duration-1000">
          <h2 className="text-3xl md:text-4xl font-Bellefair uppercase">Our Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataSources.map(({ name, url, description }) => (
              <div
                key={name}
                className="glass rounded-[24px] border border-white/10 p-6 space-y-3 hover:border-white/20 transition-all"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-Bellefair uppercase text-accent-gold hover:text-white transition-colors"
                >
                  {name} ↗
                </a>
                <p className="text-nebula-blue/70 font-Barlow text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 animate-in fade-in duration-1000">
          <p className="text-nebula-blue/60 font-Barlow-Condensed tracking-[3px] uppercase">Ready to explore?</p>
          <Link
            href="/planets"
            className="inline-block bg-white text-black px-12 py-5 rounded-full font-Bellefair text-xl hover:scale-105 transition-all shadow-glow-sm"
          >
            Explore the Solar System
          </Link>
        </div>

      </Container>
    </section>
  );
}
