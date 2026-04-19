import { Skeleton } from "@/components/shared/Skeleton";

export default function LabelDashboardLoading() {
  return (
    <div className="space-y-10">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 md:w-80" />
          <Skeleton className="h-4 w-60 md:w-72" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-36 rounded-xl" />
          <Skeleton className="h-12 w-36 rounded-xl" />
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Artist Roster Snapshot Skeleton */}
         <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
             <Skeleton className="h-7 w-48" />
             <Skeleton className="h-4 w-16" />
           </div>
           
           <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden">
             <div className="p-5 bg-white/5">
                <Skeleton className="h-4 w-full" />
             </div>
             <div className="p-8 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl" />
                ))}
             </div>
           </div>
         </div>

         {/* Territory Overview Skeleton */}
         <div className="space-y-6">
            <Skeleton className="h-7 w-40" />
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
               <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-8" />
                       </div>
                       <Skeleton className="h-1.5 w-full rounded-full" />
                    </div>
                  ))}
               </div>
               <Skeleton className="h-20 w-full rounded-3xl" />
            </div>
         </div>
      </div>
    </div>
  );
}
