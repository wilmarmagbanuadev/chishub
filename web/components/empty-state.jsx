import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", description = "New activity will appear here when it arrives.", action = "Refresh" }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed bg-white px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500"><Icon className="size-6" /></span>
      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      <Button variant="outline" size="sm" className="mt-5">{action}</Button>
    </div>
  );
}
