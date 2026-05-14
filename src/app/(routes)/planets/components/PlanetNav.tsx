"use client";
import { classNames } from "@/app/utils/classNames";
import { PLANET_LIST } from "../constants";

type PlanetNavProps = {
  selected: string;
  onSelect: (name: string) => void;
};

export default function PlanetNav({ selected, onSelect }: PlanetNavProps) {
  return (
    <nav className="flex flex-wrap gap-6 md:gap-8 border-b border-white/10 pb-4">
      {PLANET_LIST.map((name) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={classNames(
            "font-Barlow-Condensed tracking-[2.7px] uppercase transition-all duration-300 border-b-2 pb-2 -mb-[18px]",
            selected === name
              ? "text-white border-white"
              : "text-nebula-blue border-transparent hover:border-white/50",
          )}
        >
          {name}
        </button>
      ))}
    </nav>
  );
}
