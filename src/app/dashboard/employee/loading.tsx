import { Skeleton } from "@/components/shared/Skeleton";

export default function EmployeeDashboardLoading() {
  return (
    <div className="flex min-h-screen bg-[#0e0e0e]">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-64 flex-col p-4 gap-4 border-r border-white/5">
        <Skeleton className="h-10 w-32 mb-8" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between">
          <Skeleton className="h-10 w-64 md:w-80 rounded-xl" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>

        {/* Page Content Skeleton */}
        <div className="p-6 md:p-10 space-y-10">
          <div className="space-y-3">
             <Skeleton className="h-4 w-32" />
             <Skeleton className="h-12 w-64" />
             <Skeleton className="h-4 w-48" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[...Array(4)].map((_, i) => (
               <Skeleton key={i} className="h-[120px] rounded-2xl" />
             ))}
          </div>

          <div className="space-y-4">
             <Skeleton className="h-8 w-48" />
             <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
