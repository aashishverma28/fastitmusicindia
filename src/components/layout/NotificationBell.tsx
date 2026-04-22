"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Info, 
  AlertTriangle,
  Clock,
  Circle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      if (response.ok) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter((n: any) => !n.isRead).length);
      }
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (response.ok) fetchNotifications();
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "APPROVAL": return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "REJECTION": return <XCircle className="w-4 h-4 text-red-500" />;
      case "PAYMENT": return <Clock className="w-4 h-4 text-primary" />;
      default: return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/5 rounded-xl transition-all"
      >
        <Bell className="w-5 h-5 text-white/60" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#070707] ring-1 ring-primary/40 animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 glass border border-white/10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-50 overflow-hidden"
            >
              <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-xs font-black text-white uppercase tracking-widest italic">Station <span className="text-primary">Alerts</span></h3>
                 {unreadCount > 0 && <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">{unreadCount} New</span>}
              </div>

              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                 {notifications.length > 0 ? notifications.map((n: any) => (
                   <div 
                    key={n.id} 
                    onClick={() => markAsRead(n.id)}
                    className={`p-5 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/[0.02] last:border-none ${!n.isRead ? "bg-white/[0.02]" : "opacity-40"}`}
                   >
                     <div className="mt-1 flex-shrink-0">
                        {getIcon(n.type)}
                     </div>
                     <div className="space-y-1">
                        <p className={`text-xs ${!n.isRead ? "text-white font-medium" : "text-white/60"} font-sans leading-relaxed`}>
                           {n.content}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                           {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                     </div>
                     {!n.isRead && (
                       <div className="mt-1 flex-shrink-0">
                          <Circle className="w-2 h-2 fill-primary text-primary" />
                       </div>
                     )}
                   </div>
                 )) : (
                   <div className="p-12 text-center space-y-3">
                      <Bell className="w-8 h-8 text-white/5 mx-auto" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Transmission Log Empty</p>
                   </div>
                 )}
              </div>

              <div className="p-4 bg-white/5 border-t border-white/5 text-center">
                 <button className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-primary transition-colors">Clear Broadcast History</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
