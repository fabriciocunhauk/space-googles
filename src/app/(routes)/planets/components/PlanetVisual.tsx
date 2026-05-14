"use client";
import Image from "next/image";
import { classNames } from "@/app/utils/classNames";

type PlanetVisualProps = {
  src: string | null;
  alt: string;
  loading: boolean;
};

export default function PlanetVisual({ src, alt, loading }: PlanetVisualProps) {
  return (
    <div className="flex justify-center animate-in zoom-in-75 duration-1000">
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
        <div className="absolute inset-0 bg-nebula-blue/20 blur-[100px] rounded-full animate-pulse" />
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            className={classNames(
              "object-contain transition-all duration-700 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]",
              loading
                ? "scale-90 opacity-50 blur-sm"
                : "scale-100 opacity-100 blur-0",
            )}
            priority
          />
        )}
      </div>
    </div>
  );
}
