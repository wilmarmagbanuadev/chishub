import { AlertTriangle, CheckCircle2, Clock3, Filter, MapPin, Plus, Radio, ShieldCheck, TrafficCone, Wifi, Zap } from "lucide-react";
import { ComposerDialog } from "@/components/composer-dialog";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const alerts = [
  { icon: Wifi, tone: "bg-[#e2f0f8] text-[#33708e]", level: "Internet outage", title: "Connection interrupted on Molave Street", body: "The provider has confirmed a service disruption and dispatched a repair team. Next update at 2:00 PM.", place: "Molave St. & nearby blocks", time: "12 min ago", status: "In progress", official: true },
  { icon: TrafficCone, tone: "bg-[#fff0cf] text-[#976b13]", level: "Road advisory", title: "One lane closed along Mabini Avenue", body: "Drainage clearing is underway until 5:00 PM. Expect light traffic near the public market.", place: "Mabini Ave.", time: "48 min ago", status: "Ongoing", official: true },
  { icon: Zap, tone: "bg-[#f2e9fa] text-[#704b87]", level: "Power", title: "Brief power fluctuation reported", body: "Several residents reported a short fluctuation. No active outage is shown by the provider.", place: "Mahogany & Yakal St.", time: "2 hr ago", status: "Monitoring", official: false },
];

export default function AlertsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Live neighborhood status" title="Alerts & outage reports" description="Verified advisories and resident reports near Brgy. Maligaya." action={<ComposerDialog type="alert"><Button><Plus className="size-4" /> Report issue</Button></ComposerDialog>} />
      <Card className="mb-6 overflow-hidden bg-[#0f172a] text-white">
        <CardContent className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div className="flex gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#dff1e6]"><ShieldCheck className="size-6 text-[#287054]" /></span><div><div className="flex items-center gap-2"><h2 className="font-[family-name:var(--font-display)] text-lg font-bold">No emergency alerts</h2><span className="size-2 animate-pulse rounded-full bg-[#48be7d]" /></div><p className="mt-1 text-sm text-white/55">Your area is currently safe. Three service advisories are active.</p></div></div><Button variant="secondary"><MapPin className="size-4" /> View alert map</Button></CardContent>
      </Card>
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["3","Active","text-[#b96b18]"],["1","Resolved today","text-[#287054]"],["2","Official","text-[#365d74]"],["1","Resident report","text-[#704b87]"]].map(([value,label,color]) => <Card key={label}><CardContent className="p-4"><p className={`text-2xl font-extrabold ${color}`}>{value}</p><p className="mt-1 text-xs font-semibold text-[#77838a]">{label}</p></CardContent></Card>)}
      </div>
      <Tabs defaultValue="active">
        <div className="flex items-center justify-between"><TabsList><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="resolved">Resolved</TabsTrigger></TabsList><Button variant="outline" size="sm"><Filter className="size-4" /> All types</Button></div>
        <TabsContent value="active" className="space-y-4">
          {alerts.map(({ icon: Icon, tone, level, title, body, place, time, status, official }) => <Card key={title}><CardContent className="p-5"><div className="flex gap-4"><span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon className="size-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{level}</Badge>{official && <Badge variant="success"><CheckCircle2 className="mr-1 size-3" /> Official source</Badge>}<span className="ml-auto flex items-center gap-1 text-xs text-[#879299]"><Clock3 className="size-3" />{time}</span></div><h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#65737b]">{body}</p><div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3"><span className="flex items-center gap-1.5 text-xs font-semibold text-[#64727a]"><MapPin className="size-3.5 text-[#f97316]" />{place}</span><Badge variant="secondary"><Radio className="mr-1 size-3" />{status}</Badge></div></div></div></CardContent></Card>)}
        </TabsContent>
        <TabsContent value="resolved"><Card><CardContent className="flex flex-col items-center py-14 text-center"><CheckCircle2 className="size-10 text-[#36a66c]" /><h3 className="mt-3 font-bold">Power restored on Acacia Street</h3><p className="mt-1 text-sm text-[#77838a]">Resolved today at 9:14 AM</p></CardContent></Card></TabsContent>
      </Tabs>
      <Card className="mt-6 border-[#f0d9d4] bg-[#fff8f6]"><CardContent className="flex gap-3 p-4"><AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#c44834]" /><p className="text-xs leading-5 text-[#795d57]"><strong>For emergencies, call 911.</strong> Community reports help inform neighbors but do not replace emergency services or official hotlines.</p></CardContent></Card>
    </div>
  );
}
