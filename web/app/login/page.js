import Link from "next/link";
import { ArrowLeft, Eye, LockKeyhole, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[.9fr_1.1fr]">
      <section className="flex items-center justify-center bg-white px-5 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#68767e] hover:text-[#0f172a]"><ArrowLeft className="size-4" /> Back to home</Link>
          <Logo />
          <div className="mt-10"><h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight">Welcome back, kapitbahay.</h1><p className="mt-2 text-sm text-[#68767e]">Sign in to see what’s happening in your community.</p></div>
          <form className="mt-8 space-y-5">
            <label className="block"><span className="mb-2 block text-sm font-bold">Email address</span><div className="relative"><Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#849097]" /><Input type="email" placeholder="ana@email.com" className="pl-10" /></div></label>
            <label className="block"><div className="mb-2 flex items-center justify-between"><span className="text-sm font-bold">Password</span><a className="text-xs font-bold text-[#f97316]" href="#">Forgot password?</a></div><div className="relative"><LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#849097]" /><Input type="password" placeholder="Enter your password" className="pl-10 pr-10" /><Eye className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#849097]" /></div></label>
            <Button className="w-full" size="lg" asChild><Link href="/dashboard">Sign in</Link></Button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-[#94a0a7]"><span className="h-px flex-1 bg-[#e3e5df]" />OR CONTINUE WITH<span className="h-px flex-1 bg-[#e3e5df]" /></div>
          <Button variant="outline" size="lg" className="w-full"><span className="font-black text-[#4285f4]">G</span> Google</Button>
          <p className="mt-7 text-center text-sm text-[#68767e]">New to ChisHub? <a href="#" className="font-bold text-[#f97316]">Create an account</a></p>
        </div>
      </section>
      <section className="dot-grid relative hidden overflow-hidden bg-[#0f172a] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute right-[-120px] top-[-120px] size-96 rounded-full border-[70px] border-[#f97316]/20" />
        <div className="relative flex items-center gap-2 text-sm font-semibold text-white/65"><MapPin className="size-4 text-[#fb923c]" /> Serving communities across the Philippines</div>
        <div className="relative mx-auto max-w-lg"><span className="text-6xl font-black text-[#fb923c]">“</span><blockquote className="-mt-5 font-[family-name:var(--font-display)] text-3xl font-bold leading-snug">ChisHub let us know about the outage before work started—and kept everyone updated until the connection returned.</blockquote><div className="mt-7 flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-full bg-[#f97316] font-bold">JL</span><div><p className="font-bold">Josefina Lim</p><p className="text-sm text-white/50">Community leader, Marikina</p></div></div></div>
        <Card className="relative border-white/10 bg-white/5 text-white shadow-none"><CardContent className="flex items-center gap-4 p-5"><span className="flex size-11 items-center justify-center rounded-xl bg-[#dcefe6]"><ShieldCheck className="size-5 text-[#287054]" /></span><div><p className="font-bold">Your privacy matters</p><p className="text-sm text-white/55">We never sell your personal information.</p></div></CardContent></Card>
      </section>
    </main>
  );
}
