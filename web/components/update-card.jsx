import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UpdateCard({ author, initials, role, time, title, body, category, likes, comments, tone = "coral", featured = false }) {
  return (
    <Card className="overflow-hidden">
      {featured && <div className="h-1 bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#36947d]" />}
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <Avatar initials={initials} tone={tone} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-sm font-bold">{author} <span className="font-normal text-[#7b878d]">· {time}</span></p><p className="text-xs text-[#7b878d]">{role}</p></div>
              <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
            </div>
            <Badge variant="secondary" className="mt-4">{category}</Badge>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-snug">{title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-[#5f6e76]">{body}</p>
            <div className="mt-4 flex items-center gap-1 border-t pt-3">
              <Button variant="ghost" size="sm" className="text-[#6c7980]"><Heart className="size-4" /> {likes}</Button>
              <Button variant="ghost" size="sm" className="text-[#6c7980]"><MessageCircle className="size-4" /> {comments}</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
