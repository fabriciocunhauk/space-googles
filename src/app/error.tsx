"use client";

import { useEffect } from "react";
import Container from "./components/Container";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <section className="relative min-h-screen bg-deep-space flex items-center justify-center text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-500/5 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "text-center space-y-8 relative z-10" }}>
        <FaExclamationTriangle className="text-5xl text-red-400/60 mx-auto" />
        <div className="space-y-3">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase text-sm">
            Telemetry Failure
          </p>
          <h1 className="text-4xl md:text-5xl font-Bellefair text-glow uppercase">
            Something Went Wrong
          </h1>
          <p className="text-nebula-blue/70 font-Barlow text-lg max-w-md mx-auto">
            Ground control hit an unexpected error loading this page. It&apos;s been
            logged — try again, or head back to safer orbit.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={reset}
            className="px-8 py-4 rounded-full bg-white text-black font-Bellefair uppercase hover:scale-105 transition-all"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-4 rounded-full border border-white/20 font-Bellefair uppercase hover:bg-white/5 hover:border-white/40 transition-all flex items-center justify-center"
          >
            Return Home
          </a>
        </div>
      </Container>
    </section>
  );
}
