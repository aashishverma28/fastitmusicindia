import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <div className="inline-block p-4 border-2 border-foreground/20 rounded-2xl bg-card-bg shadow-[4px_4px_0px_0px_#f00a88]">
          <span className="font-display font-black text-6xl sm:text-7xl text-primary tracking-tighter">404</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black font-display text-foreground tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-foreground/60 font-sans leading-relaxed">
            The page you are looking for doesn&apos;t exist, has been moved, or is completely restricted.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="btn-neubrutalist inline-block px-8 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
