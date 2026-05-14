import { FaHistory, FaRocket } from "react-icons/fa";

const MISSION_DATA: Record<string, any[]> = {
  mercury: [
    { name: "Mariner 10", year: "1973", description: "First mission to use gravity assist and visit Mercury." },
    { name: "MESSENGER", year: "2004", description: "First spacecraft to orbit Mercury, mapping its entire surface." }
  ],
  venus: [
    { name: "Venera 7", year: "1970", description: "First spacecraft to transmit data from the surface of another planet." },
    { name: "Magellan", year: "1989", description: "Mapped 98% of the surface of Venus using radar." }
  ],
  earth: [
    { name: "Apollo 11", year: "1969", description: "First crewed mission to land on the Moon." },
    { name: "ISS", year: "1998", description: "Continuously inhabited laboratory in Earth's orbit." }
  ],
  mars: [
    { name: "Viking 1", year: "1975", description: "First successful US landing on the Martian surface." },
    { name: "Perseverance", year: "2020", description: "Currently searching for signs of ancient microbial life." }
  ],
  jupiter: [
    { name: "Galileo", year: "1989", description: "First mission to orbit Jupiter and drop a probe into its atmosphere." },
    { name: "Juno", year: "2011", description: "Studying Jupiter's gravity, magnetic field, and polar magnetosphere." }
  ],
  saturn: [
    { name: "Voyager 1", year: "1977", description: "Captured high-resolution images of Saturn's rings." },
    { name: "Cassini-Huygens", year: "1997", description: "Deep investigation of Saturn and landing on Titan." }
  ],
  uranus: [
    { name: "Voyager 2", year: "1977", description: "Only spacecraft to ever visit Uranus (flyby in 1986)." }
  ],
  neptune: [
    { name: "Voyager 2", year: "1977", description: "Only spacecraft to ever visit Neptune (flyby in 1989)." }
  ]
};

export default function HistoricalMissions({ planetName }: { planetName: string }) {
  const missions = MISSION_DATA[planetName.toLowerCase()] || [];

  if (missions.length === 0) return null;

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
