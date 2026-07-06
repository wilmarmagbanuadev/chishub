import { Heart, MapPin, Plus, Search, SlidersHorizontal, Star } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  { title: "Solid narra side table", price: "₱2,800", seller: "Ramon G.", area: "0.4 km away", color: "from-amber-100 to-orange-200", emoji: "🪑", tag: "Home" },
  { title: "Fresh weekend produce box", price: "₱450", seller: "Maligaya Growers", area: "0.8 km away", color: "from-green-100 to-emerald-200", emoji: "🥬", tag: "Food" },
  { title: "Vintage film camera", price: "₱4,200", seller: "Nico T.", area: "1.2 km away", color: "from-slate-200 to-blue-200", emoji: "📷", tag: "Electronics" },
  { title: "Home-baked ube ensaymada", price: "₱320 / box", seller: "Tita Nena’s", area: "0.3 km away", color: "from-violet-100 to-fuchsia-200", emoji: "🧁", tag: "Food" },
  { title: "Indoor plant starter set", price: "₱650", seller: "Ana R.", area: "0.6 km away", color: "from-lime-100 to-green-200", emoji: "🪴", tag: "Garden" },
  { title: "Weekend math tutoring", price: "₱300 / hour", seller: "Teacher Liza", area: "1.0 km away", color: "from-sky-100 to-indigo-200", emoji: "📚", tag: "Services" },
];

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader eyebrow="Buy & sell nearby" title="Community marketplace" description="Useful finds, trusted services, and local businesses—right around the corner." action={<Button><Plus className="size-4" /> Create listing</Button>} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input className="h-12 w-full rounded-2xl border bg-white pl-11 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" placeholder="Search items, services, or sellers" /></div><Button variant="outline" className="h-12"><SlidersHorizontal className="size-4" /> Filters</Button></div>
      <div className="scrollbar-none mb-7 flex gap-2 overflow-x-auto">{["For you","Home","Food","Electronics","Garden","Services","Free"].map((category,index) => <button key={category} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${index === 0 ? "bg-slate-900 text-white" : "border bg-white text-slate-500 hover:border-orange-300"}`}>{category}</button>)}</div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">{items.map((item) => <Card key={item.title} className="group overflow-hidden border-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${item.color}`}><span className="text-6xl transition duration-300 group-hover:scale-110 sm:text-7xl">{item.emoji}</span><button className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/80 text-slate-500 backdrop-blur hover:text-red-500"><Heart className="size-4" /></button><Badge className="absolute bottom-3 left-3 bg-white/85 text-slate-700 backdrop-blur">{item.tag}</Badge></div><CardContent className="p-4"><p className="text-base font-extrabold sm:text-lg">{item.price}</p><h3 className="mt-1 truncate text-sm font-bold">{item.title}</h3><div className="mt-3 flex items-center gap-1 text-[10px] text-slate-500"><Star className="size-3 fill-amber-400 text-amber-400" /> 4.9 · {item.seller}</div><p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400"><MapPin className="size-3" />{item.area}</p></CardContent></Card>)}</div>
    </div>
  );
}
