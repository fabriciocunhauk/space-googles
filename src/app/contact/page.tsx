import { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import { FaGithub, FaSatellite, FaEnvelope } from "react-icons/fa";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Contact | Space Googles",
  description:
    "Report bugs, suggest improvements, or submit data corrections for Space Googles — an independent space data dashboard.",
  alternates: { canonical: "https://space-googles.co.uk/contact" },
};

export default function Contact() {
  return (
    <section className="relative min-h-screen bg-deep-space pt-44 pb-20 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[400px] bg-nebula-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[300px] bg-accent-gold/4 blur-[150px] rounded-full" />
      </div>

      <Container classes={{ container: "flex flex-col gap-12 relative z-10" }} size="md">

        <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-nebula-blue font-Barlow-Condensed tracking-[4.75px] uppercase flex items-center gap-2">
            <span className="opacity-50">Support</span> Contact
          </p>
          <h1 className="text-5xl md:text-6xl font-Bellefair text-glow uppercase">
            Get in Touch
          </h1>
          <p className="text-nebula-blue/70 font-Barlow text-lg leading-relaxed max-w-2xl">
            Space Googles is an independent project. For bug reports and feature requests,
            GitHub is the best place to reach us.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <a
            href="mailto:fabriciocunhadeveloper@gmail.com"
            className="glass-card rounded-[28px] border border-white/10 p-8 space-y-4 hover:border-white/20 hover:bg-white/5 transition-all group flex flex-col"
          >
            <div className="p-3.5 bg-accent-gold/10 rounded-2xl w-fit group-hover:bg-accent-gold/20 transition-colors">
              <FaEnvelope className="text-2xl text-accent-gold" />
            </div>
            <h2 className="text-xl font-Bellefair uppercase">Email</h2>
            <p className="text-nebula-blue/70 font-Barlow text-sm leading-relaxed">
              For direct enquiries, privacy requests, or anything that doesn&apos;t fit a GitHub issue.
            </p>
            <p className="text-white font-Barlow-Condensed tracking-[1px] text-sm group-hover:text-accent-gold transition-colors">
              fabriciocunhadeveloper@gmail.com ↗
            </p>
          </a>

          <a
            href="https://github.com/fabriciocunhauk"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-[28px] border border-white/10 p-8 space-y-4 hover:border-white/20 hover:bg-white/5 transition-all group flex flex-col"
          >
            <div className="p-3.5 bg-nebula-blue/10 rounded-2xl w-fit group-hover:bg-nebula-blue/20 transition-colors">
              <FaGithub className="text-2xl text-nebula-blue" />
            </div>
            <h2 className="text-xl font-Bellefair uppercase">GitHub</h2>
            <p className="text-nebula-blue/70 font-Barlow text-sm leading-relaxed">
              Found a bug or want to suggest a feature? Open an issue on GitHub.
            </p>
            <p className="text-white font-Barlow-Condensed tracking-[1px] text-sm group-hover:text-nebula-blue transition-colors">
              github.com/fabriciocunhauk ↗
            </p>
          </a>
        </div>

        <div className="glass rounded-[32px] border border-white/10 p-8 md:p-12 space-y-6 animate-in fade-in duration-1000">
          <div className="flex items-center gap-3">
            <FaSatellite className="text-nebula-blue text-xl" />
            <h2 className="text-2xl font-Bellefair uppercase">What We Track</h2>
          </div>
          <ul className="space-y-4">
            {[
              { label: "Data corrections", detail: "Inaccurate orbital data, incorrect launch times, or outdated crew information." },
              { label: "Technical issues", detail: "If the site is broken, slow, or displaying errors — open a GitHub issue so it can be fixed." },
              { label: "Feature suggestions", detail: "Ideas for new data sources or improvements to how information is presented." },
              { label: "Privacy requests", detail: "For data subject access requests under UK GDPR, see our Privacy Policy." },
            ].map(({ label, detail }) => (
              <li key={label} className="flex gap-4">
                <span className="text-accent-gold mt-1 flex-shrink-0">▸</span>
                <div>
                  <p className="font-Bellefair uppercase text-white text-sm">{label}</p>
                  <p className="text-nebula-blue/70 font-Barlow text-sm mt-1 leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-nebula-blue/50 font-Barlow text-xs pt-2">
            For privacy-related matters, see our{" "}
            <Link href="/privacy-policy" className="text-nebula-blue hover:text-white underline">Privacy Policy</Link>.
          </p>
        </div>

      </Container>
    </section>
  );
}
