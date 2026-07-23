import type { PlanetContent } from "../content";
import PlanetStatCard from "./PlanetStatCard";
import PlanetTechSpecs from "./PlanetTechSpecs";

type PlanetInfoProps = {
  planet: PlanetContent;
};

export default function PlanetInfo({ planet }: PlanetInfoProps) {
  const statCards = [
    { label: "Avg. Distance", value: planet.quickFacts.distanceFromSun },
    { label: "Year Length", value: planet.quickFacts.yearLength, unit: "d" },
    { label: "Moons", value: planet.quickFacts.numberOfMoons },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h2 className="text-7xl md:text-8xl font-Bellefair uppercase tracking-widest text-glow">
          {planet.name}
        </h2>
        <p className="text-nebula-blue font-Barlow text-lg leading-relaxed max-w-xl">
          {planet.tagline}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-4 border-t border-white/10">
        {statCards.map(({ label, value, unit }) => (
          <PlanetStatCard key={label} label={label} value={value} unit={unit} />
        ))}
      </div>

      <PlanetTechSpecs specs={planet.technicalSpecs} />
    </div>
  );
}
