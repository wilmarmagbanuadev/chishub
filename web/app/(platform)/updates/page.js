import { Bookmark, CalendarDays, Filter, Megaphone, Plus, Search } from "lucide-react";
import { ComposerDialog } from "@/components/composer-dialog";
import { PageHeader } from "@/components/page-header";
import { UpdateCard } from "@/components/update-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const posts = [
  { author: "Marisol Cruz", initials: "MC", tone: "blue", role: "Community volunteer", time: "1h", category: "Community event", title: "Weekend coastal clean-up — volunteers welcome!", body: "We’re meeting by the covered court at 6 AM this Saturday. Gloves, sacks, and a hearty breakfast are on us. Bring a friend!", likes: "48", comments: "12", featured: true },
  { author: "Brgy. Maligaya Council", initials: "BM", tone: "green", role: "Verified barangay office", time: "3h", category: "Official update", title: "Free health screening this Wednesday", body: "Blood pressure, blood sugar, and basic consultations will be available at the barangay hall from 8 AM to 2 PM.", likes: "31", comments: "8" },
  { author: "Paolo Santos", initials: "PS", tone: "gold", role: "Mahogany Street", time: "5h", category: "Recommendation", title: "Affordable appliance repair nearby?", body: "Our electric fan gave up after many loyal years. Looking for a trusted repair shop that does home visits. Salamat!", likes: "7", comments: "19" },
  { author: "Tita Nena’s Kitchen", initials: "TN", tone: "violet", role: "Local business · Verified", time: "Yesterday", category: "Local business", title: "Freshly baked pan de coco for tomorrow morning", body: "Pre-orders are open until 8 PM tonight. Free delivery for 6 pieces or more within the barangay.", likes: "62", comments: "24" },
];

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Community feed" title="What’s happening nearby" description="Updates, events, recommendations, and small wins from your neighbors." action={<ComposerDialog><Button><Plus className="size-4" /> New post</Button></ComposerDialog>} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <Tabs defaultValue="latest">
            <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1"><TabsList><TabsTrigger value="latest">Latest</TabsTrigger><TabsTrigger value="official">Official</TabsTrigger><TabsTrigger value="events">Events</TabsTrigger></TabsList><Button variant="outline" size="sm"><Filter className="size-4" /> Filter</Button></div>
            <TabsContent value="latest" className="space-y-4">{posts.map((post) => <UpdateCard key={post.title} {...post} />)}</TabsContent>
            <TabsContent value="official" className="space-y-4"><UpdateCard {...posts[1]} /></TabsContent>
            <TabsContent value="events" className="space-y-4"><UpdateCard {...posts[0]} /></TabsContent>
          </Tabs>
        </div>
        <aside className="space-y-5">
          <Card><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#879299]" /><input className="h-10 w-full rounded-xl bg-[#f2f3ef] pl-9 pr-3 text-sm outline-none" placeholder="Search updates" /></div></CardContent></Card>
          <Card><CardContent className="p-5"><h3 className="font-bold">Browse topics</h3><div className="mt-3 flex flex-wrap gap-2">{["Announcements", "Events", "For sale", "Recommendations", "Volunteer", "Lost & found"].map((topic) => <button key={topic} className="rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-[#65737b] hover:border-[#f97316] hover:text-[#f97316]">{topic}</button>)}</div></CardContent></Card>
          <Card className="bg-[#fff9e9]"><CardContent className="p-5"><Megaphone className="size-6 text-[#d29520]" /><h3 className="mt-3 font-bold">Community guidelines</h3><p className="mt-1 text-xs leading-5 text-[#756d5e]">Be helpful, stay respectful, and protect your neighbors’ privacy.</p><Button variant="ghost" size="sm" className="mt-2 px-0 text-[#a37011]">Read guidelines</Button></CardContent></Card>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1"><Button variant="outline" className="justify-start"><Bookmark className="size-4" /> Saved posts</Button><Button variant="outline" className="justify-start"><CalendarDays className="size-4" /> Events calendar</Button></div>
        </aside>
      </div>
    </div>
  );
}
