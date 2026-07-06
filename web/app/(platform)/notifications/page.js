import { Bell, CheckCheck, MessageCircle, ShieldAlert, Wifi } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const notices = [
  { icon: Wifi, title: "Internet service update", body: "Repair crews are now on site along Molave Street. Estimated restoration is 3:30 PM.", time: "2 minutes ago", tone: "bg-blue-50 text-blue-500", unread: true },
  { icon: ShieldAlert, title: "Heavy rainfall advisory", body: "Moderate to heavy rainfall is expected after 5 PM. Monitor low-lying areas.", time: "18 minutes ago", tone: "bg-amber-50 text-amber-600", unread: true },
  { icon: MessageCircle, title: "Liza replied to your discussion", body: "“I can help coordinate the Tuesday schedule.”", time: "1 hour ago", tone: "bg-orange-50 text-orange-500" },
  { icon: Bell, title: "New barangay announcement", body: "The free health screening schedule has been posted.", time: "3 hours ago", tone: "bg-green-50 text-green-600" },
];

export default function NotificationsPage() {
  return <div className="mx-auto max-w-4xl"><PageHeader eyebrow="Your activity" title="Notifications" description="Alerts, replies, announcements, and updates you follow." action={<Button variant="outline"><CheckCheck className="size-4" /> Mark all read</Button>} /><div className="space-y-3">{notices.map(({icon:Icon,title,body,time,tone,unread}) => <Card key={title} className={unread ? "border-orange-200" : ""}><CardContent className="flex gap-4 p-5"><span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${tone}`}><Icon className="size-5" /></span><div className="flex-1"><div className="flex items-start gap-3"><h3 className="text-sm font-bold">{title}</h3>{unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-orange-500" />}<span className="ml-auto shrink-0 text-[10px] text-slate-400">{time}</span></div><p className="mt-1 text-sm leading-6 text-slate-500">{body}</p></div></CardContent></Card>)}</div></div>;
}
