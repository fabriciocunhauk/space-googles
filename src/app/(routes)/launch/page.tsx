"use client";
import SafeImage from "@/app/components/SafeImage";
import { useEffect, useState, useMemo } from "react";
import background from "/public/assets/launch/background-technology-desktop.jpg";
import Container from "@/app/components/Container";
import VideoPlayer from "@/app/components/VideoPlayer";
import { fetchLaunches } from "@/app/api/fetchLaunches";
import { classNames } from "@/app/utils/classNames";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaSatellite } from "react-icons/fa";
import RocketFleet from "./components/RocketFleet";
import { LaunchData } from "@/app/types/launch";
import { CountdownSkeleton, DetailSkeleton } from "./components/LaunchSkeletons";

// ─── Countdown ────────────────────────────────────────────────────────────────
const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const compute = () => {
      const distance = new Date(targetDate).getTime() - Date.now();
      if (distance < 0) return;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    compute();
    const timer = setInterval(compute, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hrs", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ].map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center glass p-3 md:p-5 rounded-2xl border border-white/10 min-w-[56px] md:min-w-[90px] flex-1 group hover:border-accent-gold/40 transition-colors"
        >
          <span className="text-2xl md:text-4xl font-Bellefair text-white tabular-nums">
            {unit.value.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] md:text-[9px] text-nebula-blue/60 uppercase tracking-[0.2em] font-Barlow-Condensed mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Launch() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [upcomingLaunches, setUpcomingLaunches] = useState<LaunchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getLaunches = async () => {
      setLoading(true);
      setError(false);
      try {
        const launchInfo = await fetchLaunches();
        setUpcomingLaunches(launchInfo ?? []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getLaunches();
  }, []);

  const selectedLaunch = upcomingLaunches[selectedIndex];
  const nextLaunch = useMemo(
    () => upcomingLaunches.find((l) => l.upcoming),
    [upcomingLaunches]
  );

  return (
    <section
      className="relative min-h-screen w-full pt-44 pb-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.85), rgba(11, 13, 23, 0.85)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed" removed — causes scroll jank on mobile & Safari
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent-gold/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-14 text-white relative z-10" }}>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-1">
            <p className="text-nebula-blue/60 font-Barlow-Condensed tracking-[4px] uppercase text-sm">
              03 Space Launch Schedule
            </p>
            <h1 className="text-4xl md:text-6xl font-Bellefair text-glow tracking-wide">
              MISSION CONTROL
            </h1>
          </div>
          <div className="flex items-center gap-3 text-nebula-blue font-Barlow-Condensed bg-white/5 px-5 py-2.5 rounded-full border border-white/10 text-sm tracking-widest">
            <span
              className={classNames(
                "w-2 h-2 rounded-full",
                loading ? "bg-white/30 animate-pulse" : error ? "bg-red-400" : "bg-green-400 animate-pulse"
              )}
            />
            {loading ? "ACQUIRING TELEMETRY…" : error ? "SIGNAL LOST" : `LIVE FEED · ${upcomingLaunches.length} MISSIONS`}
          </div>
        </header>

        {loading ? (
          <CountdownSkeleton />
        ) : nextLaunch ? (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-10 glass rounded-3xl md:rounded-[40px] border border-white/10 animate-in fade-in slide-in-from-top-8 duration-1000 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
              }}
            />
            <div className="space-y-3 text-center lg:text-left z-10">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-accent-gold uppercase tracking-[3px] font-Barlow-Condensed text-xs">
                <FaClock className="animate-pulse" />
                {new Date(nextLaunch.date_utc).getTime() > Date.now() ? "Next Launch In" : "Mission Complete"}
              </div>
              <h2 className="text-3xl md:text-5xl font-Bellefair uppercase tracking-wider">
                {nextLaunch.name}
              </h2>
              <p className="text-nebula-blue/70 font-Barlow max-w-md text-sm leading-relaxed">
                {new Date(nextLaunch.date_utc).getTime() > Date.now()
                  ? `Launching from ${nextLaunch.launchpad.full_name} · ${new Date(nextLaunch.date_utc).toLocaleDateString(undefined, { dateStyle: "full" })}`
                  : "The mission has successfully launched. Telemetry is being monitored."}
              </p>
            </div>
            <div className="z-10">
              {new Date(nextLaunch.date_utc).getTime() > Date.now() ? (
                <Countdown targetDate={nextLaunch.date_utc} />
              ) : (
                <div className="px-8 py-5 glass rounded-2xl border border-accent-gold/30 text-accent-gold font-Bellefair text-xl tracking-widest uppercase">
                  Lift Off ✓
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 xl:gap-8 items-start">
          <div className="overflow-x-auto xl:overflow-x-visible xl:overflow-y-auto xl:max-h-[820px] custom-scrollbar">
            {loading ? (
              <div className="flex xl:flex-col gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 w-full glass animate-pulse rounded-2xl border border-white/5" />
                ))}
              </div>
            ) : error ? (
              <div className="glass rounded-2xl border border-red-500/20 p-8 text-center space-y-3">
                <FaSatellite className="text-3xl text-red-400 mx-auto" />
                <p className="text-nebula-blue/60 font-Barlow text-sm">Unable to load missions.</p>
              </div>
            ) : (
              <div className="flex xl:flex-col gap-3 xl:gap-3 pb-4 xl:pb-0 pr-1">
                {upcomingLaunches.map((launch, index) => (
                  <button
                    key={launch.id}
                    className={classNames(
                      "min-w-[260px] xl:min-w-0 w-full text-left transition-all duration-300 group rounded-2xl p-4 flex items-center gap-4 border",
                      selectedIndex === index
                        ? "glass border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.08)]"
                        : "glass border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                    )}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center relative">
                      {launch.links.patch.small ? (
                        <SafeImage 
                          src={launch.links.patch.small} 
                          alt={launch.name} 
                          width={44}
                          height={44}
                          className="w-full h-full object-contain" 
                          fallbackSrc="/assets/launch/falcon9.png"
                        />
                      ) : (
                        <FaRocket className="text-white/20 text-lg" />
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <span className="text-[9px] font-Barlow-Condensed tracking-[2px] text-accent-gold uppercase block mb-0.5">
                        {launch.agency?.name || "Global Mission"}
                      </span>
                      <h3 className="font-Bellefair text-base leading-tight truncate group-hover:text-white transition-colors">
                        {launch.name}
                      </h3>
                      <div className="flex flex-col gap-1 mt-1 text-[10px] text-nebula-blue/40 font-Barlow">
                        <div className="flex items-center gap-1.5">
                          <FaClock className="text-[8px]" />
                          {new Date(launch.date_utc).toLocaleString(undefined, { 
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-[8px]" />
                          {launch.launchpad.full_name}
                        </div>
                      </div>
                    </div>
                    {selectedIndex === index && (
                      <div className="flex-shrink-0 w-1.5 h-8 rounded-full bg-white/40" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {loading ? (
              <DetailSkeleton />
            ) : selectedLaunch ? (
              <div className="flex flex-col gap-6 animate-in fade-in duration-500">
                <div className="glass rounded-[28px] overflow-hidden aspect-video relative border border-white/10 shadow-2xl">
                  {selectedLaunch.links.youtube_id ? (
                    <VideoPlayer classes={{ container: "w-full h-full" }} videoId={selectedLaunch.links.youtube_id} />
                  ) : (
                    <div className="w-full h-full relative group">
                      {selectedLaunch.links.patch.large && (
                        <SafeImage 
                          src={selectedLaunch.links.patch.large} 
                          alt={selectedLaunch.name} 
                          fill
                          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" 
                          fallbackSrc="/assets/launch/falcon9.png"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <FaRocket className="text-5xl text-white/10 group-hover:scale-110 transition-transform duration-500" />
                        <p className="text-nebula-blue/60 font-Barlow-Condensed tracking-[4px] uppercase text-[10px] bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                          Live Feed Offline · Mission Image Above
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="glass rounded-[28px] p-6 md:p-8 space-y-7 border border-white/10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/8">
                    <div className="space-y-2">
                      <p className="text-[10px] text-accent-gold font-Barlow-Condensed tracking-[3px] uppercase bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20 inline-block">
                        {selectedLaunch.agency?.name || "Global Mission"}
                      </p>
                      <h2 className="text-3xl md:text-5xl font-Bellefair uppercase tracking-wide">
                        {selectedLaunch.name}
                      </h2>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {selectedLaunch.links.wikipedia && (
                        <a href={selectedLaunch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="glass px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all text-[9px] tracking-[2px] uppercase font-bold border border-white/10">
                          Wikipedia
                        </a>
                      )}
                      {selectedLaunch.links.article && (
                        <a href={selectedLaunch.links.article} target="_blank" rel="noopener noreferrer" className="glass px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all text-[9px] tracking-[2px] uppercase font-bold border border-white/10">
                          Article
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-nebula-blue/70 font-Barlow text-sm leading-relaxed">
                    {selectedLaunch.details || "Mission telemetry is being analyzed by our ground stations."}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Vehicle", value: selectedLaunch.rocket.name, icon: <FaRocket className="text-nebula-blue/30" /> },
                      { label: "Date", value: new Date(selectedLaunch.date_utc).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }), icon: <FaCalendarAlt className="text-nebula-blue/30" /> },
                      { label: "Launch Pad", value: selectedLaunch.launchpad.name, icon: <FaMapMarkerAlt className="text-nebula-blue/30" /> },
                      { 
                        label: "Status", 
                        value: selectedLaunch.upcoming ? "Upcoming" : "Complete", 
                        subtext: new Date(selectedLaunch.date_utc).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }),
                        icon: <FaClock className="text-nebula-blue/30" />, 
                        highlight: !selectedLaunch.upcoming 
                      },
                    ].map((stat, i) => (
                      <div key={i} className="glass rounded-2xl p-4 border border-white/5 space-y-2 group hover:border-white/15 transition-colors">
                        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[2px] font-Barlow-Condensed text-nebula-blue/50">
                          {stat.icon}
                          {stat.label}
                        </div>
                        <p className={classNames("font-Bellefair text-lg uppercase", stat.highlight ? "text-accent-gold" : "text-white")}>
                          {stat.value}
                        </p>
                        {stat.subtext && (
                          <p className="text-[10px] text-white/50 tracking-wider font-Barlow-Condensed uppercase">
                            {stat.subtext}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <RocketFleet />
      </Container>
    </section>
  );
}

const FaRocket = ({ className }: { className?: string }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M432.2 48a47.78 47.78 0 00-34.9 14.7L235 225.4 179 217a15.86 15.86 0 00-11.6 3.9 16 16 0 00-5.8 13.1l4 55.4-86 86-45.6-45.6a16 16 0 00-22.6 0 15.86 15.86 0 000 22.6l68.2 68.2a16 16 0 0022.6 0l86-86 55.4 4a16 16 0 0013.1-5.8 15.86 15.86 0 003.9-11.6l-8.4-56L403.4 114.7A47.78 47.78 0 00464 79.8V48zM157 325a16.09 16.09 0 00-11.3 4.7l-96 96a16 16 0 000 22.6l6.8 6.8a16 16 0 0022.6 0l96-96a16 16 0 000-22.6l-6.8-6.8A16 16 0 00157 325z" />
  </svg>
);
