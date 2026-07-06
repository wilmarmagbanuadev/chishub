import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BellRing, Check, CloudRain, MessageCircle, Radio, ShieldCheck, ShoppingBag, Sparkles, Users, Wifi, Zap } from "lucide-react";
import { Logo } from "@/components/logo";
import { MotionReveal } from "@/components/motion-reveal";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Zap, title: "Utility updates", body: "Power, internet, and water interruptions—clear, timely, and location-aware.", color: "bg-amber-50 text-amber-600" },
  { icon: BellRing, title: "Emergency alerts", body: "Weather, earthquake, and safety advisories delivered when every minute matters.", color: "bg-red-50 text-red-500" },
  { icon: MessageCircle, title: "Community stories", body: "Local news, discussions, recommendations, and the stories shaping your area.", color: "bg-blue-50 text-blue-500" },
  { icon: ShoppingBag, title: "Local marketplace", body: "Discover trusted sellers, services, events, and small businesses around you.", color: "bg-green-50 text-green-600" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
      <nav className="glass fixed left-1/2 top-4 z-40 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-[22px] border px-4 py-3 shadow-lg shadow-slate-900/5 sm:px-5">
        <Logo />
        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex"><a href="#features" className="hover:text-slate-900">Features</a><a href="#community" className="hover:text-slate-900">Community</a><a href="#trust" className="hover:text-slate-900">Safety</a></div>
        <div className="flex items-center gap-2"><Button variant="ghost" asChild className="hidden sm:inline-flex"><Link href="/login">Sign in</Link></Button><Button asChild><Link href="/register">Join ChisHub</Link></Button></div>
      </nav>

      <section className="relative px-4 pb-20 pt-32 sm:px-6 lg:pb-28 lg:pt-40">
        <div className="absolute left-[-10%] top-10 size-[420px] rounded-full bg-orange-200/30 blur-[100px]" />
        <div className="absolute right-[-10%] top-64 size-[360px] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <MotionReveal>
            <Badge variant="coral" className="mb-5 gap-2 bg-orange-100 px-3 py-2 text-orange-700"><Sparkles className="size-3.5" /> Community Hub for Information & Stories</Badge>
            <h1 className="max-w-xl font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[1.03] tracking-[-.05em] sm:text-6xl lg:text-7xl">Your community, <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">always in reach.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">Stay ahead of outages and emergencies, discover what’s happening nearby, and share the stories that bring your community closer.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild className="h-13 rounded-2xl px-7"><Link href="/register">Find your community <ArrowRight className="size-4" /></Link></Button><Button size="lg" variant="outline" asChild className="h-13 rounded-2xl px-7"><Link href="/dashboard">Explore live demo</Link></Button></div>
            <div className="mt-7 flex flex-wrap gap-4 text-xs font-semibold text-slate-500"><span className="flex items-center gap-1.5"><Check className="size-4 text-green-500" /> Free for residents</span><span className="flex items-center gap-1.5"><Check className="size-4 text-green-500" /> Verified sources</span><span className="flex items-center gap-1.5"><Check className="size-4 text-green-500" /> Privacy first</span></div>
          </MotionReveal>
          <MotionReveal delay={0.12} className="relative">
            <div className="premium-shadow relative aspect-[4/3] overflow-hidden rounded-[32px] border-[6px] border-white bg-slate-200">
              <Image src="/images/chishub-community-hero.png" alt="Filipino neighbors sharing a community update" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              <div className="glass absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-[20px] border border-white/60 p-3.5 sm:bottom-6 sm:left-6 sm:right-auto sm:min-w-72">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-orange-500 text-white"><Radio className="size-5" /></span><div><p className="text-xs font-bold text-slate-900">Live in Brgy. Maligaya</p><p className="mt-0.5 text-[11px] text-slate-500">2,430 connected residents</p></div><span className="ml-auto size-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="absolute -left-5 top-8 hidden rounded-[20px] border bg-white p-4 shadow-xl sm:block"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-2xl bg-red-50"><BellRing className="size-5 text-red-500" /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-red-500">New alert</p><p className="text-xs font-bold">Internet outage reported</p></div></div></div>
            <div className="absolute -bottom-6 right-8 hidden rounded-[20px] border bg-white p-4 shadow-xl sm:block"><div className="flex -space-x-2">{["AR","MC","NT"].map((item,index) => <Avatar key={item} initials={item} tone={index === 1 ? "blue" : index === 2 ? "gold" : "coral"} className="size-8 border-2 border-white" />)}<span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[9px] font-bold text-white">+28</span></div><p className="mt-2 text-xs font-bold">Neighbors joined today</p></div>
          </MotionReveal>
        </div>
      </section>

      <section id="features" className="bg-white px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl"><MotionReveal className="mx-auto max-w-2xl text-center"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-orange-500">Everything local, one place</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">Be informed. Be heard. Be connected.</h2><p className="mt-4 text-slate-500">A calm, trusted digital home for the information and people closest to you.</p></MotionReveal><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, body, color },index) => <MotionReveal key={title} delay={index * .06} className="group rounded-[28px] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"><span className={`flex size-12 items-center justify-center rounded-2xl ${color}`}><Icon className="size-5" /></span><h3 className="mt-6 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{body}</p></MotionReveal>)}</div></div>
      </section>

      <section id="community" className="px-4 py-24 sm:px-6"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"><MotionReveal><div className="grid grid-cols-2 gap-4"><div className="space-y-4 pt-10"><div className="rounded-[28px] bg-orange-500 p-6 text-white"><Users className="size-7" /><p className="mt-10 text-3xl font-extrabold">2.4K</p><p className="text-sm text-orange-100">Residents connected</p></div><div className="rounded-[28px] border bg-white p-5"><Wifi className="size-6 text-blue-500" /><p className="mt-5 text-sm font-bold">Internet restored</p><p className="mt-1 text-xs text-slate-500">Provider confirmed · 8m</p></div></div><div className="space-y-4"><div className="rounded-[28px] border bg-white p-5"><CloudRain className="size-6 text-blue-500" /><p className="mt-5 text-sm font-bold">Weather watch</p><p className="mt-1 text-xs text-slate-500">Moderate rainfall at 5 PM</p></div><div className="rounded-[28px] bg-slate-900 p-6 text-white"><ShieldCheck className="size-7 text-orange-400" /><p className="mt-10 text-xl font-extrabold">Verified updates</p><p className="mt-1 text-sm text-slate-400">Official sources are clearly labeled.</p></div></div></div></MotionReveal><MotionReveal delay={.1}><Badge className="bg-orange-100 text-orange-700">Made for real communities</Badge><h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight">Less noise. More of what matters near you.</h2><p className="mt-5 text-base leading-8 text-slate-500">ChisHub combines fast utility reporting, local storytelling, trusted announcements, useful conversations, and neighborhood discovery—without the clutter of a traditional social feed.</p><Button variant="dark" size="lg" className="mt-7" asChild><Link href="/register">Create your account <ArrowRight className="size-4" /></Link></Button></MotionReveal></div></section>

      <section id="trust" className="px-4 pb-8 sm:px-6"><div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-slate-950 px-6 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-orange-400">Your local signal</p><h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">Join the conversations already happening around you.</h2></div><Button size="lg" className="mt-7 bg-white text-slate-900 hover:bg-orange-50 lg:mt-0" asChild><Link href="/register">Get started free <ArrowRight className="size-4" /></Link></Button></div></section>
      <footer className="px-4 py-10 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row"><Logo /><p className="text-xs text-slate-400">© 2026 ChisHub. Community Hub for Information & Stories.</p><div className="flex gap-5 text-xs font-semibold text-slate-500"><a href="#">Privacy</a><a href="#">Safety</a><a href="#">Terms</a></div></div></footer>
    </main>
  );
}
