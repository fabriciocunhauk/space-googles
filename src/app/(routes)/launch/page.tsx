import background from "/public/assets/launch/background-technology-desktop.jpg";
import Container from "@/app/components/Container";
import { fetchLaunches } from "@/app/api/fetchLaunches";
import { fetchRockets } from "@/app/api/fetchRockets";
import LaunchExplorer from "./components/LaunchExplorer";
import RocketFleet from "./components/RocketFleet";

export const revalidate = 1800;

export default async function Launch() {
  const [launches, rockets] = await Promise.all([fetchLaunches(), fetchRockets()]);

  return (
    <section
      className="relative min-h-screen w-full pt-44 pb-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.85), rgba(11, 13, 23, 0.85)), url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent-gold/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-14 text-white relative z-10" }}>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-1">
            <p className="text-nebula-blue/60 font-Barlow-Condensed tracking-[4px] uppercase text-sm">
              03 Space Launch Schedule
            </p>
            <h1 className="text-4xl md:text-6xl font-Bellefair text-glow tracking-wide">
              MISSION CONTROL
            </h1>
          </div>
        </header>

        <p className="text-nebula-blue/70 font-Barlow text-base leading-relaxed max-w-3xl -mt-8">
          Every launch on this schedule is pulled live from global launch providers, but the dates
          you see rarely hold firm right up to liftoff. Rockets need to accelerate to roughly
          28,000 km/h sideways, not just upward, to reach orbit — so mission planners wait for
          precise windows where wind shear, range safety, and downrange traffic all line up. A
          &quot;static fire,&quot; where the engines briefly ignite while the rocket stays clamped
          to the pad, is a routine final check before a date is locked in. That&apos;s why a launch
          slipping by a few hours, or even days, is normal rather than a sign something&apos;s wrong.
        </p>

        <LaunchExplorer launches={launches} />

        <RocketFleet rockets={rockets} />
      </Container>
    </section>
  );
}
