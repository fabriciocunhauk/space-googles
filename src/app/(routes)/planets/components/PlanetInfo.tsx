import type { PlanetData } from "../types";
import PlanetStatCard from "./PlanetStatCard";

type PlanetInfoProps = {
  planetData: PlanetData | null;
  planetName: string;
};

const STAT_CARDS = [
  { label: "Avg. Distance", key: "distanceFromSun" as const },
  { label: "Year Length", key: "yearLength" as const, unit: "d" },
  { label: "Moons", key: "numberOfMoons" as const },
] satisfies Array<{
  label: string;
  key: keyof PlanetData;
  unit?: string;
}>;

export default function PlanetInfo({ planetData, planetName }: PlanetInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h2 className="text-7xl md:text-8xl font-Bellefair uppercase tracking-widest text-glow">
          {planetData?.name ?? planetName}
        </h2>
        <p className="text-nebula-blue font-Barlow text-lg leading-relaxed max-w-xl">
          {planetData?.description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
        {STAT_CARDS.map(({ label, key, unit }) => (
          <PlanetStatCard
            key={label}
            label={label}
            value={planetData?.[key]}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}
