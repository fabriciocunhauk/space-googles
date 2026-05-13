"use client";
import { useEffect, useState } from "react";
import background from "/public/assets/launch/background-technology-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";
import VideoPlayer from "@/app/components/VideoPlayer";
import { fetchLaunches } from "@/app/api/fetchLaunches";
import { classNames } from "@/app/utils/tilwind-jit-set";

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

type Rocket = {
  name: string;
  id: string;
};

type Launchpad = {
  name: string;
  full_name: string;
  id: string;
};

type LaunchData = {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc?: string | null;
  static_fire_date_unix?: number | null;
  net: boolean;
  window?: string | null;
  rocket: Rocket;
  success?: boolean | null;
  failures: string[];
  details?: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: Launchpad;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
  id: string;
};

export default function Launch() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [upcomingLaunches, setUpcomingLaunches] = useState<LaunchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLaunches = async () => {
      setLoading(true);
      try {
        const launchInfo = await fetchLaunches();
        setUpcomingLaunches(launchInfo);
      } catch (error) {
        console.error("Error fetching launches:", error);
      } finally {
        setLoading(false);
      }
    };
    getLaunches();
  }, []);

  const selectedLaunch = upcomingLaunches[selectedIndex];

  return (
    <section
      className="relative min-h-screen w-full pt-32 pb-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.8), rgba(11, 13, 23, 0.8)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container classes={{ container: "flex flex-col gap-10 text-white w-full h-full" }}>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase">
              03 Space Launch Schedule
            </p>
            <h1 className="text-4xl md:text-5xl font-Bellefair text-glow">
              MISSION CONTROL
            </h1>
          </div>
          <div className="flex items-center gap-4 text-nebula-blue font-Barlow">
            <span className="w-3 h-3 rounded-full bg-accent-gold animate-pulse" />
            LIVE FEED: {upcomingLaunches.length} UPCOMING MISSIONS
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Sidebar: Mission List */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar animate-in fade-in slide-in-from-left-8 duration-1000">
            {upcomingLaunches.map((launch, index) => (
              <button
                key={launch.id}
                className={classNames(
                  "w-full text-left transition-all duration-300 transform",
                  selectedIndex === index 
                    ? "glass-card border-white/40 scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                    : "glass bg-opacity-5 hover:bg-opacity-10 border-transparent p-6 rounded-2xl hover:translate-x-2"
                )}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-Barlow-Condensed tracking-widest text-nebula-blue uppercase">
                    FLIGHT #{launch.flight_number}
                  </span>
                  {launch.upcoming ? (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-accent-gold/20 text-accent-gold border border-accent-gold/30 uppercase">Upcoming</span>
                  ) : (
                    <span className={classNames(
                      "px-2 py-0.5 rounded text-[10px] border uppercase",
                      launch.success ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
                    )}>
                      {launch.success ? "Success" : "Failed"}
                    </span>
                  )}
                </div>
                <h3 className="font-Bellefair text-xl mb-1">{launch.name}</h3>
                <p className="text-xs text-nebula-blue font-Barlow">
                  {new Date(launch.date_utc).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </p>
              </button>
            ))}
          </div>

          {/* Main: Mission Detail */}
          <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {selectedLaunch ? (
              <>
                <div className="glass rounded-3xl overflow-hidden aspect-video relative group border border-white/10 shadow-2xl">
                  {selectedLaunch.links.youtube_id ? (
                    <VideoPlayer
                      classes={{ container: "w-full h-full" }}
                      videoId={selectedLaunch.links.youtube_id}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-deep-space/40 backdrop-blur-sm">
                      <p className="text-nebula-blue font-Barlow text-lg">Webcast not available yet</p>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full text-xs font-bold tracking-widest text-white/80">
                    4K LIVE STREAM
                  </div>
                </div>

                <div className="glass-card space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <h2 className="text-3xl font-Bellefair">{selectedLaunch.name}</h2>
                    <div className="flex gap-4">
                      {selectedLaunch.links.wikipedia && (
                        <a href={selectedLaunch.links.wikipedia} target="_blank" rel="noopener" className="text-nebula-blue hover:text-white transition-colors text-xs tracking-widest uppercase">WIKIPEDIA</a>
                      )}
                      {selectedLaunch.links.article && (
                        <a href={selectedLaunch.links.article} target="_blank" rel="noopener" className="text-nebula-blue hover:text-white transition-colors text-xs tracking-widest uppercase">ARTICLE</a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-nebula-blue font-Barlow leading-relaxed italic">
                    {selectedLaunch.details || "No mission details available for this flight."}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Rocket</span>
                      <p className="font-Bellefair text-lg uppercase">{selectedLaunch.rocket.name}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Launchpad</span>
                      <p className="font-Bellefair text-lg uppercase">{selectedLaunch.launchpad.full_name}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Payloads</span>
                      <p className="font-Bellefair text-lg uppercase">{selectedLaunch.payloads.length || 1}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Precision</span>
                      <p className="font-Bellefair text-lg uppercase">{selectedLaunch.date_precision}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center glass-card">
                <p className="text-nebula-blue animate-pulse">Initializing Mission Data...</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
