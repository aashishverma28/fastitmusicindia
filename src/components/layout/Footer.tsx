import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] w-full pt-20 pb-10 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 w-full max-w-[1920px] mx-auto">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="Fastit Music India" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-white font-display tracking-tighter">
              Fastit Music India
            </span>
          </Link>
          <p className="text-white/60 leading-relaxed font-sans">
            The sonic heartbeat of India's independent music movement. We don't just distribute; we accelerate careers.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Distribution</h4>
          <nav className="flex flex-col gap-3">
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/artists">Artists</Link>
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/labels">Labels</Link>
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/pricing">Pricing</Link>
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/services">Services</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Company</h4>
          <nav className="flex flex-col gap-3">
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/about">About Us</Link>
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/privacy">Privacy Policy</Link>
            <Link className="text-white/40 hover:text-secondary transition-colors hover:translate-x-1" href="/terms">Terms of Service</Link>
            <span className="text-white/40">Office: Assam, India</span>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Connect</h4>
          <div className="flex gap-6">
            <a href="https://instagram.com/fastitmusicindia" target="_blank" className="text-white/40 hover:text-primary transition-colors text-lg">Instagram</a>
            <a href="https://x.com/fastitmusicind" target="_blank" className="text-white/40 hover:text-primary transition-colors text-lg">X</a>
            <a href="https://www.youtube.com/@FastitMusicIndia?sub_confirmation=1" target="_blank" className="text-white/40 hover:text-red-500 transition-colors text-lg">YouTube</a>
          </div>
          <div className="mt-8">
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] mb-4">Newsletter</p>
            <div className="flex bg-surface-container-lowest rounded-full p-1 border border-white/10 focus-within:border-primary/50 transition-colors bg-black">
              <input 
                suppressHydrationWarning
                className="bg-transparent border-none focus:ring-0 text-white px-4 w-full text-sm outline-none" 
                placeholder="Your email" 
                type="email"
              />
              <button 
                suppressHydrationWarning
                className="bg-primary text-black font-bold px-4 py-2 rounded-full text-xs"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1920px] mx-auto">
        <p className="text-white/60 text-sm">© 2026 Fastit Music India. All Rights Reserved.</p>
        <p className="text-white/40 text-sm">Made with <span className="text-red-500">❤️</span> by Fastit Group Solutions Pvt.Ltd</p>
        <div className="flex gap-8 items-center">
          <Link className="text-primary text-sm font-bold" href="/login">Artist Portal</Link>
          <Link className="text-white/40 text-sm" href="/support">Support Center</Link>
        </div>
      </div>
    </footer>
  );
}
