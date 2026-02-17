'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div className="glass p-8 rounded-3xl border border-card-border shadow-2xl space-y-8">
            {!isSubmitted ? (
                <>
                    <div className="text-center space-y-2">
                        <Link href="/login" className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-4">
                            <ChevronLeft className="w-3 h-3" /> Back to Login
                        </Link>
                        <h1 className="text-3xl font-extrabold tracking-tight">Reset Password</h1>
                        <p className="text-secondary text-sm">We&apos;ll send you a secure link to reset your password</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Recovery Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3 bg-card/50 border border-card-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsSubmitted(true)}
                        className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 group"
                    >
                        Send Reset Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <p className="text-[10px] text-secondary text-center leading-relaxed">
                            <span className="text-primary font-bold">Note:</span> For security reasons, we cannot confirm if this email is registered. If it is, you will receive instructions shortly.
                        </p>
                    </div>
                </>
            ) : (
                <div className="text-center space-y-6 py-4">
                    <div className="w-20 h-20 bg-safe/10 rounded-full flex items-center justify-center mx-auto border border-safe/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <ShieldCheck className="w-10 h-10 text-safe" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold tracking-tight">Check Your Inbox</h2>
                        <p className="text-secondary text-sm px-4">
                            We have sent a secure recovery link to your email address. Please follow the instructions to reset your password.
                        </p>
                    </div>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-card hover:bg-card-border text-foreground border border-card-border rounded-xl font-bold transition-all text-sm"
                    >
                        Return to Login
                    </Link>
                    <p className="text-[10px] text-secondary uppercase font-black tracking-widest">
                        Didn&apos;t receive it? <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">Try Again</button>
                    </p>
                </div>
            )}
        </div>
    );
}
