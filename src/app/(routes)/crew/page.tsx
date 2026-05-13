import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import IssLocationMap from "@/app/components/IssLocationMap";
import { fetchNumberOfPeopleInSpace } from "@/app/api/fetchNumberOfPeopleInSpace";
import { fetchIssFuturePath } from "@/app/api/fetchIssFuturePath";
import { FaUserAstronaut, FaSpaceShuttle, FaGlobeAmericas, FaMapMarkedAlt } from "react-icons/fa";

export default async function Crew() {
  const [{ numberOfPeopleInSpace, people }, futurePath] = await Promise.all([
    fetchNumberOfPeopleInSpace(),
    fetchIssFuturePath()
  ]);

  // Calculate mission stats
  const craftStats = people.reduce((acc: any, person: any) => {
    acc[person.craft] = (acc[person.craft] || 0) + 1;
    return acc;
  }, {});

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.7), rgba(11, 13, 23, 0.7)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
      className="relative flex items-center justify-center text-white min-h-screen pt-44 pb-20 overflow-hidden"
    >
      <Container
        classes={{
          container:
            "flex flex-col gap-16 w-full h-full relative z-10",
        }}
      >
        {/* Mission Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-8 duration-1000">
           <div className="glass p-8 rounded-[32px] border border-white/10 flex items-center gap-6">
              <div className="p-4 bg-white/5 rounded-2xl">
                 <FaUserAstronaut className="text-3xl text-nebula-blue" />
              </div>
              <div>
                 <p className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">Total Personnel</p>
                 <p className="text-3xl font-Bellefair">{numberOfPeopleInSpace}</p>
              </div>
           </div>
           {Object.entries(craftStats).map(([craft, count]: [any, any], i: number) => (
             <div key={i} className="glass p-8 rounded-[32px] border border-white/10 flex items-center gap-6">
                <div className="p-4 bg-white/5 rounded-2xl">
                   <FaSpaceShuttle className="text-3xl text-accent-gold" />
                </div>
                <div>
                   <p className="text-[10px] text-nebula-blue uppercase tracking-widest font-Barlow-Condensed">{craft} Crew</p>
                   <p className="text-3xl font-Bellefair">{count} Members</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* ISS Tracking Section */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-nebula-blue">
                 <FaGlobeAmericas className="animate-spin-slow" />
                 <p className="font-Barlow-Condensed tracking-[4.75px] uppercase">
                    02 Real-time ISS Tracking
                 </p>
              </div>
              <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
                Current Location
              </h1>
            </header>
            <div className="glass rounded-[40px] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] h-[500px] md:h-[650px] relative">
              <IssLocationMap futurePath={futurePath} />
              <div className="absolute bottom-6 right-6 glass px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10 text-white/80">
                 Telemetry Stream Active
              </div>
            </div>

            {/* ISS Future Path Section */}
            <div className="space-y-6 pt-8">
               <div className="flex items-center gap-3 text-accent-gold">
                  <FaMapMarkedAlt className="text-2xl" />
                  <h2 className="text-3xl font-Bellefair uppercase tracking-widest">Overflight Schedule (Next 24h)</h2>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {futurePath.filter((p: any) => p.isMajor).map((p: any, i: number) => (
                    <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-2 group hover:border-white/20 transition-all">
                       <span className="text-[10px] text-nebula-blue/50 uppercase font-bold">{p.time}</span>
                       <span className="text-xl font-Bellefair group-hover:text-glow">{p.country}</span>
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-white/30 italic">Note: ISS passes are approximate and coverage depends on orbital precision. &quot;Open Ocean&quot; refers to maritime transits.</p>
            </div>
          </div>

          {/* Crew List Section */}
          <div className="lg:col-span-1 flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            <header className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl font-Bellefair text-glow uppercase tracking-wider">
                Personnel Registry
              </h2>
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent lg:via-white/20 lg:to-transparent" />
            </header>

            <div className="flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar max-h-[700px]">
              {people.map(({ craft, name }) => (
                <div
                  key={name}
                  className="glass-card group flex flex-col gap-2 p-8 hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-Barlow-Condensed tracking-[2px] text-nebula-blue uppercase px-2 py-1 bg-white/5 rounded">
                      {craft}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
                  </div>
                  <p className="text-2xl font-Bellefair tracking-wide group-hover:text-glow transition-all">{name}</p>
                  <p className="text-[10px] text-white/30 font-Barlow uppercase tracking-widest">Duty Status: Active</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
