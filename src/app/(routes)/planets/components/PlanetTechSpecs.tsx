import { FaDna, FaThermometerHalf, FaWeightHanging, FaWind } from "react-icons/fa";
import type { PlanetContent } from "../content";

type PlanetTechSpecsProps = {
  specs: PlanetContent["technicalSpecs"];
};

export default function PlanetTechSpecs({ specs }: PlanetTechSpecsProps) {
  const specItems = [
    { label: "Composition", value: specs.composition, icon: <FaDna /> },
    { label: "Surface Gravity", value: specs.gravity, icon: <FaWeightHanging /> },
    { label: "Mean Temperature", value: specs.temp, icon: <FaThermometerHalf /> },
    { label: "Atmosphere", value: specs.atmosphere, icon: <FaWind /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {specItems.map((item, i) => (
        <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/5 transition-all">
          <div className="p-3 bg-white/5 rounded-xl text-nebula-blue group-hover:text-white transition-colors">
            {item.icon}
          </div>
          <div>
            <p className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">{item.label}</p>
            <p className="text-sm font-Bellefair uppercase tracking-wide">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
