import { Metadata } from "next";
import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import { fetchNumberOfPeopleInSpace } from "@/app/api/fetchNumberOfPeopleInSpace";
import IssLife from "./components/IssLife";
import IssTrackerSection from "./components/IssTrackerSection";
import { FaUserAstronaut, FaSpaceShuttle } from "react-icons/fa";

export const metadata: Metadata = {
  title: "ISS Crew Tracker | Space Googles",
  description:
    "Track the current crew aboard the International Space Station in real time — names, spacecraft assignments, live ISS position map, and upcoming orbital passes.",
  alternates: { canonical: "https://space-googles.co.uk/crew" },
};

// ISR: revalidate every 5 minutes — open-notify API is slow, avoid fetching on every navigation
export const revalidate = 300;

export default async function Crew() {
  // Fast: single HTTP call, no heavy processing
  const { numberOfPeopleInSpace, people } = await fetchNumberOfPeopleInSpace();

  const craftStats = people.reduce((acc: Record<string, number>, person: any) => {
    acc[person.craft] = (acc[person.craft] || 0) + 1;
    return acc;
  }, {});

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.75), rgba(11, 13, 23, 0.75)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundAttachment: "fixed" removed — causes scroll jank on mobile & Safari
      }}
      className="relative text-white min-h-screen pt-44 pb-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-accent-gold/4 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-14 w-full relative z-10" }}>

        <header className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue/60 font-Barlow-Condensed tracking-[4px] uppercase text-xs">
            01 Live Roster
          </p>
          <h1 className="text-4xl md:text-5xl font-Bellefair text-glow uppercase tracking-wide">
            Who&apos;s in Orbit
          </h1>
          <p className="text-nebula-blue/70 font-Barlow text-base leading-relaxed">
            The International Space Station has been continuously crewed since November 2000,
            making it the longest-running human outpost beyond Earth. It orbits roughly 400km up
            and circles the planet every 90 minutes, so the people listed below see a sunrise
            about every 45 minutes. Crews typically rotate every 5-6 months, arriving and
            departing on Soyuz or Crew Dragon spacecraft — the &quot;craft&quot; grouping in the
            stats below reflects which vehicle each astronaut launched on, not which station
            they&apos;re currently assigned to.
          </p>
        </header>

        {/* ── Stats Dashboard ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-4 duration-700">
          {/* Total personnel */}
          <div className="glass p-7 rounded-[28px] border border-white/10 flex items-center gap-5">
            <div className="p-3.5 bg-nebula-blue/10 rounded-2xl flex-shrink-0">
              <FaUserAstronaut className="text-2xl text-nebula-blue" />
            </div>
            <div>
              <p className="text-[9px] text-nebula-blue/60 uppercase tracking-[3px] font-Barlow-Condensed mb-1">
                Total Personnel
              </p>
              <p className="text-4xl font-Bellefair">{numberOfPeopleInSpace}</p>
            </div>
          </div>

          {/* Per-craft stats */}
          {Object.entries(craftStats).map(([craft, count], i) => (
            <div key={i} className="glass p-7 rounded-[28px] border border-white/10 flex items-center gap-5">
              <div className="p-3.5 bg-accent-gold/10 rounded-2xl flex-shrink-0">
                <FaSpaceShuttle className="text-2xl text-accent-gold" />
              </div>
              <div>
                <p className="text-[9px] text-nebula-blue/60 uppercase tracking-[3px] font-Barlow-Condensed mb-1">
                  {craft} Crew
                </p>
                <p className="text-4xl font-Bellefair">{count as number} Members</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── ISS Tracker + Crew List ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

          {/* ISS tracker (client component — loads async with skeleton) */}
          <div className="lg:col-span-2">
            <IssTrackerSection />
          </div>

          {/* Crew List */}
          <div className="lg:col-span-1 flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-1000">
            <header className="space-y-3">
              <p className="text-nebula-blue/60 font-Barlow-Condensed tracking-[4px] uppercase text-xs">
                02 Personnel Registry
              </p>
              <h2 className="text-4xl font-Bellefair text-glow uppercase tracking-wide">
                Active Crew
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
            </header>

            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar max-h-[700px] pr-1">
              {people.map(({ craft, name }: { craft: string; name: string }) => (
                <div
                  key={name}
                  className="group flex flex-col gap-1.5 p-5 glass rounded-2xl border border-white/5 hover:border-white/15 transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-Barlow-Condensed tracking-[2px] text-nebula-blue/60 uppercase px-2 py-0.5 bg-white/5 rounded">
                      {craft}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse" />
                      <span className="text-[8px] text-green-400/60 uppercase tracking-widest font-Barlow-Condensed">Active</span>
                    </div>
                  </div>
                  <p className="text-xl font-Bellefair tracking-wide group-hover:text-glow transition-all">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <IssLife />
      </Container>
    </main>
  );
}
