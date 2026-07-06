"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, MapPin, ShieldCheck, UserRound } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_.8fr]">
      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-lg">
          <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> Back to ChisHub</Link>
          <Logo />
          <div className="mt-10 flex gap-2">{[1,2,3].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-orange-500" : "bg-slate-200"}`} />)}</div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-orange-500">Step {step} of 3</p>
          {step === 1 && <div className="mt-3"><h1 className="text-3xl font-extrabold tracking-tight">Let’s get to know you.</h1><p className="mt-2 text-sm text-slate-500">Use the name your neighbors know you by.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><Input placeholder="First name" /><Input placeholder="Last name" /><Input type="email" placeholder="Email address" className="sm:col-span-2" /><Input type="password" placeholder="Create password" className="sm:col-span-2" /></div></div>}
          {step === 2 && <div className="mt-3"><h1 className="text-3xl font-extrabold tracking-tight">Find your community.</h1><p className="mt-2 text-sm text-slate-500">Your location personalizes alerts and local stories.</p><div className="mt-7 space-y-4"><div className="relative"><MapPin className="absolute left-4 top-4 size-4 text-slate-400" /><Input placeholder="Search city or barangay" className="pl-11" /></div><button className="w-full rounded-[24px] border-2 border-orange-500 bg-orange-50 p-5 text-left"><p className="font-bold">Brgy. Maligaya</p><p className="mt-1 text-xs text-slate-500">Quezon City · 2,430 residents</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-orange-600"><Check className="size-3.5" /> Selected</span></button></div></div>}
          {step === 3 && <div className="mt-3"><h1 className="text-3xl font-extrabold tracking-tight">Choose what matters.</h1><p className="mt-2 text-sm text-slate-500">You can change these preferences anytime.</p><div className="mt-7 grid grid-cols-2 gap-3">{["Power outages","Internet updates","Water notices","Emergency alerts","Local news","Events"].map((item,index) => <button key={item} className={`rounded-2xl border p-4 text-left text-sm font-bold ${index < 4 ? "border-orange-300 bg-orange-50 text-orange-700" : "bg-white text-slate-600"}`}>{item}{index < 4 && <Check className="mt-3 size-4" />}</button>)}</div></div>}
          <div className="mt-8 flex gap-3">{step > 1 && <Button variant="outline" size="lg" onClick={() => setStep(step - 1)}>Back</Button>}<Button size="lg" className="flex-1" onClick={() => step < 3 ? setStep(step + 1) : window.location.assign("/dashboard")}>{step === 3 ? "Create my account" : "Continue"} <ArrowRight className="size-4" /></Button></div>
          <p className="mt-6 text-center text-sm text-slate-500">Already a member? <Link href="/login" className="font-bold text-orange-600">Sign in</Link></p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between"><div className="absolute -right-20 -top-20 size-80 rounded-full bg-orange-500/20 blur-3xl" /><p className="relative text-sm font-semibold text-orange-300">A safer, smarter community starts here.</p><div className="relative"><h2 className="max-w-md text-4xl font-extrabold leading-tight">The updates you need. The people you trust.</h2><div className="mt-8 space-y-4">{[[MapPin,"Location-aware information"],[ShieldCheck,"Verified official sources"],[UserRound,"Privacy controls that make sense"]].map(([Icon,text]) => <div key={text} className="flex items-center gap-3 text-sm text-slate-300"><span className="flex size-10 items-center justify-center rounded-2xl bg-white/10"><Icon className="size-5 text-orange-400" /></span>{text}</div>)}</div></div><p className="relative text-xs text-slate-500">By joining, you agree to our Terms and Community Guidelines.</p></section>
    </main>
  );
}
