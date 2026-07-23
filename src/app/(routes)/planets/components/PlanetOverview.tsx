import { FaGlobeAmericas } from "react-icons/fa";
import type { PlanetContent } from "../content";

type PlanetOverviewProps = {
  planet: PlanetContent;
};

export default function PlanetOverview({ planet }: PlanetOverviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl text-nebula-blue">
          <FaGlobeAmericas className="text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-Bellefair uppercase">About {planet.name}</h3>
          <p className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed opacity-60">
            Overview &amp; Geology
          </p>
        </div>
      </header>

      <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-6">
        {planet.overview.map((paragraph, i) => (
          <p key={i} className="text-nebula-blue/90 font-Barlow text-base leading-relaxed">
            {paragraph}
          </p>
        ))}
        <p className="text-nebula-blue/90 font-Barlow text-base leading-relaxed pt-2 border-t border-white/10">
          {planet.atmosphereGeology}
        </p>
      </div>
    </div>
  );
}
