'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        // Mock login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    };

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

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-3 glass border border-card-border hover:bg-card rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm group"
                >
                    <Github className="w-5 h-5" /> GitHub
                </button>
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full py-3 glass border border-card-border hover:bg-card rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-sm group disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                    )}
                    {isLoading ? 'Loading...' : 'Google'}
                </button>
            </div>

            <p className="text-center text-sm text-secondary">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-primary font-bold hover:underline">
                    Create Account
                </Link>
            </p>
        </div>
    );
}
