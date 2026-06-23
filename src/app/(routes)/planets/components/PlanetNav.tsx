import { classNames } from "@/app/utils/classNames";
import { PLANET_LIST } from "../constants";
import Link from "next/link";

type PlanetNavProps = {
  selected: string;
};

export default function PlanetNav({ selected }: PlanetNavProps) {
  return (
    <nav className="flex flex-wrap gap-6 md:gap-8 border-b border-white/10 pb-4">
      {PLANET_LIST.map((name) => (
        <Link
          key={name}
          href={`/planets/${name}`}
          className={classNames(
            "font-Barlow-Condensed tracking-[2.7px] uppercase transition-all duration-300 border-b-2 pb-2 -mb-[18px]",
            selected === name
              ? "text-white border-white"
              : "text-nebula-blue border-transparent hover:border-white/50",
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
