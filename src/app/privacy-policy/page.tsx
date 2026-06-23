import { Metadata } from "next";
import Container from "@/app/components/Container";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Privacy Policy | Space Googles",
  description:
    "Learn how Space Googles collects, uses, and protects your data, including our use of Google Analytics, Google AdSense, and third-party space APIs.",
  alternates: { canonical: "https://space-googles.co.uk/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <section className="relative min-h-screen bg-deep-space pt-44 pb-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-accent-gold/4 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-12 relative z-10" }} size="md">
        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">Legal</span> Data & Privacy
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Privacy Policy
          </h1>
          <p className="text-nebula-blue/60 font-Barlow text-sm">
            Last updated: 23 June 2026
          </p>
        </header>

        <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Introduction</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Space Googles (<strong className="text-white">space-googles.co.uk</strong>) is an independent space data dashboard
              that aggregates real-time information from NASA, space agencies, and news providers to make space exploration
              accessible to everyone. This Privacy Policy explains what data we collect, how we use it, and your rights under
              UK data protection law (UK GDPR).
            </p>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              By using this website, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Information We Collect</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              We do not create user accounts or collect personally identifiable information directly. However, third-party
              services embedded in this site may collect data automatically:
            </p>
            <ul className="space-y-3 text-nebula-blue/80 font-Barlow">
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span><strong className="text-white">Google Analytics</strong> — collects anonymised usage data such as pages visited,
                session duration, browser type, and approximate location (country/city level). This helps us understand how
                visitors use the site so we can improve it. No personally identifiable information is sent to Google Analytics.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span><strong className="text-white">Google AdSense</strong> (publisher ID: ca-pub-7386584956005563) — serves
                advertisements on this site. Google may use cookies and similar technologies to show ads based on your browsing
                history and interests. You can opt out of personalised ads at{" "}
                <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer" className="text-nebula-blue hover:text-white underline">
                  myadcenter.google.com
                </a>.</span>
              </li>
            </ul>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">How We Use Data</h2>
            <ul className="space-y-3 text-nebula-blue/80 font-Barlow">
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span>Analytics data is used solely to improve the content and user experience of Space Googles.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span>Advertising revenue from Google AdSense helps cover the costs of running and maintaining this service.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span>We do not sell, trade, or share your data with third parties beyond the services described in this policy.</span>
              </li>
            </ul>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Third-Party Data Sources</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Space Googles displays data from the following public APIs. We do not store this data permanently — it is
              fetched in real time and cached briefly on our servers:
            </p>
            <ul className="space-y-3 text-nebula-blue/80 font-Barlow">
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span><strong className="text-white">NASA APIs</strong> (api.nasa.gov) — Astronomy Picture of the Day, Near Earth
                Objects, EPIC Earth imagery, and more. All NASA data is in the public domain under NASA&apos;s open data policy.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span><strong className="text-white">Spaceflight News API</strong> (spaceflightnewsapi.net) — space news headlines
                and summaries. Articles link back to their original publishers.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span><strong className="text-white">The Space Devs</strong> (thespacedevs.com) — rocket launch schedules and
                astronaut information.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold mt-1">▸</span>
                <span><strong className="text-white">Open Notify / WhereTheISS</strong> — real-time International Space Station
                position tracking.</span>
              </li>
            </ul>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Cookies</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              This site uses cookies set by Google Analytics and Google AdSense. These are third-party cookies used for
              analytics and advertising personalisation. We do not set any first-party cookies ourselves.
            </p>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              You can control or delete cookies through your browser settings, or opt out of Google&apos;s advertising cookies at{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-nebula-blue hover:text-white underline">
                Google Cookie Policy
              </a>.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Your Rights (UK GDPR)</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="space-y-3 text-nebula-blue/80 font-Barlow">
              <li className="flex gap-3"><span className="text-accent-gold mt-1">▸</span><span>Access the personal data held about you</span></li>
              <li className="flex gap-3"><span className="text-accent-gold mt-1">▸</span><span>Request correction or deletion of your data</span></li>
              <li className="flex gap-3"><span className="text-accent-gold mt-1">▸</span><span>Object to processing of your data for advertising purposes</span></li>
              <li className="flex gap-3"><span className="text-accent-gold mt-1">▸</span><span>Lodge a complaint with the{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-nebula-blue hover:text-white underline">
                  UK Information Commissioner&apos;s Office (ICO)
                </a></span></li>
            </ul>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              Since we do not directly collect personal data, most data rights requests should be directed to Google
              (for Analytics and AdSense data) via their respective privacy dashboards.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Contact</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              For privacy-related enquiries or data subject access requests, please open an issue on our{" "}
              <a href="https://github.com/fabriciocunhauk" target="_blank" rel="noopener noreferrer" className="text-nebula-blue hover:text-white underline">
                GitHub page
              </a>.
            </p>
          </section>

          <hr className="border-white/10" />

          <section className="space-y-4">
            <h2 className="text-2xl font-Bellefair uppercase text-white">Changes to This Policy</h2>
            <p className="text-nebula-blue/80 font-Barlow leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be reflected by updating the &ldquo;Last updated&rdquo;
              date at the top of this page. We encourage you to review this policy periodically.
            </p>
          </section>

        </div>
      </Container>
    </section>
  );
}
