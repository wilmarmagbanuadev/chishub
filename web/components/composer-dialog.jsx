"use client";

import { useState } from "react";
import { CheckCircle2, ImagePlus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ComposerDialog({ type = "update", children }) {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const isAlert = type === "alert";
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAlert ? "Report an issue" : "Share with the community"}</DialogTitle>
          <DialogDescription>{isAlert ? "Help neighbors stay informed. Add clear, verified details." : "Post an announcement, request, event, or local win."}</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setOpen(false); setShowToast(true); window.setTimeout(() => setShowToast(false), 2800); }}>
          <Input placeholder={isAlert ? "What happened?" : "Post title"} required />
          <Textarea placeholder={isAlert ? "Include location, time, and what neighbors should know..." : "What would you like your neighbors to know?"} required />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm"><MapPin className="size-4" /> Add location</Button>
            <Button type="button" variant="outline" size="sm"><ImagePlus className="size-4" /> Add photo</Button>
          </div>
          <Button className="w-full" type="submit">{isAlert ? "Submit report" : "Publish post"}</Button>
        </form>
      </DialogContent>
    </Dialog>
    {showToast && <div className="fixed bottom-24 right-4 z-[70] flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-2xl sm:bottom-6"><CheckCircle2 className="size-5 text-green-500" />{isAlert ? "Report submitted for review" : "Your post is now live"}</div>}
    </>
  );
}
