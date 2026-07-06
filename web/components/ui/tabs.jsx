"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export function TabsList({ className, ...props }) {
  return <TabsPrimitive.List className={cn("inline-flex rounded-xl bg-[#eceee9] p-1", className)} {...props} />;
}
export function TabsTrigger({ className, ...props }) {
  return <TabsPrimitive.Trigger className={cn("rounded-lg px-4 py-2 text-sm font-semibold text-[#64748b] data-[state=active]:bg-white data-[state=active]:text-[#0f172a] data-[state=active]:shadow-sm", className)} {...props} />;
}
export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn("mt-5 outline-none", className)} {...props} />;
}
