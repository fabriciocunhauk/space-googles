"use client";
import { useEffect, useState, useMemo } from "react";
import background from "/public/assets/launch/background-technology-desktop.jpg";
import Container from "@/app/components/Container";
import VideoPlayer from "@/app/components/VideoPlayer";
import { fetchLaunches } from "@/app/api/fetchLaunches";
import { classNames } from "@/app/utils/tilwind-jit-set";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaSatellite } from "react-icons/fa";
import RocketFleet from "./components/RocketFleet";

// ─── Types ───────────────────────────────────────────────────────────────────
type Fairings = {
  reused?: boolean | null;
  recovery_attempt?: boolean | null;
  recovered?: boolean | null;
  ships: string[];
};
type Patch = { small?: string | null; large?: string | null };
type Reddit = {
  campaign?: string | null;
  launch?: string | null;
  media?: string | null;
  recovery?: string | null;
};
type Flickr = { small: string[]; original: string[] };
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
type Rocket = { name: string; id: string };
type Launchpad = { name: string; full_name: string; id: string };
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
  agency?: { name: string; type: string };
  status?: { name: string; abbrev: string };
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

// ─── Skeleton Components ─────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-xl bg-white/5",
        className ?? ""
      )}
    />
  );
}

function CountdownSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-10 glass rounded-3xl md:rounded-[40px] border border-white/10">
      <div className="space-y-4 w-full max-w-md">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-20 md:h-28 md:w-28 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="flex xl:flex-col gap-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="min-w-[260px] xl:min-w-0 flex items-center gap-4 p-5 glass rounded-2xl border border-white/5"
        >
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="aspect-video w-full rounded-[32px]" />
      <div className="glass-card p-6 md:p-10 space-y-8 rounded-[32px]">
        <div className="space-y-3 pb-6 border-b border-white/10">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-12 w-72" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-7 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Countdown ────────────────────────────────────────────────────────────────
