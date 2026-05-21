import Image from "next/image";
import type { NASAImage } from "../types";
import { AdUnit } from "@/app/components/AdUnit";

type NasaGalleryProps = {
  photos: NASAImage[];
  loading: boolean;
};

const SKELETON_COUNT = 7;

function GallerySkeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="glass-card aspect-square animate-pulse" />
      ))}
    </>
  );
}

function GalleryPhoto({ photo }: { photo: NASAImage }) {
  return (
    <div className="glass-card group relative aspect-square overflow-hidden cursor-pointer hover:scale-[1.05] transition-all duration-500">
      <Image
        src={photo.href}
        alt={photo.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
        <p className="text-[10px] text-white font-Barlow uppercase line-clamp-2">
          {photo.title}
        </p>
      </div>
    </div>
  );
}

export default function NasaGallery({ photos, loading }: NasaGalleryProps) {
  return (
    <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      <header className="flex items-center gap-4">
        <h3 className="text-2xl font-Bellefair uppercase">NASA Gallery</h3>
        <div className="h-[1px] flex-grow bg-white/10" />
        <p className="text-xs text-nebula-blue font-Barlow uppercase tracking-widest">
          Real Mission Photos
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <GallerySkeleton />
        ) : photos.length > 0 ? (
          <>
            {photos.map((photo, i) => (
              <GalleryPhoto key={i} photo={photo} />
            ))}
            <div className="glass-card group relative aspect-square overflow-hidden flex items-center justify-center">
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white/80 font-Barlow uppercase tracking-wider border border-white/10">
                Sponsored
              </div>
              <AdUnit
                slotId="1928374650"
                format="rectangle"
                responsive={true}
              />
            </div>
          </>
        ) : (
          <p className="col-span-full text-center text-nebula-blue font-Barlow italic">
            No mission photography found in archives.
          </p>
        )}
      </div>
    </div>
  );
}
