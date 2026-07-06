import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-white shadow-[0_8px_20px_-8px_rgba(249,115,22,.7)] hover:bg-[#ea580c]",
        secondary: "bg-[#fff7ed] text-[#c2410c] hover:bg-[#ffedd5]",
        outline: "border bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafc]",
        ghost: "hover:bg-[#f1f5f9]",
        dark: "bg-[#0f172a] text-white hover:bg-[#1e293b]",
        danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
