import { Skeleton } from "@/components/shared/Skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-10 w-64 md:w-80" />
        <Skeleton className="h-4 w-60 md:w-72" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
            <div className="h-12 w-full bg-white/5" />
            <div className="p-8 space-y-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* System Health / Quick Actions Skeleton */}
        <div className="space-y-6">
           <Skeleton className="h-7 w-40" />
           <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-3xl" />
              ))}
           </div>

           <Skeleton className="h-[250px] w-full rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}
