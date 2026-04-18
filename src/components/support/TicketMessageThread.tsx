"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Loader2, 
  User, 
  ShieldCheck, 
  Paperclip,
  Clock
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function TicketMessageThread({ ticketId }: { ticketId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const { data: session } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [ticketId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/support/tickets/${ticketId}/messages`);
      const data = await response.json();
      if (response.ok) setMessages(data.messages);
    } catch (err) {
      console.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsSending(true);
    try {
      const response = await fetch(`/api/support/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
         <Loader2 className="w-8 h-8 text-primary animate-spin" />
         <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Establishing secure connection...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] glass rounded-[2.5rem] border border-white/5 overflow-hidden">
      {/* Header Info */}
      <div className="px-8 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Live Conversation Thread</p>
         </div>
         <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Secure Channel Encrypted</p>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
         {messages.map((msg, i) => {
            const isMe = msg.senderId === session?.user.id;
            const isAdmin = msg.sender.role === "ADMIN";
            
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] flex flex-col ${isMe ? "items-end" : "items-start"} gap-2`}>
                   <div className={`flex items-center gap-2 mb-1`}>
                      {!isMe && (
                        <div className={`w-8 h-8 rounded-lg ${isAdmin ? "bg-primary/20" : "bg-white/5"} flex items-center justify-center`}>
                           {isAdmin ? <ShieldCheck className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-white/20" />}
                        </div>
                      )}
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                         {isAdmin ? <span className="text-primary italic">Support Staff</span> : msg.sender.username} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                   </div>
                   <div className={`p-5 rounded-3xl font-sans text-sm leading-relaxed ${
                      isMe 
                      ? "bg-primary text-black font-medium border-none rounded-tr-none" 
                      : isAdmin 
                        ? "bg-white/5 border border-primary/20 text-white rounded-tl-none" 
                        : "bg-white/5 border border-white/10 text-white rounded-tl-none"
                   }`}>
                      {msg.message}
                   </div>
                </div>
              </div>
            );
         })}
         <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/40 border-t border-white/5">
         <div className="relative flex items-center gap-2">
            <button className="p-3 text-white/20 hover:text-white transition-colors">
               <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder="Typing Message..."
              className="flex-grow bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white text-sm focus:border-primary/40 outline-none placeholder:text-white/10 italic"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isSending || !newMessage.trim()}
              className="absolute right-2 bg-primary text-black p-3 rounded-xl hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
         </div>
      </div>
    </div>
  );
}
