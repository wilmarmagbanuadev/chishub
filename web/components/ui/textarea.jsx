import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn("flex min-h-24 w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm outline-none placeholder:text-[#94a3b8] focus:border-[#f97316] focus:ring-4 focus:ring-[#f9731615]", className)}
      {...props}
    />
  );
}
