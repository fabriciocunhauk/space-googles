type PlanetStatCardProps = {
  label: string;
  value: string | number | undefined;
  unit?: string;
};

export default function PlanetStatCard({ label, value, unit }: PlanetStatCardProps) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-Barlow-Condensed tracking-[2.35px] uppercase text-nebula-blue">
        {label}
      </p>
      <div className="text-xl md:text-2xl font-Bellefair uppercase">
        {value === undefined ? (
          <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg mt-1" />
        ) : (
          <>
            {value}
            {unit && typeof value === "string" && !value.includes(" ") && ` ${unit}`}
            {unit && typeof value === "number" && ` ${unit}`}
          </>
        )}
      </div>
    </div>
  );
}
