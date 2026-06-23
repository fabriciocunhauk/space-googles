import { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Terms of Service | Space Googles",
  description:
    "Terms of Service for Space Googles — an independent space data dashboard. Read our terms covering data accuracy, advertising, and intellectual property.",
  alternates: { canonical: "https://space-googles.co.uk/terms" },
};

export default function Terms() {
  return (
    <section className="relative min-h-screen bg-deep-space pt-44 pb-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[600px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-12 relative z-10" }} size="md">

        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">Legal</span> Terms of Use
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Terms of Service
          </h1>
          <p className="text-nebula-blue/60 font-Barlow text-sm">
            Last updated: 23 June 2026
          </p>
        </header>

        <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Acceptance of Terms</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              By accessing and using Space Googles (<strong className="text-white">space-googles.co.uk</strong>), you accept
              and agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the site.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Data Accuracy</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Space Googles aggregates data from third-party APIs including NASA, The Space Devs, and the Spaceflight News API.
              While we make every effort to display accurate, up-to-date information, we provide no warranties — express or
              implied — as to the accuracy, completeness, or reliability of any data displayed on this site.
            </p>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Data displayed is for informational and entertainment purposes only. Do not rely on Space Googles for
              mission-critical, safety-critical, or time-sensitive decisions.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Intellectual Property</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              All NASA imagery displayed on this site is in the public domain, provided by NASA under their open data
              policy. News summaries are sourced from the Spaceflight News API and remain the intellectual property of
              their respective publishers. Links to original articles are provided on all news pages.
            </p>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              The Space Googles interface, design, and original written content are the property of the site operator
              and may not be reproduced without permission.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Advertising</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              This site is monetised through Google AdSense (publisher ID: ca-pub-7386584956005563). Ads are served by
              Google and are subject to{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-nebula-blue hover:text-white underline">
                Google&apos;s advertising policies
              </a>. We are not responsible for the content of third-party advertisements.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">External Links</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Space Googles links to external websites including news publishers, NASA, and space agencies. We are not
              responsible for the content, privacy practices, or availability of external sites.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Limitation of Liability</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Space Googles is provided &ldquo;as is&rdquo; without any warranty. To the fullest extent permitted by law, the operator
              shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of
              this site or reliance on information displayed here.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Governing Law</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Contact</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              For questions about these terms, please{" "}
              <Link href="/contact" className="text-nebula-blue hover:text-white underline">contact us</Link>.
            </p>
          </section>

        </div>
      </Container>
    </section>
  );
}
