import { FaDna, FaThermometerHalf, FaWeightHanging, FaWind } from "react-icons/fa";

const TECHNICAL_DATA: Record<string, any> = {
  mercury: {
    composition: "Rocky (Silicate/Metal)",
    gravity: "3.7 m/s²",
    temp: "430°C / -180°C",
    atmosphere: "Thin (Oxygen, Sodium)"
  },
  venus: {
    composition: "Rocky (Silicate/Metal)",
    gravity: "8.87 m/s²",
    temp: "464°C",
    atmosphere: "Thick (CO2, Nitrogen)"
  },
  earth: {
    composition: "Rocky (Silicate/Metal)",
    gravity: "9.81 m/s²",
    temp: "15°C",
    atmosphere: "Nitrogen, Oxygen"
  },
  mars: {
    composition: "Rocky (Silicate/Metal)",
    gravity: "3.72 m/s²",
    temp: "-65°C",
    atmosphere: "Thin (CO2, Nitrogen)"
  },
  jupiter: {
    composition: "Gas Giant (H, He)",
    gravity: "24.79 m/s²",
    temp: "-110°C",
    atmosphere: "Hydrogen, Helium"
  },
  saturn: {
    composition: "Gas Giant (H, He)",
    gravity: "10.44 m/s²",
    temp: "-140°C",
    atmosphere: "Hydrogen, Helium"
  },
  uranus: {
    composition: "Ice Giant (H, He, Methane)",
    gravity: "8.69 m/s²",
    temp: "-195°C",
    atmosphere: "Hydrogen, Helium"
  },
  neptune: {
    composition: "Ice Giant (H, He, Methane)",
    gravity: "11.15 m/s²",
    temp: "-201°C",
    atmosphere: "Hydrogen, Helium"
  }
};

export default function PlanetTechSpecs({ planetName }: { planetName: string }) {
  const specs = TECHNICAL_DATA[planetName.toLowerCase()] || TECHNICAL_DATA.earth;

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
