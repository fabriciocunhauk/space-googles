"use client";
import { useEffect, useState, useMemo } from "react";
import background from "/public/assets/launch/background-technology-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";
import VideoPlayer from "@/app/components/VideoPlayer";
import { fetchLaunches } from "@/app/api/fetchLaunches";
import { classNames } from "@/app/utils/tilwind-jit-set";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// ... [existing types remain the same] ...
type Fairings = { reused?: boolean | null; recovery_attempt?: boolean | null; recovered?: boolean | null; ships: string[]; };
type Patch = { small?: string | null; large?: string | null; };
type Reddit = { campaign?: string | null; launch?: string | null; media?: string | null; recovery?: string | null; };
type Flickr = { small: string[]; original: string[]; };
type Links = { patch: Patch; reddit: Reddit; flickr: Flickr; presskit?: string | null; webcast?: string; youtube_id?: string; article?: string | null; wikipedia?: string | null; };
type Core = { core: string; flight: number; gridfins: boolean; legs: boolean; reused?: boolean | null; landing_attempt?: boolean | null; landing_success?: boolean | null; landing_type?: string | null; landpad?: string | null; };
type Rocket = { name: string; id: string; };
type Launchpad = { name: string; full_name: string; id: string; };
type LaunchData = { fairings: Fairings; links: Links; static_fire_date_utc?: string | null; static_fire_date_unix?: number | null; net: boolean; window?: string | null; rocket: Rocket; success?: boolean | null; failures: string[]; details?: string | null; crew: string[]; ships: string[]; capsules: string[]; payloads: string[]; launchpad: Launchpad; flight_number: number; name: string; date_utc: string; date_unix: number; date_local: string; date_precision: string; upcoming: boolean; cores: Core[]; auto_update: boolean; tbd: boolean; launch_library_id: string; id: string; };

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((unit) => (
        <div key={unit.label} className="flex flex-col items-center glass p-4 md:p-6 rounded-2xl border border-white/10 min-w-[70px] md:min-w-[100px]">
          <span className="text-2xl md:text-4xl font-Bellefair text-white">{unit.value.toString().padStart(2, '0')}</span>
          <span className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed mt-1">{unit.label}</span>
        </div>
      ))}
    </div>
  );
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
  const nextLaunch = useMemo(() => upcomingLaunches.find(l => l.upcoming), [upcomingLaunches]);

  return (
    <section
      className="relative min-h-screen w-full pt-44 pb-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.8), rgba(11, 13, 23, 0.8)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container classes={{ container: "flex flex-col gap-16 text-white w-full h-full" }}>
        {/* Countdown Section */}
        {nextLaunch && (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-10 glass rounded-[40px] border border-white/20 animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start text-accent-gold uppercase tracking-[3px] font-Barlow-Condensed text-sm">
                <FaClock className="animate-pulse" />
                Next Launch In
              </div>
              <h2 className="text-4xl md:text-5xl font-Bellefair uppercase tracking-widest">{nextLaunch.name}</h2>
              <p className="text-nebula-blue font-Barlow max-w-md">Launching from {nextLaunch.launchpad.full_name} on {new Date(nextLaunch.date_utc).toLocaleDateString(undefined, { dateStyle: 'full' })}.</p>
            </div>
            <Countdown targetDate={nextLaunch.date_utc} />
          </div>
        )}

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase">
              03 Space Launch Schedule
            </p>
            <h1 className="text-4xl md:text-5xl font-Bellefair text-glow">
              MISSION CONTROL
            </h1>
          </div>
          <div className="flex items-center gap-4 text-nebula-blue font-Barlow bg-white/5 px-6 py-3 rounded-full border border-white/10">
            <span className="w-3 h-3 rounded-full bg-accent-gold animate-pulse" />
            LIVE FEED: {upcomingLaunches.length} ACTIVE MISSIONS
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 h-full">
          {/* Sidebar: Mission List */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto max-h-[700px] pr-4 custom-scrollbar animate-in fade-in slide-in-from-left-8 duration-1000">
            {upcomingLaunches.map((launch, index) => (
              <button
                key={launch.id}
                className={classNames(
                  "w-full text-left transition-all duration-500 transform group relative overflow-hidden rounded-2xl",
                  selectedIndex === index 
                    ? "glass-card border-white/40 scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                    : "glass bg-opacity-5 hover:bg-opacity-20 border-white/5 p-6 hover:translate-x-3"
                )}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-Barlow-Condensed tracking-widest text-nebula-blue uppercase">
                    FLIGHT #{launch.flight_number}
                  </span>
                  {launch.upcoming ? (
                    <span className="px-2 py-0.5 rounded-full text-[8px] bg-accent-gold/20 text-accent-gold border border-accent-gold/30 uppercase tracking-widest">Upcoming</span>
                  ) : (
                    <span className={classNames(
                      "px-2 py-0.5 rounded-full text-[8px] border uppercase tracking-widest",
                      launch.success ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
                    )}>
                      {launch.success ? "Success" : "Failed"}
                    </span>
                  )}
                </div>
                <h3 className="font-Bellefair text-2xl mb-2 group-hover:text-glow transition-all">{launch.name}</h3>
                <div className="flex items-center gap-2 text-xs text-nebula-blue font-Barlow opacity-60">
                   <FaCalendarAlt className="text-[10px]" />
                   {new Date(launch.date_utc).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </div>
                {selectedIndex === index && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Main: Mission Detail */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {selectedLaunch ? (
              <>
                <div className="glass rounded-[40px] overflow-hidden aspect-video relative group border border-white/20 shadow-2xl transition-all hover:border-white/40">
                  {selectedLaunch.links.youtube_id ? (
                    <VideoPlayer
                      classes={{ container: "w-full h-full" }}
                      videoId={selectedLaunch.links.youtube_id}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-deep-space/40 backdrop-blur-sm">
                      <FaRocket className="text-6xl text-white/10 animate-bounce mb-4" />
                      <p className="text-nebula-blue font-Barlow text-lg tracking-widest uppercase">Webcast not available yet</p>
                    </div>
                  )}
                  <div className="absolute top-6 right-6 glass px-6 py-2 rounded-full text-[10px] font-bold tracking-[3px] text-white/90 uppercase border border-white/20">
                    Mission Control Live
                  </div>
                </div>

                <div className="glass-card p-10 space-y-8 rounded-[40px]">
                  <div className="flex flex-wrap justify-between items-center gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-1">
                      <p className="text-xs text-accent-gold font-Barlow-Condensed tracking-widest uppercase">Mission Name</p>
                      <h2 className="text-4xl md:text-5xl font-Bellefair">{selectedLaunch.name}</h2>
                    </div>
                    <div className="flex gap-4">
                      {selectedLaunch.links.wikipedia && (
                        <a href={selectedLaunch.links.wikipedia} target="_blank" rel="noopener" className="glass px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all text-[10px] tracking-widest uppercase font-bold border border-white/20">WIKIPEDIA</a>
                      )}
                      {selectedLaunch.links.article && (
                        <a href={selectedLaunch.links.article} target="_blank" rel="noopener" className="glass px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all text-[10px] tracking-widest uppercase font-bold border border-white/20">ARTICLE</a>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-nebula-blue font-Barlow text-lg leading-relaxed max-w-3xl">
                      {selectedLaunch.details || "No mission details available for this flight. SpaceX continues to push the boundaries of space exploration with each mission."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-4">
                    {[
                      { label: "Rocket", value: selectedLaunch.rocket.name, icon: <FaRocket /> },
                      { label: "Launchpad", value: selectedLaunch.launchpad.name, icon: <FaMapMarkerAlt /> },
                      { label: "Payloads", value: selectedLaunch.payloads.length || 1, icon: <FaCalendarAlt /> },
                      { label: "Precision", value: selectedLaunch.date_precision, icon: <FaClock /> }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-3 group">
                        <div className="flex items-center gap-2 text-nebula-blue">
                          <span className="text-xs opacity-50">{stat.icon}</span>
                          <span className="text-[10px] uppercase tracking-widest font-Barlow-Condensed">{stat.label}</span>
                        </div>
                        <p className="font-Bellefair text-2xl uppercase group-hover:text-accent-gold transition-colors">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[600px] flex items-center justify-center glass-card rounded-[40px]">
                <div className="text-center space-y-4">
                   <div className="w-16 h-16 border-4 border-t-accent-gold border-white/10 rounded-full animate-spin mx-auto" />
                   <p className="text-nebula-blue font-Barlow tracking-widest uppercase text-sm animate-pulse">Initializing Mission Data...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

const FaRocket = ({ className }: { className?: string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M432.2 48a47.78 47.78 0 00-34.9 14.7L235 225.4 179 217a15.86 15.86 0 00-11.6 3.9 16 16 0 00-5.8 13.1l4 55.4-86 86-45.6-45.6a16 16 0 00-22.6 0 15.86 15.86 0 000 22.6l68.2 68.2a16 16 0 0022.6 0l86-86 55.4 4a16 16 0 0013.1-5.8 15.86 15.86 0 003.9-11.6l-8.4-56L403.4 114.7A47.78 47.78 0 00464 79.8V48zM157 325a16.09 16.09 0 00-11.3 4.7l-96 96a16 16 0 000 22.6l6.8 6.8a16 16 0 0022.6 0l96-96a16 16 0 000-22.6l-6.8-6.8A16 16 0 00157 325z"></path>
  </svg>
);
