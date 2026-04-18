import { LucideIcon, Ghost } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ 
  icon: Icon = Ghost, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="glass p-20 rounded-[3rem] border border-white/5 text-center space-y-6 animate-in fade-in zoom-in duration-500">
       <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
          <Icon className="w-10 h-10 text-white/10" />
       </div>
       <div className="space-y-2">
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{title}</h3>
          <p className="text-sm text-white/30 font-sans max-w-sm mx-auto leading-relaxed">{description}</p>
       </div>
       {action && (
         <Link 
          href={action.href}
          className="btn-gradient px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/10"
         >
            {action.label}
         </Link>
       )}
    </div>
  );
}
