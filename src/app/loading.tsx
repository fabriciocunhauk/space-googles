export default function Loading() {
  return (
    <section className="relative min-h-screen bg-deep-space flex items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{ animationDuration: "1.6s" }} />
        <div className="absolute inset-3 rounded-full border border-nebula-blue/30 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
      </div>
    </section>
  );
}
