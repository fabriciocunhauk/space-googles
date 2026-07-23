import { FaHistory, FaRocket } from "react-icons/fa";
import type { PlanetContent } from "../content";

type HistoricalMissionsProps = {
  explorationHistory: string;
  missions: PlanetContent["missions"];
};

export default function HistoricalMissions({ explorationHistory, missions }: HistoricalMissionsProps) {
  return (
    <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl text-accent-gold">
          <FaHistory className="text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-Bellefair uppercase">Historical Missions</h3>
          <p className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed opacity-60">Exploration Milestones</p>
        </div>
      </header>

      <p className="text-nebula-blue/80 font-Barlow text-base leading-relaxed max-w-3xl">
        {explorationHistory}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/10 hover:bg-white/5 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-Bellefair group-hover:text-accent-gold transition-colors">{mission.name}</h4>
              <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full text-white/70 font-bold">{mission.year}</span>
            </div>
            <p className="text-sm text-nebula-blue font-Barlow opacity-80 leading-relaxed">
              {mission.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-accent-gold uppercase tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
              <FaRocket className="text-[8px]" />
              Mission Success
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
