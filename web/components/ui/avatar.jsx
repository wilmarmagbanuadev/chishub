import { cn } from "@/lib/utils";

export function Avatar({ initials, className, tone = "coral", online = false }) {
  const tones = {
    coral: "bg-[#f6c7bc] text-[#842f24]",
    gold: "bg-[#ffe4a1] text-[#805d12]",
    blue: "bg-[#cbe0ed] text-[#274f68]",
    green: "bg-[#cde8d6] text-[#285c3c]",
    violet: "bg-[#e1d4ed] text-[#624278]",
  };
  return (
    <span className={cn("relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold", tones[tone], className)}>
      {initials}
      {online && <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-[#34a853]" />}
    </span>
  );
}
