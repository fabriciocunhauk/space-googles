import Link from "next/link";
import Container from "./components/Container";
import { Button } from "./components/Button";
import { FaSatellite } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="relative min-h-screen bg-deep-space flex items-center justify-center text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-nebula-blue/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "text-center space-y-8 relative z-10" }}>
        <FaSatellite className="text-5xl text-nebula-blue/40 mx-auto animate-pulse" />
        <div className="space-y-3">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase text-sm">
            Signal Lost
          </p>
          <h1 className="text-7xl md:text-9xl font-Bellefair text-glow uppercase">404</h1>
          <p className="text-nebula-blue/70 font-Barlow text-lg max-w-md mx-auto">
            This coordinate doesn&apos;t exist in our star charts. The page you&apos;re
            looking for may have drifted out of orbit or never launched.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            href="/"
            classes={{ link: "px-8 py-4 bg-white text-black font-Bellefair uppercase hover:scale-105 transition-all" }}
          >
            Return Home
          </Button>
          <Link
            href="/planets"
            className="px-8 py-4 rounded-full border border-white/20 font-Bellefair uppercase hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center"
          >
            Explore Planets
          </Link>
        </div>
      </Container>
    </section>
  );
}
