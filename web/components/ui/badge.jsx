import { cn } from "@/lib/utils";

const styles = {
  default: "bg-[#0f172a] text-white",
  secondary: "bg-[#fff2cd] text-[#8b6511]",
  success: "bg-[#dff3e7] text-[#237247]",
  danger: "bg-[#fee4e1] text-[#a43a30]",
  outline: "border bg-white text-[#52616b]",
  coral: "bg-[#fbe7e2] text-[#b43e2d]",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold leading-none", styles[variant], className)}
      {...props}
    />
  );
}
