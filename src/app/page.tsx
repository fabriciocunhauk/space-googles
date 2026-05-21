import { fetchWithTimeout } from "./utils/fetchWithTimeout";
import { Button } from "./components/Button";
import Container from "./components/Container";
import { fetchMarsWeather } from "./api/fetchMarsWeather";
import { fetchNumberOfPeopleInSpace } from "./api/fetchNumberOfPeopleInSpace";
import { fetchHomeLaunches } from "./api/fetchHomeLaunches";
import { getIssLocation } from "./api/getIssLocation";
import { fetchNews } from "./api/fetchNews";
import { fetchNeoData } from "./api/fetchNeoData";
import { fetchSpaceWeather } from "./api/fetchSpaceWeather";
import { fetchEpicEarth } from "./api/fetchEpicEarth";
import {
  FaUsers,
  FaSatellite,
  FaRocket,
  FaNewspaper,
  FaMeteor,
  FaSun,
  FaGlobeAmericas,
} from "react-icons/fa";
import { WiDaySunny, WiCloudy, WiStormShowers } from "react-icons/wi";
import SafeImage from "@/app/components/SafeImage";

// ISR: revalidate this page every 5 minutes
export const revalidate = 300;

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

const fetchImageOfTheDay = async () => {
  try {
    const response = await fetchWithTimeout(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`,
      {
        // Cache for 1 hour — APOD updates once per day
        next: { revalidate: 3600 },
      } as RequestInit,
    );
    if (!response.ok) throw new Error("APOD API error");
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Failed to fetch image of the day:", error);
    return "/assets/home/background-home-desktop.jpg";
  }
};

export default async function Home() {
  const [
    imageOfTheDay,
    marsWeather,
    peopleInSpace,
    launches,
    issLocation,
    news,
    neoData,
    spaceWeather,
    epicEarth,
  ] = await Promise.all([
    fetchImageOfTheDay(),
    fetchMarsWeather(),
    fetchNumberOfPeopleInSpace(),
    fetchHomeLaunches(),
    getIssLocation(),
    fetchNews(),
    fetchNeoData(),
    fetchSpaceWeather(),
    fetchEpicEarth(),
  ]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-nebula-blue/30">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-20"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.6), rgba(11, 13, 23, 0.6)), url(${imageOfTheDay})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          // backgroundAttachment: "fixed" removed — causes scroll jank on mobile & Safari
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        <Container
          classes={{
            container:
              "flex flex-col lg:flex-row items-center justify-between w-full z-10",
          }}
        >
          <div className="text-center lg:text-left space-y-8 max-w-2xl animate-in fade-in slide-in-from-left-12 duration-1000">
            <p className="text-nebula-blue text-xl md:text-2xl font-Barlow-Condensed tracking-[4.75px] uppercase">
              SO, YOU WANT TO TRAVEL TO
            </p>
            <h1 className="text-8xl md:text-[140px] font-Bellefair leading-none text-white text-glow transition-all hover:tracking-widest duration-700">
              SPACE
            </h1>
            <p className="text-nebula-blue font-Barlow text-lg md:text-xl leading-relaxed opacity-90">
              The cosmos is within our reach. From the silent craters of the
              Moon to the swirling storms of Jupiter, your interstellar journey
              begins here.
            </p>
            <div className="pt-8">
              <Button
                href="/planets"
                classes={{
                  link: "inline-flex px-12 py-6 bg-white text-black text-xl font-Bellefair rounded-full hover:scale-110 transition-all shadow-glow group",
                }}
              >
                START JOURNEY
              </Button>
            </div>
          </div>

          <div className="mt-20 lg:mt-0 animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="glass p-8 rounded-[40px] border border-white/20 backdrop-blur-3xl space-y-6 max-w-xs">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="p-3 bg-nebula-blue/20 rounded-2xl">
                  <FaUsers className="text-2xl text-nebula-blue" />
                </div>
                <div>
                  <p className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">
                    On Board Now
                  </p>
                  <p className="text-3xl font-Bellefair">
                    {peopleInSpace.numberOfPeopleInSpace} Humans
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] text-white/50 uppercase tracking-tighter">
                  Current Residents
                </p>
                <div className="flex flex-wrap gap-2">
                  {peopleInSpace.people.slice(0, 5).map((p: any, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-1 bg-white/5 rounded-md border border-white/10"
                    >
                      {p.name}
                    </span>
                  ))}
                  {peopleInSpace.people.length > 5 && (
                    <span className="text-[10px] px-2 py-1 bg-white/5 rounded-md">
                      +{peopleInSpace.people.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Live Dashboard Section */}
      <section className="py-24 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ISS Tracker */}
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <FaSatellite className="text-3xl text-nebula-blue group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-Barlow-Condensed bg-green-500/20 text-green-400 px-2 py-1 rounded-full uppercase">
                  Live Tracking
                </span>
              </div>
              <h3 className="font-Bellefair text-2xl mb-4">ISS Position</h3>
              <div className="space-y-2 text-sm font-Barlow text-nebula-blue">
                <div className="flex justify-between">
                  <span>Lat:</span>{" "}
                  <span className="text-white">
                    {issLocation.latitude.toFixed(2)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Long:</span>{" "}
                  <span className="text-white">
                    {issLocation.longitude.toFixed(2)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Speed:</span>{" "}
                  <span className="text-white">
                    {(issLocation.velocity / 3600).toFixed(1)} km/s
                  </span>
                </div>
              </div>
            </div>

            {/* Mars Weather */}
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all border-l-4 border-l-accent-gold">
              <div className="flex justify-between items-start mb-6">
                <WiDaySunny className="text-4xl text-accent-gold" />
                <span className="text-[10px] font-Barlow-Condensed text-accent-gold uppercase">
                  Mars Sol {marsWeather.sol}
                </span>
              </div>
              <h3 className="font-Bellefair text-2xl mb-3">Mars Weather</h3>
              <p className="text-[9px] text-white/30 font-Barlow-Condensed uppercase tracking-widest mb-3">
                InSight Lander · Historical Data
              </p>
              <div className="space-y-2 text-sm font-Barlow text-nebula-blue">
                <div className="flex justify-between">
                  <span>Avg Temp:</span>{" "}
                  <span className="text-white">{marsWeather.temp}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Season:</span>{" "}
                  <span className="text-white">{marsWeather.season}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pressure:</span>{" "}
                  <span className="text-white">{marsWeather.pressure} Pa</span>
                </div>
              </div>
            </div>

            {/* Asteroid Radar */}
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all border-l-4 border-l-red-500/50">
              <div className="flex justify-between items-start mb-6">
                <FaMeteor className="text-3xl text-red-400 animate-pulse" />
                <span className="text-[10px] font-Barlow-Condensed text-red-400 uppercase">
                  NEO Radar: {neoData.count} Detected
                </span>
              </div>
              <h3 className="font-Bellefair text-2xl mb-4">Asteroid Alert</h3>
              <div className="space-y-2 text-sm font-Barlow text-nebula-blue">
                <div className="flex justify-between">
                  <span>Closest:</span>{" "}
                  <span className="text-white">
                    {neoData.closest?.name?.replace(/[()]/g, "") || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Miss Dist:</span>{" "}
                  <span className="text-white">
                    {neoData.closest?.distance || "0"} km
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hazard:</span>{" "}
                  <span
                    className={
                      neoData.closest?.isHazardous
                        ? "text-red-400 font-bold"
                        : "text-green-400"
                    }
                  >
                    {neoData.closest?.isHazardous ? "YES" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Space Weather */}
            <div className="glass p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all border-l-4 border-l-nebula-blue/50">
              <div className="flex justify-between items-start mb-6">
                <FaSun className="text-3xl text-nebula-blue" />
                <span className="text-[10px] font-Barlow-Condensed text-nebula-blue uppercase">
                  Solar Monitor
                </span>
              </div>
              <h3 className="font-Bellefair text-2xl mb-4">Space Weather</h3>
              <div className="space-y-2 text-sm font-Barlow text-nebula-blue">
                <div className="flex justify-between">
                  <span>Event:</span>{" "}
                  <span className="text-white">{spaceWeather.class} Flare</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak:</span>{" "}
                  <span className="text-white">{spaceWeather.peak}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>{" "}
                  <span className="text-white">{spaceWeather.status}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Missions & Feed Section */}
      <section className="py-24 bg-deep-space">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Upcoming Launches */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <FaRocket className="text-2xl text-nebula-blue" />
                <h2 className="text-4xl font-Bellefair uppercase tracking-widest">
                  Upcoming Launches
                </h2>
              </div>
              <div className="space-y-4">
                {launches.slice(0, 3).map((l: any, i: number) => (
                  <div
                    key={i}
                    className="glass p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <p className="text-xs text-nebula-blue font-Barlow-Condensed uppercase">
                        {l.rocket.name}
                      </p>
                      <h4 className="text-xl font-Bellefair">{l.name}</h4>
                      <p className="text-[10px] text-white/30">
                        {new Date(l.date_utc).toLocaleString(undefined, { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })} • {l.launchpad.name}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <FaRocket className="text-xs" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Reports */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <FaNewspaper className="text-2xl text-nebula-blue" />
                <h2 className="text-4xl font-Bellefair uppercase tracking-widest">
                  Space Reports
                </h2>
              </div>
              <div className="space-y-4">
                {news.slice(0, 3).map((n: any, i: number) => (
                  <div
                    key={i}
                    className="glass p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <p className="text-[10px] text-nebula-blue font-Barlow-Condensed uppercase mb-2">
                      {n.news_site}
                    </p>
                    <h4 className="text-xl font-Bellefair mb-2 group-hover:text-nebula-blue transition-colors">
                      {n.title}
                    </h4>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {n.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* EPIC Earth Section */}
      {epicEarth && (
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(66,133,244,0.05)_0%,transparent_70%)]" />
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                <div className="space-y-4">
                  <p className="text-nebula-blue text-xl font-Barlow-Condensed tracking-[4.75px] uppercase">
                    OUR FRAGILE HOME
                  </p>
                  <h2 className="text-6xl md:text-7xl font-Bellefair uppercase leading-tight">
                    Earth From <span className="text-nebula-blue">1.5M KM</span>{" "}
                    Away
                  </h2>
                </div>
                <p className="text-nebula-blue font-Barlow text-lg leading-relaxed opacity-80 max-w-xl">
                  Captured by NASA&apos;s EPIC camera on the DSCOVR satellite,
                  this is how our planet looks right now from the L1 Lagrange
                  point. A lone marble in the vast dark of space.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="glass p-6 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-nebula-blue uppercase tracking-widest mb-1">
                      Centroid Latitude
                    </p>
                    <p className="text-2xl font-Bellefair">
                      {epicEarth.coords.lat}°
                    </p>
                  </div>
                  <div className="glass p-6 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-nebula-blue uppercase tracking-widest mb-1">
                      Centroid Longitude
                    </p>
                    <p className="text-2xl font-Bellefair">
                      {epicEarth.coords.lon}°
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/30 text-xs font-Barlow">
                  <FaGlobeAmericas />
                  <span>
                    Captured on {new Date(epicEarth.date).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative aspect-square animate-in fade-in zoom-in duration-1000 delay-300">
                <div className="absolute inset-0 bg-nebula-blue/20 blur-[100px] rounded-full" />
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(208,214,249,0.2)]">
                  <SafeImage
                    src={epicEarth.url}
                    alt="Latest Earth View"
                    fill
                    className="object-cover scale-110 hover:scale-100 transition-transform duration-[3000ms]"
                    fallbackSrc="/assets/home/background-home-desktop.jpg"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-black overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nebula-blue/5 blur-[150px] rounded-full pointer-events-none" />
        <Container
          classes={{ container: "text-center space-y-12 relative z-10" }}
        >
          <h2 className="text-6xl md:text-8xl font-Bellefair uppercase">
            Ready to Explore?
          </h2>
          <p className="text-nebula-blue font-Barlow text-xl max-w-2xl mx-auto opacity-80">
            Join the mission and discover the secrets of our solar system. Your
            adventure across the stars is just one click away.
          </p>
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping group-hover:scale-150 transition-transform duration-700 blur-xl" />
              <div className="relative z-10 bg-white hover:bg-opacity-90 transition-all duration-500 p-16 md:p-24 rounded-full shadow-glow">
                <Button
                  href="/planets"
                  classes={{
                    link: "text-3xl md:text-4xl font-Bellefair text-black",
                  }}
                >
                  EXPLORE
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
