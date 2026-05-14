import { FaFlask, FaDumbbell, FaBed, FaSolarPanel } from "react-icons/fa";

const LIFE_IN_ORBIT = [
  {
    title: "Science & Research",
    description: "The ISS serves as a unique microgravity laboratory where over 3,000 experiments have been conducted in biology, physics, and astronomy.",
    icon: <FaFlask />,
    stat: "3,000+ Experiments"
  },
  {
    title: "Physical Conditioning",
    description: "Astronauts must exercise for 2.5 hours every day to prevent bone and muscle loss in the zero-gravity environment of low Earth orbit.",
    icon: <FaDumbbell />,
    stat: "2.5h Daily Workout"
  },
  {
    title: "Circadian Rhythm",
    description: "Crew members experience 16 sunrises and sunsets every 24 hours. They follow a strict GMT schedule to maintain a healthy sleep cycle.",
    icon: <FaBed />,
    stat: "16 Sunsets per Day"
  },
  {
    title: "Technical Infrastructure",
    description: "Powered by an acre of solar arrays, the station generates 120 kilowatts of electricity, supporting all life-support and scientific systems.",
    icon: <FaSolarPanel />,
    stat: "120kW Power Output"
  }
];

export default function IssLife() {
  return (
    <div className="mt-24 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-Bellefair uppercase tracking-widest text-glow">
          Life in Orbit
        </h2>
        <p className="text-nebula-blue font-Barlow max-w-2xl mx-auto opacity-70">
          A glimpse into the daily operations and unique challenges of living aboard the most complex structure ever built in space.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {LIFE_IN_ORBIT.map((item, i) => (
          <div key={i} className="glass p-8 rounded-[32px] border border-white/10 hover:border-white/30 transition-all flex flex-col items-center text-center group">
            <div className="p-4 bg-white/5 rounded-2xl text-3xl text-nebula-blue group-hover:text-accent-gold transition-all duration-500 mb-6 group-hover:scale-110">
              {item.icon}
            </div>
            <h3 className="text-xl font-Bellefair mb-4">{item.title}</h3>
            <p className="text-xs text-nebula-blue font-Barlow leading-relaxed opacity-60 mb-6 flex-grow">
              {item.description}
            </p>
            <div className="w-full pt-6 border-t border-white/5">
              <p className="text-xs font-Barlow-Condensed tracking-[2px] uppercase text-accent-gold font-bold">{item.stat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
