import Link from "next/link";

export function Logo({ compact = false, light = false }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fb923c] to-[#f97316] text-lg font-black text-white shadow-[0_8px_20px_-8px_rgba(249,115,22,.8)]">C</span>
      {!compact && <span className={`font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-[#0f172a]"}`}>Chis<span className="text-[#f97316]">Hub</span></span>}
    </Link>
  );
}
