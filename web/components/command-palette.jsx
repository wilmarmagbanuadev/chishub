"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Map, MessageCircle, Search, Settings, ShoppingBag, Siren, Users } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const commands = [
  { label: "Search community updates", href: "/updates", icon: Search },
  { label: "View active alerts", href: "/alerts", icon: Siren },
  { label: "Open community map", href: "/map", icon: Map },
  { label: "Browse marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Open messages", href: "/chat", icon: MessageCircle },
  { label: "View notifications", href: "/notifications", icon: Bell },
  { label: "Community discussions", href: "/threads", icon: Users },
  { label: "Open settings", href: "/settings", icon: Settings },
];

export function CommandPalette({ open, onOpenChange }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);
  const results = commands.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[15%] max-w-xl translate-y-0 overflow-hidden rounded-[24px] p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <div className="flex items-center gap-3 border-b px-5"><Search className="size-5 text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search or jump to..." className="h-16 flex-1 bg-transparent text-sm outline-none" /><kbd className="rounded-lg border bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-400">ESC</kbd></div>
        <div className="max-h-96 overflow-y-auto p-2"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Quick actions</p>{results.map(({ label, href, icon: Icon }) => <Link href={href} onClick={() => onOpenChange(false)} key={label} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700"><span className="flex size-9 items-center justify-center rounded-xl bg-slate-100"><Icon className="size-4" /></span>{label}<span className="ml-auto text-xs text-slate-300">↗</span></Link>)}</div>
      </DialogContent>
    </Dialog>
  );
}
