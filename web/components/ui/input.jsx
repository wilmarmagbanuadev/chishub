import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn("flex h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none placeholder:text-[#94a3b8] focus:border-[#f97316] focus:ring-4 focus:ring-[#f9731615]", className)}
      {...props}
    />
  );
}
