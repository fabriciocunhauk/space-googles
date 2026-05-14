import { FaWeight, FaArrowUp, FaExpandArrowsAlt } from "react-icons/fa";

const ROCKET_DATA = [
  {
    name: "Falcon 9",
    description: "Reliable, reusable, and cost-effective orbital transport.",
    payload: "22,800 kg to LEO",
    height: "70 m",
    thrust: "7,607 kN",
    image: "/assets/launch/falcon9.png"
  },
  {
    name: "Falcon Heavy",
    description: "The world's most powerful operational rocket by a factor of two.",
    payload: "63,800 kg to LEO",
    height: "70 m",
    thrust: "22,819 kN",
    image: "/assets/launch/falcon_heavy.png"
  },
  {
    name: "Starship",
    description: "A fully reusable transportation system designed to carry both crew and cargo to Earth orbit, the Moon, Mars and beyond.",
    payload: "100,000+ kg to LEO",
    height: "120 m",
    thrust: "74,000 kN",
    image: "/assets/launch/starship.png"
  }
];

export default function RocketFleet() {
  return (
    <div className="space-y-12 pt-16 border-t border-white/10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-Bellefair uppercase tracking-widest text-glow">
          Launch Vehicle Fleet
        </h2>
        <p className="text-nebula-blue font-Barlow max-w-2xl mx-auto opacity-70">
          State-of-the-art spacecraft designed for rapid reusability and heavy-lift performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ROCKET_DATA.map((rocket, i) => (
          <div key={i} className="glass rounded-[32px] overflow-hidden border border-white/10 group hover:border-white/30 transition-all flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src={rocket.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={rocket.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="p-8 flex flex-col flex-grow space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-Bellefair text-glow">{rocket.name}</h3>
                <p className="text-nebula-blue text-xs font-Barlow opacity-70 leading-relaxed">{rocket.description}</p>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/5">
                {[
                  { label: "LEO Payload", value: rocket.payload, icon: <FaWeight /> },
                  { label: "Height", value: rocket.height, icon: <FaExpandArrowsAlt /> },
                  { label: "Thrust", value: rocket.thrust, icon: <FaArrowUp /> },
                ].map((spec, j) => (
                  <div key={j} className="flex justify-between items-center text-[10px] uppercase font-Barlow-Condensed tracking-[2px]">
                    <div className="flex items-center gap-2 text-nebula-blue/50">
                      {spec.icon}
                      <span>{spec.label}</span>
                    </div>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
