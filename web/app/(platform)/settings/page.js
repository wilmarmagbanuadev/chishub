"use client";

import { useState } from "react";
import { Bell, ChevronRight, Eye, Lock, MapPin, Moon, Shield, Smartphone, UserRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  { icon: UserRound, title: "Account information", text: "Name, email, phone number" },
  { icon: Lock, title: "Password & security", text: "Password, two-factor authentication" },
  { icon: MapPin, title: "Location & community", text: "Brgy. Maligaya · 2.5 km radius" },
  { icon: Eye, title: "Privacy", text: "Profile visibility and blocked accounts" },
  { icon: Smartphone, title: "Connected devices", text: "2 active sessions" },
];

export default function SettingsPage() {
  const [push, setPush] = useState(true);
  const [alerts, setAlerts] = useState(true);
  return <div className="mx-auto max-w-5xl"><PageHeader eyebrow="Preferences" title="Settings" description="Control your ChisHub account, notifications, privacy, and appearance." /><div className="grid gap-6 lg:grid-cols-[1fr_340px]"><div className="space-y-3">{sections.map(({icon:Icon,title,text}) => <button key={title} className="flex w-full items-center gap-4 rounded-[24px] border bg-white p-4 text-left shadow-sm hover:border-orange-200 hover:shadow-md"><span className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600"><Icon className="size-5" /></span><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-slate-500">{text}</p></div><ChevronRight className="ml-auto size-4 text-slate-400" /></button>)}</div><aside className="space-y-5"><Card><CardContent className="p-5"><div className="flex items-center gap-3"><Bell className="size-5 text-orange-500" /><h2 className="font-bold">Notifications</h2></div><div className="mt-5 space-y-4">{[["Push notifications",push,setPush],["Emergency alerts",alerts,setAlerts]].map(([label,value,setValue]) => <div key={label} className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-600">{label}</span><button onClick={() => setValue(!value)} className={`relative h-6 w-11 rounded-full ${value ? "bg-orange-500" : "bg-slate-200"}`}><span className={`absolute top-1 size-4 rounded-full bg-white shadow transition ${value ? "left-6" : "left-1"}`} /></button></div>)}</div></CardContent></Card><Card><CardContent className="p-5"><div className="flex items-center gap-3"><Moon className="size-5 text-orange-500" /><h2 className="font-bold">Appearance</h2></div><div className="mt-4 grid grid-cols-3 gap-2">{["Light","Dark","System"].map((mode,index) => <button key={mode} className={`rounded-xl border p-2 text-xs font-bold ${index===0 ? "border-orange-400 bg-orange-50 text-orange-700" : "text-slate-500"}`}>{mode}</button>)}</div></CardContent></Card><Card className="bg-slate-900 text-white"><CardContent className="p-5"><Shield className="size-6 text-orange-400" /><h3 className="mt-4 font-bold">Your account is protected</h3><p className="mt-1 text-xs leading-5 text-slate-400">Two-factor authentication is enabled.</p></CardContent></Card></aside></div></div>;
}
