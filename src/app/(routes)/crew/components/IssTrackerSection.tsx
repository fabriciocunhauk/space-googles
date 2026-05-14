"use client";
import { useEffect, useState } from "react";
import { fetchIssFuturePath, type IssPathPoint } from "@/app/api/fetchIssFuturePath";
import IssLocationMap from "@/app/components/IssLocationMap";
import { FaGlobeAmericas, FaMapMarkedAlt } from "react-icons/fa";

// ─── Skeleton helpers ───────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/5 ${className ?? ""}`}
    />
  );
}

function MapSkeleton() {
  return (
    <div className="h-[500px] md:h-[600px] glass rounded-[36px] border border-white/10 flex flex-col items-center justify-center gap-6 overflow-hidden relative">
      {/* Pulsing orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] border border-white/20 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute w-[400px] h-[400px] border border-white/15 rounded-full animate-pulse" />
        <div className="absolute w-[200px] h-[200px] border border-white/10 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 bg-nebula-blue/20 blur-xl rounded-full animate-pulse" />
          <svg viewBox="0 0 24 24" className="w-full h-full text-white/20 relative z-10" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] text-nebula-blue/40 font-Barlow-Condensed uppercase tracking-[3px]">
            Acquiring ISS Position
          </p>
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-nebula-blue/30 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fake telemetry bars */}
      <div className="absolute bottom-5 left-5 right-5 flex gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 flex-1 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function OverflightSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-2xl" />
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function IssTrackerSection() {
  const [futurePath, setFuturePath] = useState<IssPathPoint[] | null>(null);

  useEffect(() => {
    fetchIssFuturePath().then((path) => {
      setFuturePath(path);
      
      // Lazy geocode major points to avoid blocking initial render
      const geocodePoints = async () => {
        const updatedPath = [...path];
        for (let i = 0; i < updatedPath.length; i++) {
          if (updatedPath[i].isMajor && updatedPath[i].country === "—") {
            try {
              const res = await fetch(`https://api.wheretheiss.at/v1/coordinates/${updatedPath[i].lat},${updatedPath[i].lon}`);
              const data = await res.json();
              updatedPath[i] = {
                ...updatedPath[i],
                country: data.country_code === "??" ? "Open Ocean" : data.country_code
              };
              // Partial update to show progress
              setFuturePath([...updatedPath]);
              // Respect rate limits
              await new Promise(r => setTimeout(r, 600));
            } catch (e) {
              console.error("Geocoding failed for point", i, e);
            }
          }
        }
      };
      geocodePoints();
    });
  }, []);

  const majorPoints = futurePath?.filter((p) => p.isMajor) ?? [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-nebula-blue/60">
          <FaGlobeAmericas className="text-sm" />
          <p className="font-Barlow-Condensed tracking-[4px] uppercase text-xs">
            02 Real-time ISS Tracking
          </p>
        </div>
        <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
          Current Location
        </h1>
      </header>

      {/* Map */}
      <div className="relative">
        {futurePath === null ? (
          <MapSkeleton />
        ) : (
          <div className="glass rounded-[36px] overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.5)] h-[500px] md:h-[600px] relative">
            <IssLocationMap futurePath={futurePath} />
            <div className="absolute bottom-5 right-5 glass px-4 py-1.5 rounded-full text-[9px] font-bold tracking-[2px] uppercase border border-white/10 text-white/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Telemetry Active
            </div>
          </div>
        )}
      </div>

      {/* Overflight Schedule */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 text-accent-gold">
          <FaMapMarkedAlt className="text-xl" />
          <h2 className="text-2xl font-Bellefair uppercase tracking-widest">
            Overflight Schedule · Next 24h
          </h2>
        </div>

        {futurePath === null ? (
          <OverflightSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {majorPoints.map((p, i) => (
              <div
                key={i}
                className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-1.5 hover:border-white/15 transition-all group"
              >
                <span className="text-[9px] text-nebula-blue/40 uppercase font-bold tracking-widest">
                  {p.time}
                </span>
                <span className="text-lg font-Bellefair group-hover:text-glow transition-all">
                  {p.country}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-[9px] text-white/25 italic">
          Positions update every 5 minutes. ISS completes one orbit approx. every 90 minutes.
        </p>
      </div>
    </div>
  );
}
