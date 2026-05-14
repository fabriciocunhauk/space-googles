"use client";
import { useEffect, useState } from "react";
import { FaWeight, FaArrowUp, FaExpandArrowsAlt } from "react-icons/fa";
import { fetchRockets } from "@/app/api/fetchRockets";

type RocketSpec = {
  name: string;
  description: string;
  payload: string;
  height: string;
  thrust: string;
  image: string;
  wikipedia: string;
  active: boolean;
};

export default function RocketFleet() {
  const [rockets, setRockets] = useState<RocketSpec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRockets = async () => {
      const data = await fetchRockets();
      setRockets(data);
      setLoading(false);
    };
    getRockets();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-96 glass animate-pulse rounded-[32px] border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12 pt-16 border-t border-white/10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-Bellefair uppercase tracking-widest text-glow">
          Launch Vehicle Fleet
        </h2>
        <p className="text-nebula-blue font-Barlow max-w-2xl mx-auto opacity-70">
          Explore the specifications of the world&apos;s most advanced spacecraft, dynamically updated from SpaceX telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rockets.map((rocket, i) => (
          <div key={i} className="glass rounded-[32px] overflow-hidden border border-white/10 group hover:border-white/30 transition-all flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
              <img src={rocket.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={rocket.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              {!rocket.active && (
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[10px] text-nebula-blue/60 uppercase tracking-widest font-Barlow-Condensed">Legacy</span>
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-Bellefair text-glow">{rocket.name}</h3>
                <p className="text-nebula-blue text-xs font-Barlow opacity-70 leading-relaxed line-clamp-3">{rocket.description}</p>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/5 mt-auto">
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

              <a 
                href={rocket.wikipedia} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-center text-accent-gold uppercase tracking-[2px] font-bold hover:text-white transition-colors pt-2"
              >
                Telemetry Specs
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
