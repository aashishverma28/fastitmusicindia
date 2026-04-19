import { Skeleton } from "@/components/shared/Skeleton";

export default function ArtistDashboardLoading() {
  return (
    <div className="space-y-10">
      {/* Welcome Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 md:w-80" />
          <Skeleton className="h-4 w-48 md:w-64" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analytics Section Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-[350px] rounded-[2.5rem]" />
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
            <Skeleton className="h-24 rounded-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
