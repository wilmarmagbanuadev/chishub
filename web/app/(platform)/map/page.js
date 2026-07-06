import { Crosshair, Filter, Layers3, MapPin, Search, Siren, Store, Wifi, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const pins = [
  { icon: Wifi, label: "Internet outage", meta: "Molave St. · 24 reports", position: "left-[24%] top-[31%]", tone: "bg-blue-500" },
  { icon: Zap, label: "Power restored", meta: "Acacia St. · 8m ago", position: "left-[62%] top-[22%]", tone: "bg-green-500" },
  { icon: Siren, label: "Flood watch", meta: "Riverside · Moderate", position: "left-[52%] top-[61%]", tone: "bg-amber-500" },
  { icon: Store, label: "Weekend market", meta: "Covered court · Sat", position: "left-[78%] top-[72%]", tone: "bg-orange-500" },
];

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-orange-500">Around you</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Community map</h1><p className="mt-1 text-sm text-slate-500">Live alerts, services, events, and local places near Brgy. Maligaya.</p></div><div className="flex gap-2"><Button variant="outline"><Layers3 className="size-4" /> Layers</Button><Button variant="outline"><Filter className="size-4" /> Filter</Button></div></div>
      <div className="relative h-[calc(100vh-190px)] min-h-[600px] overflow-hidden rounded-[28px] border bg-[#edf0e9] shadow-sm">
        <div className="absolute inset-0 opacity-70" style={{backgroundImage:"linear-gradient(30deg, transparent 47%, #d4dbcdaa 48%, #d4dbcdaa 51%, transparent 52%), linear-gradient(120deg, transparent 47%, #d4dbcdaa 48%, #d4dbcdaa 51%, transparent 52%)",backgroundSize:"110px 110px"}} />
        <div className="absolute left-[-5%] top-[45%] h-16 w-[110%] rotate-[-8deg] bg-blue-200/70" />
        <div className="absolute left-5 right-5 top-5 z-10 flex gap-2 sm:left-1/2 sm:max-w-md sm:-translate-x-1/2"><div className="glass flex h-12 flex-1 items-center gap-3 rounded-2xl border px-4 shadow-lg"><Search className="size-4 text-slate-400" /><input placeholder="Search this area" className="w-full bg-transparent text-sm outline-none" /></div><Button size="icon" className="size-12 rounded-2xl"><Crosshair className="size-5" /></Button></div>
        {pins.map(({icon:Icon,label,meta,position,tone}) => <div key={label} className={`group absolute z-10 ${position}`}><button className={`flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-4 border-white text-white shadow-lg transition hover:scale-110 ${tone}`}><Icon className="size-5" /></button><Card className="invisible absolute left-1/2 top-8 w-48 -translate-x-1/2 rounded-2xl p-3 opacity-0 transition group-hover:visible group-hover:opacity-100"><p className="text-xs font-bold">{label}</p><p className="mt-1 text-[10px] text-slate-500">{meta}</p></Card></div>)}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex gap-2 overflow-x-auto sm:right-auto"><Badge variant="outline" className="glass shrink-0 px-3 py-2"><span className="mr-2 size-2 rounded-full bg-red-500" /> Emergency</Badge><Badge variant="outline" className="glass shrink-0 px-3 py-2"><span className="mr-2 size-2 rounded-full bg-blue-500" /> Utilities</Badge><Badge variant="outline" className="glass shrink-0 px-3 py-2"><span className="mr-2 size-2 rounded-full bg-orange-500" /> Community</Badge><Badge variant="outline" className="glass shrink-0 px-3 py-2"><MapPin className="mr-1 size-3" /> Within 2.5 km</Badge></div>
      </div>
    </div>
  );
}
