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
      <p className="text-xl md:text-2xl font-Bellefair uppercase">
        {value}
        {unit && ` ${unit}`}
      </p>
    </div>
  );
}
