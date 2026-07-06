import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight, CloudSun, Droplets, HeartHandshake, MapPin, MessageCircle, Plus, ShieldCheck, Siren, Users, Wifi, Zap } from "lucide-react";
import { ComposerDialog } from "@/components/composer-dialog";
import { PageHeader } from "@/components/page-header";
import { UpdateCard } from "@/components/update-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader eyebrow="Monday, July 6" title="Magandang hapon, Ana!" description="Here’s what’s happening around Brgy. Maligaya today." action={<ComposerDialog><Button><Plus className="size-4" /> Create post</Button></ComposerDialog>} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Users, value: "2,430", label: "Neighbors", note: "+12 this week", tone: "bg-[#e5eef4] text-[#365d74]" },
              { icon: MessageCircle, value: "38", label: "New posts", note: "In the last 24h", tone: "bg-[#fbe7e2] text-[#a53a2c]" },
              { icon: CalendarDays, value: "6", label: "Events", note: "Coming up", tone: "bg-[#fff1c9] text-[#846016]" },
              { icon: HeartHandshake, value: "124", label: "Volunteers", note: "This month", tone: "bg-[#dff1e6] text-[#287054]" },
            ].map(({ icon: Icon, value, label, note, tone }) => <Card key={label}><CardContent className="p-4 sm:p-5"><span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-[18px]" /></span><p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold">{value}</p><p className="text-sm font-bold">{label}</p><p className="mt-1 text-[11px] text-[#7a878e]">{note}</p></CardContent></Card>)}
          </div>
          <Card className="overflow-hidden border-[#efd5ae] bg-[#fff9e9]">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#fb923c] text-[#0f172a]"><Siren className="size-6" /></span>
              <div className="flex-1"><div className="flex flex-wrap items-center gap-2"><Badge variant="danger">ACTIVE ALERT</Badge><span className="text-xs text-[#84775c]">Updated 12 minutes ago</span></div><h3 className="mt-2 font-[family-name:var(--font-display)] font-bold">Internet outage affecting Molave Street</h3><p className="mt-1 text-sm text-[#746d5e]">The provider is investigating the disruption. The next update is expected at 2:00 PM.</p></div>
              <Button variant="outline" asChild><Link href="/alerts">View details <ChevronRight className="size-4" /></Link></Button>
            </CardContent>
          </Card>
          <div>
            <div className="mb-4 flex items-center justify-between"><h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Latest from your community</h2><Button variant="ghost" size="sm" asChild><Link href="/updates">View all <ArrowRight className="size-4" /></Link></Button></div>
            <div className="space-y-4">
              <UpdateCard featured author="Marisol Cruz" initials="MC" tone="blue" role="Community volunteer" time="1h" category="Community event" title="Weekend coastal clean-up — volunteers welcome!" body="We’re meeting by the covered court at 6 AM this Saturday. Gloves, sacks, and a hearty breakfast are on us. Bring a friend!" likes="48" comments="12" />
              <UpdateCard author="Brgy. Maligaya Council" initials="BM" tone="green" role="Verified barangay office" time="3h" category="Official update" title="Free health screening this Wednesday" body="Blood pressure, blood sugar, and basic consultations will be available at the barangay hall from 8 AM to 2 PM." likes="31" comments="8" />
            </div>
          </div>
        </div>
        <aside className="space-y-5">
          <Card className="overflow-hidden bg-[#0f172a] text-white">
            <CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-white/55">Brgy. Maligaya</p><p className="mt-1 text-2xl font-extrabold">31°C</p></div><CloudSun className="size-10 text-[#fb923c]" /></div><p className="mt-3 text-sm font-semibold">Partly cloudy</p><p className="mt-1 text-xs text-white/50">Rain possible after 5 PM · 42%</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">Service status</CardTitle><span className="flex items-center gap-1 text-[11px] font-bold text-[#287054]"><span className="size-2 rounded-full bg-[#36a66c]" /> LIVE</span></CardHeader>
            <CardContent className="space-y-3">
              {[{ icon: Zap, label: "Power", status: "Operational", ok: true }, { icon: Wifi, label: "Internet", status: "Partial outage", ok: false }, { icon: Droplets, label: "Water", status: "Operational", ok: true }, { icon: ShieldCheck, label: "Safety", status: "All clear", ok: true }].map(({ icon: Icon, label, status, ok }) => <div key={label} className="flex items-center gap-3 rounded-xl bg-[#f5f6f2] p-3"><Icon className="size-4 text-[#5d6c74]" /><span className="flex-1 text-sm font-semibold">{label}</span><span className={`text-xs font-bold ${ok ? "text-[#287054]" : "text-[#b47b12]"}`}>{status}</span></div>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between"><CardTitle className="text-base">Upcoming</CardTitle><Button variant="ghost" size="sm">See all</Button></CardHeader>
            <CardContent className="space-y-4">
              {[["09","JUL","Senior citizen wellness day","Barangay Hall · 9 AM"],["11","JUL","Community clean-up","Covered Court · 6 AM"],["16","JUL","Youth council meeting","Multi-purpose Hall · 4 PM"]].map(([day, month, title, meta]) => <div key={title} className="flex gap-3"><div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#fff1c9]"><span className="text-sm font-extrabold leading-none">{day}</span><span className="mt-1 text-[9px] font-bold text-[#9b751e]">{month}</span></div><div><p className="text-sm font-bold leading-tight">{title}</p><p className="mt-1 text-xs text-[#7a878e]">{meta}</p></div></div>)}
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardContent className="flex items-center gap-3 p-4"><MapPin className="size-5 text-[#f97316]" /><div><p className="text-sm font-bold">Your neighborhood radius</p><p className="text-xs text-[#7a878e]">2.5 km around Brgy. Maligaya</p></div></CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
