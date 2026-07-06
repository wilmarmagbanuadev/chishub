import { Bookmark, Eye, Flame, MessageSquare, Plus, Search, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const threads = [
  { title: "What should we prioritize in next month’s barangay assembly?", excerpt: "I’d love to hear everyone’s thoughts before we consolidate our agenda...", author: "Elena Bautista", initials: "EB", tone: "green", topic: "Barangay matters", replies: 36, views: 184, time: "8 min ago", hot: true },
  { title: "Best internet provider in the Mahogany Street area?", excerpt: "We both work from home and our current connection has been unreliable lately.", author: "Nico Tan", initials: "NT", tone: "blue", topic: "Recommendations", replies: 24, views: 211, time: "35 min ago" },
  { title: "Carpool for students going to Quezon City Science High?", excerpt: "Looking to organize a weekday morning and afternoon carpool rotation.", author: "Liza Domingo", initials: "LD", tone: "violet", topic: "Parenting", replies: 11, views: 92, time: "2 hr ago" },
  { title: "Share your flood preparation tips and checklist", excerpt: "Rainy season is here. Let’s make one useful list for families new to the area.", author: "Ramon Garcia", initials: "RG", tone: "gold", topic: "Safety", replies: 42, views: 328, time: "Yesterday", hot: true },
];

export default function ThreadsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Neighbor conversations" title="Threads & discussions" description="Ask questions, trade local knowledge, and shape your community together." action={<Button><Plus className="size-4" /> Start a thread</Button>} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Tabs defaultValue="popular">
          <div className="flex items-center justify-between gap-3"><TabsList><TabsTrigger value="popular">Popular</TabsTrigger><TabsTrigger value="new">Newest</TabsTrigger><TabsTrigger value="unanswered">Unanswered</TabsTrigger></TabsList></div>
          <TabsContent value="popular" className="space-y-3">
            {threads.map((thread) => <Card key={thread.title} className="group hover:border-[#d4d8d2] hover:shadow-md"><CardContent className="p-5"><div className="flex gap-4"><Avatar initials={thread.initials} tone={thread.tone} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><Badge variant="outline">{thread.topic}</Badge>{thread.hot && <span className="flex items-center gap-1 text-xs font-bold text-[#f97316]"><Flame className="size-3.5" /> Trending</span>}<Button variant="ghost" size="icon" className="ml-auto size-8"><Bookmark className="size-4" /></Button></div><h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-snug group-hover:text-[#d94e36]">{thread.title}</h3><p className="mt-1 line-clamp-2 text-sm text-[#64748b]">{thread.excerpt}</p><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#829097]"><span><strong className="text-[#52616b]">{thread.author}</strong> · {thread.time}</span><span className="ml-auto flex items-center gap-1"><MessageSquare className="size-3.5" /> {thread.replies}</span><span className="flex items-center gap-1"><Eye className="size-3.5" /> {thread.views}</span></div></div></div></CardContent></Card>)}
          </TabsContent>
          <TabsContent value="new" className="space-y-3">{threads.slice().reverse().map((thread) => <Card key={thread.title}><CardContent className="p-5"><h3 className="font-bold">{thread.title}</h3><p className="mt-2 text-sm text-[#64748b]">{thread.author} · {thread.time}</p></CardContent></Card>)}</TabsContent>
          <TabsContent value="unanswered"><Card><CardContent className="py-14 text-center"><MessageSquare className="mx-auto size-9 text-[#a9b1b5]" /><p className="mt-3 font-bold">Everyone got an answer today!</p></CardContent></Card></TabsContent>
        </Tabs>
        <aside className="space-y-5">
          <Card><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#879299]" /><input className="h-10 w-full rounded-xl bg-[#f2f3ef] pl-9 pr-3 text-sm outline-none" placeholder="Search discussions" /></div></CardContent></Card>
          <Card><CardContent className="p-5"><div className="flex items-center gap-2"><TrendingUp className="size-5 text-[#f97316]" /><h3 className="font-bold">Trending topics</h3></div><div className="mt-4 space-y-3">{[["#rainy-season","86 posts"],["#barangay-assembly","54 posts"],["#local-recos","41 posts"],["#school-opening","28 posts"]].map(([topic,count], index) => <div key={topic} className="flex items-center gap-3"><span className="text-xs font-bold text-[#aab2b6]">0{index+1}</span><div><p className="text-sm font-bold">{topic}</p><p className="text-[11px] text-[#879299]">{count}</p></div></div>)}</div></CardContent></Card>
          <Card className="bg-[#eaf3f0]"><CardContent className="p-5"><h3 className="font-bold">Keep it constructive</h3><p className="mt-2 text-xs leading-5 text-[#5f716b]">Assume good intent, disagree with ideas—not people—and keep personal information private.</p></CardContent></Card>
        </aside>
      </div>
    </div>
  );
}