const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
          className="flex flex-col items-center glass p-3 md:p-5 rounded-2xl border border-white/10 min-w-[56px] md:min-w-[90px] flex-1 group hover:border-accent-gold/40 transition-colors duration-300"
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
        console.error("Error fetching launches:", err);
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
        backgroundAttachment: "fixed",
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent-gold/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-14 text-white relative z-10" }}>

        {/* ── Page Header ────────────────────────────────────────── */}
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
                loading
                  ? "bg-white/30 animate-pulse"
                  : error
                    ? "bg-red-400"
                    : "bg-green-400 animate-pulse"
              )}
            />
            {loading
              ? "ACQUIRING TELEMETRY…"
              : error
                ? "SIGNAL LOST"
                : `LIVE FEED · ${upcomingLaunches.length} MISSIONS`}
          </div>
        </header>

        {/* ── Countdown Banner ───────────────────────────────────── */}
        {loading ? (
          <CountdownSkeleton />
        ) : nextLaunch ? (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-10 glass rounded-3xl md:rounded-[40px] border border-white/10 animate-in fade-in slide-in-from-top-8 duration-1000 relative overflow-hidden">
            {/* subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
              }}
            />
            <div className="space-y-3 text-center lg:text-left z-10">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-accent-gold uppercase tracking-[3px] font-Barlow-Condensed text-xs">
                <FaClock className="animate-pulse" />
                {new Date(nextLaunch.date_utc).getTime() > Date.now()
                  ? "Next Launch In"
                  : "Mission Complete"}
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

        {/* ── Mission Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 xl:gap-8 items-start">

          {/* Sidebar */}
          <div className="overflow-x-auto xl:overflow-x-visible xl:overflow-y-auto xl:max-h-[820px] custom-scrollbar">
            {loading ? (
              <SidebarSkeleton />
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
                    {/* Mission patch */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                      {launch.links.patch.small ? (
                        <img
                          src={launch.links.patch.small}
                          alt={launch.name}
                          className="w-full h-full object-contain"
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
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-nebula-blue/40 font-Barlow">
                        <FaMapMarkerAlt className="text-[8px]" />
                        {launch.launchpad.full_name}
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

          {/* Detail Panel */}
          <div className="space-y-6">
            {loading ? (
              <DetailSkeleton />
            ) : selectedLaunch ? (
              <div className="flex flex-col gap-6 animate-in fade-in duration-500">
                {/* Video */}
                <div className="glass rounded-[28px] overflow-hidden aspect-video relative border border-white/10 shadow-2xl">
                  {selectedLaunch.links.youtube_id ? (
                    <VideoPlayer
                      classes={{ container: "w-full h-full" }}
                      videoId={selectedLaunch.links.youtube_id}
                    />
                  ) : (
                    <div className="w-full h-full relative group">
                      {selectedLaunch.links.patch.large && (
                        <img 
                          src={selectedLaunch.links.patch.large} 
                          alt={selectedLaunch.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
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

                {/* Info Card */}
                <div className="glass rounded-[28px] p-6 md:p-8 space-y-7 border border-white/10">
                  {/* Title row */}
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
                        <a
                          href={selectedLaunch.links.wikipedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all text-[9px] tracking-[2px] uppercase font-bold border border-white/10"
                        >
                          Wikipedia
                        </a>
                      )}
                      {selectedLaunch.links.article && (
                        <a
                          href={selectedLaunch.links.article}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass px-4 py-1.5 rounded-full hover:bg-white hover:text-black transition-all text-[9px] tracking-[2px] uppercase font-bold border border-white/10"
                        >
                          Article
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-nebula-blue/70 font-Barlow text-sm leading-relaxed">
                    {selectedLaunch.details ||
                      "Launch operations are underway. SpaceX mission control is monitoring all telemetry as the vehicle prepares for its ascent."}
                  </p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Vehicle", value: selectedLaunch.rocket.name, icon: <FaRocket className="text-nebula-blue/30" /> },
                      { label: "Launch Pad", value: selectedLaunch.launchpad.name, icon: <FaMapMarkerAlt className="text-nebula-blue/30" /> },
                      { label: "Payloads", value: String(selectedLaunch.payloads.length || 1), icon: <FaCalendarAlt className="text-nebula-blue/30" /> },
                      {
                        label: "Status",
                        value: selectedLaunch.upcoming ? "Upcoming" : "Complete",
                        icon: <FaClock className="text-nebula-blue/30" />,
                        highlight: !selectedLaunch.upcoming,
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="glass rounded-2xl p-4 border border-white/5 space-y-2 group hover:border-white/15 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[2px] font-Barlow-Condensed text-nebula-blue/50">
                          {stat.icon}
                          {stat.label}
                        </div>
                        <p
                          className={classNames(
                            "font-Bellefair text-lg uppercase",
                            (stat as any).highlight ? "text-accent-gold" : "text-white"
                          )}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              !error && (
                <div className="glass rounded-[28px] border border-white/10 p-16 flex flex-col items-center gap-4 text-center">
                  <FaSatellite className="text-4xl text-white/10" />
                  <p className="text-nebula-blue/40 font-Barlow-Condensed tracking-widest uppercase text-xs">
                    Select a mission
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <RocketFleet />
      </Container>
    </section>
  );
}

// ─── Inline Rocket Icon ───────────────────────────────────────────────────────
const FaRocket = ({ className }: { className?: string }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className={className}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M432.2 48a47.78 47.78 0 00-34.9 14.7L235 225.4 179 217a15.86 15.86 0 00-11.6 3.9 16 16 0 00-5.8 13.1l4 55.4-86 86-45.6-45.6a16 16 0 00-22.6 0 15.86 15.86 0 000 22.6l68.2 68.2a16 16 0 0022.6 0l86-86 55.4 4a16 16 0 0013.1-5.8 15.86 15.86 0 003.9-11.6l-8.4-56L403.4 114.7A47.78 47.78 0 00464 79.8V48zM157 325a16.09 16.09 0 00-11.3 4.7l-96 96a16 16 0 000 22.6l6.8 6.8a16 16 0 0022.6 0l96-96a16 16 0 000-22.6l-6.8-6.8A16 16 0 00157 325z" />
  </svg>
);
