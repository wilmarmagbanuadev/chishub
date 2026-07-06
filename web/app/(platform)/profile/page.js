import { Award, CalendarDays, Camera, CheckCircle2, Edit3, Heart, MapPin, MessageCircle, ShieldCheck, Star, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Your community identity" title="My profile" description="Manage what your neighbors see and revisit your community activity." />
      <Card className="overflow-hidden">
        <div className="relative h-36 bg-[#0f172a] dot-grid"><div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-transparent to-[#f97316]/30" /><Button variant="outline" size="sm" className="absolute right-4 top-4 border-white/15 bg-white/10 text-white hover:bg-white/20"><Camera className="size-4" /> Change cover</Button></div>
        <CardContent className="relative p-5 pt-0 sm:px-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-5">
            <Avatar initials="AR" className="-mt-12 size-24 border-4 border-white text-2xl shadow-md" />
            <div className="mt-3 flex-1 sm:mb-1"><div className="flex items-center gap-2"><h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Ana Reyes</h2><CheckCircle2 className="size-5 fill-[#337ca3] text-white" /></div><p className="mt-1 flex items-center gap-1.5 text-sm text-[#68767e]"><MapPin className="size-4" /> Mahogany Street · Brgy. Maligaya</p></div>
            <Button variant="outline" className="mt-4 sm:mb-1"><Edit3 className="size-4" /> Edit profile</Button>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5f6e76]">Plant mom, weekend baker, and your friendly neighborhood architect. Happy to help with community events and urban gardening. 🌱</p>
          <div className="mt-5 flex flex-wrap gap-2"><Badge variant="success"><ShieldCheck className="mr-1 size-3" /> Verified resident</Badge><Badge variant="secondary"><Award className="mr-1 size-3" /> Helpful neighbor</Badge><Badge variant="outline">Member since 2023</Badge></div>
        </CardContent>
      </Card>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Tabs defaultValue="posts">
          <TabsList><TabsTrigger value="posts">Posts</TabsTrigger><TabsTrigger value="replies">Replies</TabsTrigger><TabsTrigger value="saved">Saved</TabsTrigger></TabsList>
          <TabsContent value="posts" className="space-y-4">
            {[["Looking for native tree seedlings","We’re adding more shade along Mahogany Street. Does anyone know a local nursery with narra or banaba seedlings?","14","9"],["Thank you to our weekend volunteers!","What a morning! Together we collected 23 sacks of litter and made three new friends along the way.","67","16"]].map(([title,body,likes,comments]) => <Card key={title}><CardContent className="p-5"><div className="flex items-center gap-3"><Avatar initials="AR" className="size-9" /><div><p className="text-sm font-bold">Ana Reyes</p><p className="text-xs text-[#879299]">Brgy. Maligaya · 4 days ago</p></div></div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#68767e]">{body}</p><div className="mt-4 flex gap-4 border-t pt-3 text-xs font-semibold text-[#77838a]"><span className="flex items-center gap-1"><Heart className="size-4" />{likes}</span><span className="flex items-center gap-1"><MessageCircle className="size-4" />{comments}</span></div></CardContent></Card>)}
          </TabsContent>
          <TabsContent value="replies"><Card><CardContent className="py-12 text-center text-sm text-[#77838a]">Your recent replies will appear here.</CardContent></Card></TabsContent>
          <TabsContent value="saved"><Card><CardContent className="py-12 text-center text-sm text-[#77838a]">Your saved posts will appear here.</CardContent></Card></TabsContent>
        </Tabs>
        <aside className="space-y-5">
          <Card><CardHeader><CardTitle className="text-base">Community impact</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-3">{[["38","Posts",MessageCircle],["246","Thanks",Heart],["12","Events",CalendarDays],["8","Badges",Star]].map(([value,label,Icon]) => <div key={label} className="rounded-xl bg-[#f4f5f1] p-3"><Icon className="size-4 text-[#f97316]" /><p className="mt-2 text-xl font-extrabold">{value}</p><p className="text-[11px] text-[#77838a]">{label}</p></div>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-base">Neighborhood circles</CardTitle></CardHeader><CardContent className="space-y-3">{["Urban gardeners","Clean-up volunteers","Mahogany Street watch"].map((circle,index) => <div key={circle} className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-[#e7efeb]"><Users className="size-4 text-[#3d725d]" /></span><div><p className="text-sm font-bold">{circle}</p><p className="text-[11px] text-[#879299]">{14 + index * 11} members</p></div></div>)}</CardContent></Card>
        </aside>
      </div>
    </div>
  );
}
