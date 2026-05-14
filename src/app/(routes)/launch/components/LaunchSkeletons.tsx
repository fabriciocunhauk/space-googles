import { classNames } from "@/app/utils/classNames";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-xl bg-white/5",
        className ?? ""
      )}
    />
  );
}

export function CountdownSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 md:p-10 glass rounded-3xl md:rounded-[40px] border border-white/10">
      <div className="space-y-4 w-full max-w-md">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="aspect-video w-full rounded-[28px]" />
      <div className="glass rounded-[28px] p-6 md:p-8 space-y-7 border border-white/10">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
