"use client";

import { useState } from "react";
import { Info, MoreHorizontal, Paperclip, Phone, Search, Send, Smile, Video } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const conversations = [
  { name: "Clean-up volunteers", initials: "CV", tone: "green", message: "Marisol: See everyone Saturday!", time: "2m", unread: 3, group: true },
  { name: "Liza Domingo", initials: "LD", tone: "violet", message: "I can take the Tuesday schedule.", time: "18m", online: true },
  { name: "Barangay Help Desk", initials: "BH", tone: "blue", message: "Your document is ready for pickup.", time: "1h", verified: true },
  { name: "Nico Tan", initials: "NT", tone: "gold", message: "Salamat for the recommendation!", time: "3h" },
  { name: "Street watch group", initials: "SW", tone: "coral", message: "Ramon shared a photo.", time: "Yesterday", group: true },
];

const initialMessages = [
  { from: "Marisol", text: "Hi, everyone! Quick reminder for our coastal clean-up this Saturday. 🌊", time: "9:12 AM", mine: false },
  { from: "You", text: "I’ll be there! I can bring two extra pairs of gloves.", time: "9:16 AM", mine: true },
  { from: "Paolo", text: "My brother and I are joining too. Where exactly are we meeting?", time: "9:21 AM", mine: false },
  { from: "Marisol", text: "Covered court at 6 AM. We’ll walk to the site together. See everyone Saturday!", time: "9:23 AM", mine: false },
];

export function ChatInterface() {
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  function sendMessage(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    setMessages([...messages, { from: "You", text: draft.trim(), time: "Now", mine: true }]);
    setDraft("");
  }
  return (
    <div className="grid h-[calc(100vh-8.5rem)] min-h-[570px] overflow-hidden rounded-2xl border bg-white shadow-sm md:grid-cols-[310px_minmax(0,1fr)]">
      <aside className={cn("border-r", active !== null && "hidden md:block")}>
        <div className="border-b p-4"><div className="flex items-center justify-between"><h1 className="font-[family-name:var(--font-display)] text-xl font-extrabold">Messages</h1><Button variant="ghost" size="icon"><MoreHorizontal className="size-5" /></Button></div><div className="relative mt-3"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#879299]" /><input className="h-10 w-full rounded-xl bg-[#f1f2ee] pl-9 pr-3 text-sm outline-none" placeholder="Search messages" /></div></div>
        <div className="scrollbar-none h-[calc(100%-105px)] overflow-y-auto p-2">
          {conversations.map((chat, index) => <button key={chat.name} onClick={() => setActive(index)} className={cn("flex w-full gap-3 rounded-xl p-3 text-left hover:bg-[#f3f4f0]", active === index && "bg-[#f0f1ed]")}><Avatar initials={chat.initials} tone={chat.tone} online={chat.online} /><div className="min-w-0 flex-1"><div className="flex items-center gap-1"><p className="truncate text-sm font-bold">{chat.name}</p>{chat.verified && <span className="text-xs text-[#337ca3]">●</span>}<span className="ml-auto text-[10px] text-[#8c979c]">{chat.time}</span></div><div className="mt-1 flex items-center gap-2"><p className="truncate text-xs text-[#758289]">{chat.message}</p>{chat.unread && <span className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-[10px] font-bold text-white">{chat.unread}</span>}</div></div></button>)}
        </div>
      </aside>
      <section className={cn("flex min-w-0 flex-col", active === null && "hidden md:flex")}>
        <header className="flex h-[73px] items-center gap-3 border-b px-4"><button onClick={() => setActive(null)} className="text-sm font-bold text-[#f97316] md:hidden">Back</button><Avatar initials={conversations[active || 0].initials} tone={conversations[active || 0].tone} /><div><p className="font-bold">{conversations[active || 0].name}</p><p className="text-xs text-[#77838a]">{conversations[active || 0].group ? "18 members · 6 online" : "Active now"}</p></div><div className="ml-auto flex"><Button variant="ghost" size="icon" aria-label="Start voice call"><Phone className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="Start video call"><Video className="size-5" /></Button><Button variant="ghost" size="icon"><Search className="size-5" /></Button><Button variant="ghost" size="icon"><Info className="size-5" /></Button></div></header>
        <div className="scrollbar-none flex-1 overflow-y-auto bg-[#fafaf7] px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center"><Badge variant="outline">Today</Badge></div>
            <div className="space-y-5">{messages.map((message, index) => <div key={`${message.time}-${index}`} className={cn("flex gap-2", message.mine && "justify-end")} >{!message.mine && <Avatar initials={message.from.slice(0,2).toUpperCase()} tone={index % 2 ? "gold" : "blue"} className="size-8" />}<div className={cn("max-w-[78%]", message.mine && "text-right")} >{!message.mine && <p className="mb-1 text-left text-[11px] font-bold text-[#65737b]">{message.from}</p>}<div className={cn("rounded-2xl px-4 py-2.5 text-left text-sm leading-6", message.mine ? "rounded-br-md bg-[#f97316] text-white" : "rounded-bl-md border bg-white")}>{message.text}</div><p className="mt-1 text-[10px] text-[#929ca1]">{message.time}</p></div></div>)}</div>
          </div>
        </div>
        <form onSubmit={sendMessage} className="flex items-end gap-2 border-t bg-white p-3 sm:p-4"><Button type="button" variant="ghost" size="icon"><Paperclip className="size-5" /></Button><div className="relative flex-1"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows="1" className="max-h-28 min-h-11 w-full resize-none rounded-xl bg-[#f1f2ee] px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#f9731620]" placeholder="Write a message..." /><Smile className="absolute right-3 top-3.5 size-4 text-[#849097]" /></div><Button type="submit" size="icon"><Send className="size-4" /></Button></form>
      </section>
    </div>
  );
}
