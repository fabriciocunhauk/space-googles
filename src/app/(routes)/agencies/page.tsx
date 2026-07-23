import { Metadata } from "next";
import Container from "@/app/components/Container";
import SafeImage from "@/app/components/SafeImage";
import { fetchAgencies } from "@/app/api/fetchAgencies";
import { FaBuilding, FaGlobe } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Space Agencies | Space Googles",
  description:
    "A directory of the world's major space agencies and launch providers — NASA, ESA, SpaceX, Roscosmos, JAXA, CNSA and more, with real profile data on founding, leadership and active launch vehicles.",
  alternates: { canonical: "https://space-googles.co.uk/agencies" },
};

// ISR: revalidate every 24 hours — agency profiles change rarely
export const revalidate = 86400;

export default async function AgenciesPage() {
  const agencies = await fetchAgencies();

  return (
    <section className="relative min-h-screen bg-deep-space pt-44 pb-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] bg-nebula-blue/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-12 relative z-10" }}>
        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700 max-w-3xl">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">04</span> Mission Control
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Space Agencies
          </h1>
          <p className="text-nebula-blue/70 font-Barlow text-lg leading-relaxed">
            Every launch, rover and satellite on this site traces back to one of these
            organisations. Some are government agencies with a 60-year history, others are
            commercial companies founded in the last decade — together they represent who is
            actually building and flying the hardware behind the missions we track.
          </p>
        </header>

        {agencies.length === 0 ? (
          <p className="text-center text-nebula-blue font-Barlow italic py-12">
            Unable to reach the agency directory right now — try again shortly.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {agencies.map((agency) => (
              <div
                key={agency.id}
                className="glass-card rounded-[28px] border border-white/10 p-7 space-y-4 hover:border-white/25 transition-all flex flex-col"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {agency.logoUrl ? (
                      <SafeImage
                        src={agency.logoUrl}
                        alt={agency.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain p-2"
                        fallbackSrc="/assets/shared/logo.svg"
                      />
                    ) : (
                      <FaBuilding className="text-xl text-nebula-blue/40" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-Bellefair text-lg leading-tight truncate">{agency.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded-full border border-white/10 text-nebula-blue/70 uppercase tracking-wider font-Barlow-Condensed">
                        {agency.type}
                      </span>
                      <span className="text-[9px] text-white/30 flex items-center gap-1">
                        <FaGlobe className="text-[8px]" />
                        {agency.countryCode}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-nebula-blue/70 font-Barlow text-sm leading-relaxed line-clamp-5 flex-grow">
                  {agency.description}
                </p>

                <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-Barlow text-nebula-blue/50">
                  {agency.foundingYear && (
                    <div className="flex justify-between">
                      <span>Founded</span>
                      <span className="text-white/70">{agency.foundingYear}</span>
                    </div>
                  )}
                  {agency.administrator && (
                    <div className="flex justify-between gap-4">
                      <span className="flex-shrink-0">Leadership</span>
                      <span className="text-white/70 text-right truncate">{agency.administrator}</span>
                    </div>
                  )}
                  {agency.launchers && (
                    <div className="flex justify-between gap-4">
                      <span className="flex-shrink-0">Launchers</span>
                      <span className="text-white/70 text-right truncate">{agency.launchers}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
