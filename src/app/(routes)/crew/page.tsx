import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import IssLocationMap from "@/app/components/IssLocationMap";
import { fetchNumberOfPeopleInSpace } from "@/app/api/fetchNumberOfPeopleInSpace";

export default async function Crew() {
  const { numberOfPeopleInSpace, people } = await fetchNumberOfPeopleInSpace();

  return (
    <main
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.7), rgba(11, 13, 23, 0.7)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex items-center justify-center text-white min-h-screen pt-32 pb-20 overflow-hidden"
    >
      <Container
        classes={{
          container:
            "grid grid-cols-1 lg:grid-cols-3 gap-12 w-full h-full",
        }}
      >
        {/* ISS Tracking Section */}
        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
          <header className="space-y-2">
            <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase">
              02 Real-time ISS Tracking
            </p>
            <h1 className="text-4xl md:text-5xl font-Bellefair text-glow uppercase">
              Current Location
            </h1>
          </header>
          <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[400px] md:h-[600px]">
            <IssLocationMap />
          </div>
        </div>

        {/* Crew List Section */}
        <div className="lg:col-span-1 flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-1000">
          <header className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-Bellefair text-glow">
              {numberOfPeopleInSpace} HUMANS IN ORBIT
            </h2>
            <p className="text-nebula-blue font-Barlow text-sm uppercase tracking-widest">
              Live Personnel Registry
            </p>
          </header>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
            {people.map(({ craft, name }) => (
              <div
                key={name}
                className="glass-card flex flex-col gap-1 p-6 hover:translate-x-2 transition-transform duration-300"
              >
                <span className="text-[10px] font-Barlow-Condensed tracking-widest text-nebula-blue uppercase">
                  Craft: {craft}
                </span>
                <p className="text-xl font-Bellefair tracking-wide">{name}</p>
                <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-accent-gold/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
