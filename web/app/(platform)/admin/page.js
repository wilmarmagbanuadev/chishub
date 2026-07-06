import { AlertTriangle, CheckCircle2, Clock3, Download, Eye, FileWarning, MoreHorizontal, Search, ShieldCheck, UserCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reports = [
  { item: "Unverified road closure claim", reporter: "3 neighbors", type: "Misinformation", status: "Needs review", date: "12 min ago" },
  { item: "For-sale post repeated 6 times", reporter: "Auto-detected", type: "Spam", status: "Needs review", date: "1 hr ago" },
  { item: "Personal information in comment", reporter: "M. Cruz", type: "Privacy", status: "Escalated", date: "3 hr ago" },
  { item: "Harassing reply in discussion", reporter: "N. Tan", type: "Conduct", status: "Resolved", date: "Yesterday" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader eyebrow="Community operations" title="Admin console" description="Keep Brgy. Maligaya helpful, safe, and well-informed." action={<Button variant="outline"><Download className="size-4" /> Export report</Button>} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[{label:"Total residents",value:"2,430",note:"+12 this week",icon:Users,tone:"bg-[#e6eff4] text-[#365d74]"}, {label:"Pending verification",value:"18",note:"7 older than 24h",icon:UserCheck,tone:"bg-[#fff1c9] text-[#846016]"}, {label:"Open reports",value:"7",note:"3 high priority",icon:FileWarning,tone:"bg-[#fee7e2] text-[#a53a2c]"}, {label:"Resolution rate",value:"94%",note:"Last 30 days",icon:ShieldCheck,tone:"bg-[#dff1e6] text-[#287054]"}].map(({label,value,note,icon:Icon,tone}) => <Card key={label}><CardContent className="p-4 sm:p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-[#77838a]">{label}</p><p className="mt-2 text-2xl font-extrabold">{value}</p><p className="mt-1 text-[11px] text-[#879299]">{note}</p></div><span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-4" /></span></div></CardContent></Card>)}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <Tabs defaultValue="reports">
            <TabsList><TabsTrigger value="reports">Content reports</TabsTrigger><TabsTrigger value="verification">Verification queue</TabsTrigger><TabsTrigger value="activity">Activity log</TabsTrigger></TabsList>
            <TabsContent value="reports">
              <Card className="overflow-hidden">
                <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Recent reports</h2><p className="text-xs text-[#77838a]">Review flagged community content.</p></div><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#879299]" /><input className="h-9 w-full rounded-lg border pl-9 pr-3 text-sm outline-none sm:w-56" placeholder="Search reports" /></div></div>
                <Table><TableHeader><TableRow><TableHead>Reported item</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Reported</TableHead><TableHead /></TableRow></TableHeader><TableBody>{reports.map((report) => <TableRow key={report.item}><TableCell><p className="max-w-xs truncate font-semibold">{report.item}</p><p className="mt-1 text-xs text-[#879299]">By {report.reporter}</p></TableCell><TableCell><Badge variant="outline">{report.type}</Badge></TableCell><TableCell><Badge variant={report.status === "Resolved" ? "success" : report.status === "Escalated" ? "danger" : "secondary"}>{report.status}</Badge></TableCell><TableCell className="whitespace-nowrap text-xs text-[#77838a]">{report.date}</TableCell><TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></TableCell></TableRow>)}</TableBody></Table>
              </Card>
            </TabsContent>
            <TabsContent value="verification"><Card><CardContent className="space-y-3 p-5">{[["KM","Karina Mendoza","Utility bill submitted"],["JR","Jun Reyes","Barangay ID submitted"],["AS","Alma Soriano","Address verification needed"]].map(([initials,name,note],index) => <div key={name} className="flex items-center gap-3 rounded-xl border p-3"><Avatar initials={initials} tone={index === 1 ? "gold" : "blue"} /><div className="flex-1"><p className="text-sm font-bold">{name}</p><p className="text-xs text-[#77838a]">{note}</p></div><Button size="sm">Review</Button></div>)}</CardContent></Card></TabsContent>
            <TabsContent value="activity"><Card><CardContent className="py-14 text-center"><Clock3 className="mx-auto size-9 text-[#98a2a7]" /><p className="mt-3 font-bold">Admin actions are logged here</p></CardContent></Card></TabsContent>
          </Tabs>
        </div>
        <aside className="space-y-5">
          <Card><CardHeader><CardTitle className="text-base">Moderation health</CardTitle></CardHeader><CardContent><div className="flex items-end gap-2"><span className="text-3xl font-extrabold text-[#287054]">92</span><span className="mb-1 text-sm font-bold text-[#287054]">Excellent</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8ebe6]"><div className="h-full w-[92%] rounded-full bg-[#36a66c]" /></div><p className="mt-3 text-xs leading-5 text-[#77838a]">Most reports are reviewed within 2 hours. Response time improved 18% this month.</p></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base">Priority queue</CardTitle></CardHeader><CardContent className="space-y-3">{[["High","Possible safety misinformation","12 min"],["Medium","Resident privacy concern","3 hr"],["Low","Duplicate business post","5 hr"]].map(([priority,title,time]) => <div key={title} className="rounded-xl bg-[#f5f6f2] p-3"><div className="flex items-center justify-between"><Badge variant={priority === "High" ? "danger" : priority === "Medium" ? "secondary" : "outline"}>{priority}</Badge><span className="text-[10px] text-[#879299]">{time}</span></div><p className="mt-2 text-xs font-bold leading-5">{title}</p></div>)}</CardContent></Card>
          <Card className="bg-[#0f172a] text-white"><CardContent className="p-5"><CheckCircle2 className="size-6 text-[#fb923c]" /><h3 className="mt-3 font-bold">All systems operational</h3><p className="mt-1 text-xs leading-5 text-white/55">Alerts, messaging, and verification services are healthy.</p><Button variant="ghost" size="sm" className="mt-2 px-0 text-[#fb923c] hover:bg-transparent hover:text-white">View system status</Button></CardContent></Card>
        </aside>
      </div>
    </div>
  );
}
