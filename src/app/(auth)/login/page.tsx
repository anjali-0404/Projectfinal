'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="glass p-8 rounded-3xl border border-card-border shadow-2xl space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
                <p className="text-secondary text-sm">Enter your credentials to access your dashboard</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-secondary ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full pl-12 pr-4 py-3 bg-card/50 border border-card-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                        <label className="text-xs font-black uppercase tracking-widest text-secondary">Password</label>
                        <Link href="/forgot-password" title="Click to reset password" className="text-[10px] font-black uppercase tracking-tighter text-secondary hover:text-primary transition-colors">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-3 bg-card/50 border border-card-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
                        />
                    </div>
                </div>
            </div>

            <Link
                href="/dashboard"
                className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 group"
            >
                Sign In to CodeTrust <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-card-border"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black">
                    <span className="bg-[#0F172A] px-4 text-secondary tracking-widest leading-none py-1">Or continue with</span>
                </div>
            </div>

            <button className="w-full py-3 glass border border-card-border hover:bg-card rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm">
                <Github className="w-5 h-5" /> GitHub Enterprise
            </button>

            <p className="text-center text-sm text-secondary">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                    Create Account
                </Link>
            </p>
        </div>
    );
}
