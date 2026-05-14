import type { PlanetData } from "../types";
import PlanetStatCard from "./PlanetStatCard";
import PlanetTechSpecs from "./PlanetTechSpecs";

type PlanetInfoProps = {
  planetData: PlanetData | null;
  planetName: string;
  loading?: boolean;
};

type StatCardDef = {
  label: string;
  key: keyof PlanetData;
  unit?: string;
};

const STAT_CARDS: StatCardDef[] = [
  { label: "Avg. Distance", key: "distanceFromSun" },
  { label: "Year Length", key: "yearLength", unit: "d" },
  { label: "Moons", key: "numberOfMoons" },
];

export default function PlanetInfo({
  planetData,
  planetName,
  loading,
}: PlanetInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            <div className="h-20 md:h-24 w-64 bg-white/5 animate-pulse rounded-2xl" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/5 animate-pulse rounded-lg" />
              <div className="h-4 w-5/6 bg-white/5 animate-pulse rounded-lg" />
              <div className="h-4 w-4/6 bg-white/5 animate-pulse rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-7xl md:text-8xl font-Bellefair uppercase tracking-widest text-glow">
              {planetData?.name ?? planetName}
            </h2>
            <p className="text-nebula-blue font-Barlow text-lg leading-relaxed max-w-xl">
              {planetData?.description}
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
        {STAT_CARDS.map(({ label, key, unit }) => (
          <PlanetStatCard
            key={label}
            label={label}
            value={loading ? undefined : planetData?.[key]}
            unit={unit}
          />
        ))}
      </div>

      <PlanetTechSpecs planetName={planetName} />
    </div>
  );
}
