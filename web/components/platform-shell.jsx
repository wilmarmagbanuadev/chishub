"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, CircleUserRound, Compass, Gauge, House, Map, Menu, MessageCircle, MessagesSquare, Moon, Search, Settings, ShieldCheck, ShoppingBag, Siren, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CommandPalette } from "@/components/command-palette";
import { Logo } from "@/components/logo";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/updates", label: "Latest updates", icon: Compass },
  { href: "/threads", label: "Discussions", icon: MessagesSquare },
  { href: "/alerts", label: "Alerts", icon: Siren, badge: "3" },
  { href: "/map", label: "Map view", icon: Map },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/chat", label: "Messages", icon: MessageCircle, badge: "5" },
];
const utilityLinks = [
  { href: "/profile", label: "My profile", icon: CircleUserRound },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/admin", label: "Admin console", icon: ShieldCheck },
];

function Navigation({ pathname, close }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-3"><Logo /></div>
      <div className="mt-7 rounded-[22px] bg-gradient-to-br from-orange-50 to-amber-50 p-3.5">
        <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm"><Gauge className="size-5" /></span><div><p className="text-sm font-bold text-slate-900">Brgy. Maligaya</p><p className="text-[11px] text-slate-500">Quezon City</p></div><ChevronRight className="ml-auto size-4 text-slate-400" /></div>
      </div>
      <nav className="mt-6 flex-1 space-y-1">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Community</p>
        {primaryLinks.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href;
          return <Link onClick={close} key={href} href={href} className={cn("group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900", active && "bg-orange-50 text-orange-700")}><Icon className={cn("size-[18px]", active ? "text-orange-500" : "text-slate-400 group-hover:text-slate-600")} />{label}{badge && <span className={cn("ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold", active ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500")}>{badge}</span>}</Link>;
        })}
        <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Account</p>
        {utilityLinks.map(({ href, label, icon: Icon }) => <Link onClick={close} key={href} href={href} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900", pathname === href && "bg-orange-50 text-orange-700")}><Icon className="size-[18px]" />{label}</Link>)}
      </nav>
      <div className="rounded-[22px] border bg-slate-50 p-3"><div className="flex items-center gap-3"><Avatar initials="AR" className="size-10" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">Ana Reyes</p><p className="truncate text-[11px] text-slate-500">Verified resident</p></div><button className="text-slate-400"><ChevronRight className="size-4" /></button></div></div>
    </div>
  );
}

export function PlatformShell({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] border-r bg-white p-5 lg:block"><Navigation pathname={pathname} /></aside>
      <AnimatePresence>{mobileOpen && <><motion.button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="fixed inset-y-0 left-0 z-50 w-[286px] bg-white p-5 shadow-2xl lg:hidden" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 28, stiffness: 280 }}><button onClick={() => setMobileOpen(false)} className="absolute right-4 top-5 rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X className="size-5" /></button><Navigation pathname={pathname} close={() => setMobileOpen(false)} /></motion.aside></>}</AnimatePresence>
      <header className="glass sticky top-0 z-30 flex h-[72px] items-center border-b px-4 lg:ml-[272px] lg:px-8">
        <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setMobileOpen(true)}><Menu className="size-5" /></Button>
        <div className="lg:hidden"><Logo compact /></div>
        <button onClick={() => setCommandOpen(true)} className="ml-3 hidden h-10 w-full max-w-sm items-center gap-3 rounded-2xl border bg-white px-3 text-left text-sm text-slate-400 shadow-sm hover:border-slate-300 sm:flex lg:ml-0"><Search className="size-4" />Search ChisHub...<kbd className="ml-auto rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-400">⌘ K</kbd></button>
        <div className="ml-auto flex items-center gap-1.5">
          <Button onClick={toggleTheme} variant="ghost" size="icon" aria-label="Toggle theme">{darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>
          <Button onClick={() => setNotificationsOpen(true)} variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-orange-500 ring-2 ring-white" /></Button>
          <Link href="/profile"><Avatar initials="AR" className="ml-1 size-9" /></Link>
        </div>
      </header>
      <main className="px-4 py-6 pb-24 sm:px-6 lg:ml-[272px] lg:px-8 lg:py-8">{children}</main>
      <nav className="glass fixed bottom-3 left-1/2 z-30 flex w-[calc(100%-1.5rem)] -translate-x-1/2 items-center justify-around rounded-[22px] border px-2 py-2 shadow-[0_12px_40px_-12px_rgba(15,23,42,.3)] lg:hidden">
        {[primaryLinks[0], primaryLinks[1], primaryLinks[3], primaryLinks[5], primaryLinks[6]].map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={cn("flex min-w-14 flex-col items-center gap-1 rounded-xl p-1.5 text-[9px] font-bold text-slate-400", pathname === href && "bg-orange-50 text-orange-600")}><Icon className="size-5" />{label.split(" ")[0]}</Link>)}
      </nav>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <AnimatePresence>{notificationsOpen && <><motion.button aria-label="Close notifications" onClick={() => setNotificationsOpen(false)} className="fixed inset-0 z-50 bg-slate-950/25 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-white p-5 shadow-2xl" initial={{ x: 450 }} animate={{ x: 0 }} exit={{ x: 450 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}><div className="flex items-center justify-between"><div><h2 className="text-xl font-extrabold">Notifications</h2><p className="text-xs text-slate-500">Stay on top of your community.</p></div><Button onClick={() => setNotificationsOpen(false)} variant="ghost" size="icon"><X className="size-5" /></Button></div><div className="mt-6 space-y-3">{[["Internet service update","Repair crews are now on site.","2m","info"],["New emergency advisory","Heavy rainfall expected after 5 PM.","18m","warning"],["Liza replied to your thread","“I can help coordinate the schedule.”","1h","chat"]].map(([title,body,time,type]) => <div key={title} className="rounded-[20px] border p-4 hover:bg-slate-50"><div className="flex items-center gap-2"><span className={cn("size-2 rounded-full", type === "warning" ? "bg-amber-500" : type === "info" ? "bg-blue-500" : "bg-orange-500")} /><p className="text-sm font-bold">{title}</p><span className="ml-auto text-[10px] text-slate-400">{time}</span></div><p className="mt-2 pl-4 text-xs leading-5 text-slate-500">{body}</p></div>)}</div><Button variant="outline" className="mt-5 w-full" asChild><Link href="/notifications" onClick={() => setNotificationsOpen(false)}>View all notifications</Link></Button></motion.aside></>}</AnimatePresence>
    </div>
  );
}
