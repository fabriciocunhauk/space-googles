import { Metadata } from "next";
import Container from "@/app/components/Container";
import { fetchSpaceStations } from "@/app/api/fetchSpaceStations";
import { FaSpaceShuttle, FaCircle } from "react-icons/fa";
import { classNames } from "@/app/utils/classNames";

export const metadata: Metadata = {
  title: "Space Stations | Space Googles",
  description:
    "Every crewed space station ever flown — from Salyut and Skylab to Mir, Tiangong and the ISS. Status, orbit, ownership and active expeditions for each.",
  alternates: { canonical: "https://space-googles.co.uk/stations" },
};

// ISR: revalidate every 6 hours
export const revalidate = 21600;

export default async function StationsPage() {
  const stations = await fetchSpaceStations();
  const active = stations.filter((s) => s.status === "Active");
  const retired = stations.filter((s) => s.status !== "Active");

  return (
    <section className="relative min-h-screen bg-deep-space pt-44 pb-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[700px] h-[500px] bg-nebula-blue/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-14 relative z-10" }}>
        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700 max-w-3xl">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">05</span> Orbital Outposts
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Space Stations
          </h1>
          <p className="text-nebula-blue/70 font-Barlow text-lg leading-relaxed">
            Humans have maintained an outpost in orbit, on and off, since the Soviet Union
            launched Salyut 1 in 1971. Most of the stations below no longer exist — burned up
            on reentry, deliberately deorbited, or replaced by something bigger — but each one
            proved out the engineering that the next station relied on.
          </p>
        </header>

        {stations.length === 0 ? (
          <p className="text-center text-nebula-blue font-Barlow italic py-12">
            Unable to reach the station registry right now — try again shortly.
          </p>
        ) : (
          <>
            {active.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-Bellefair uppercase tracking-widest flex items-center gap-3">
                  <FaCircle className="text-[10px] text-green-400" />
                  Currently Active
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {active.map((station) => (
                    <StationCard key={station.id} station={station} />
                  ))}
                </div>
              </div>
            )}

            {retired.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-Bellefair uppercase tracking-widest flex items-center gap-3">
                  <FaCircle className="text-[10px] text-white/20" />
                  Retired &amp; Historical
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {retired.map((station) => (
                    <StationCard key={station.id} station={station} compact />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

function StationCard({
  station,
  compact,
}: {
  station: Awaited<ReturnType<typeof fetchSpaceStations>>[number];
  compact?: boolean;
}) {
  return (
    <div className="glass-card rounded-[28px] border border-white/10 p-7 space-y-4 hover:border-white/25 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-nebula-blue/10 rounded-xl">
            <FaSpaceShuttle className="text-nebula-blue text-lg" />
          </div>
          <div>
            <h3 className="font-Bellefair text-xl">{station.name}</h3>
            {station.founded && (
              <p className="text-[10px] text-white/30 font-Barlow-Condensed uppercase tracking-widest">
                {new Date(station.founded).getFullYear()}
                {station.deorbited ? ` – ${new Date(station.deorbited).getFullYear()}` : " – Present"}
              </p>
            )}
          </div>
        </div>
        <span
          className={classNames(
            "text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider font-Barlow-Condensed flex-shrink-0",
            station.status === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-white/5 text-white/40"
          )}
        >
          {station.status}
        </span>
      </div>

      <p className={classNames(
        "text-nebula-blue/70 font-Barlow text-sm leading-relaxed",
        compact ? "line-clamp-3" : "line-clamp-5"
      )}>
        {station.description}
      </p>

      <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-Barlow text-nebula-blue/50">
        {station.orbit && (
          <div className="flex justify-between">
            <span>Orbit</span>
            <span className="text-white/70">{station.orbit}</span>
          </div>
        )}
        {station.owners.length > 0 && (
          <div className="flex justify-between gap-4">
            <span className="flex-shrink-0">Operated by</span>
            <span className="text-white/70 text-right">
              {station.owners.map((o) => o.abbrev).join(", ")}
            </span>
          </div>
        )}
        {station.activeExpeditions.length > 0 && (
          <div className="flex justify-between gap-4">
            <span className="flex-shrink-0">Current crew</span>
            <span className="text-accent-gold text-right">
              {station.activeExpeditions.map((e) => e.name).join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
