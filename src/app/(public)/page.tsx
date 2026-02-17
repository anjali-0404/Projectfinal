'use client';

import { Shield, Zap, Lock, Code, Cpu, Globe, ArrowRight, ChevronRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-card-border px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">CodeTrust <span className="gradient-text">AI</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
                    <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                    <a href="#security" className="hover:text-foreground transition-colors">Security</a>
                    <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
                    <Link href="/dashboard" className="px-5 py-2 bg-foreground text-background rounded-full hover:bg-gray-200 transition-colors">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-8 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full"></div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 text-center md:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest"
                        >
                            <Zap className="w-3 h-3" /> Now in Private Beta
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold leading-[1.1]"
                        >
                            Trust & Verify <br />
                            <span className="gradient-text">AI-Generated Code</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-secondary max-w-xl leading-relaxed"
                        >
                            Stop guessing if your LLM-generated code is safe.
                            CodeTrust AI uses deep neural analysis to detect vulnerabilities,
                            hallucinations, and logic flaws before they hit production.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4"
                        >
                            <Link
                                href="/dashboard"
                                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20"
                            >
                                Analyze Code <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button
                                className="w-full sm:w-auto px-8 py-4 glass border border-card-border hover:bg-card text-foreground rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                <PlayCircle className="w-5 h-5" /> View Demo
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex-1 relative"
                    >
                        {/* 3D Visual Simulation */}
                        <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute inset-0 border border-card-border rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-10 border border-primary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative glass p-8 rounded-3xl border border-primary/40 shadow-2xl shadow-primary/20 bg-background/50 backdrop-blur-xl">
                                    <Shield className="w-32 h-32 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-safe rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                                        <Lock className="w-6 h-6 text-background" />
                                    </div>
                                    <div className="absolute -bottom-6 -left-6 px-4 py-2 glass rounded-lg border border-card-border text-[10px] font-mono whitespace-nowrap">
                                        Vulnerability Scan: 100% Secure
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                <div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-primary/40"
                                    style={{
                                        transform: `rotate(${deg}deg) translate(220px)`,
                                    }}
                                ></div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 px-8 bg-card/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Enterprise-Grade AI Security</h2>
                        <p className="text-secondary max-w-2xl mx-auto">Built for high-velocity engineering teams integrating LLMs into their core workflows.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Cpu, title: 'AI-Aware Detection', text: 'Trained on millions of LLM-generated code patterns to catch subtle logic flaws standard linters miss.' },
                            { icon: Globe, title: 'Hallucination Discovery', text: 'Identify fake libraries, non-existent API calls, and insecure default configurations in AI code.' },
                            { icon: Code, title: 'Real-time Risk Scoring', text: 'Get instant feedback on your code quality with our 0-10 risk meter and OWASP mapping.' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="glass p-8 rounded-2xl border border-card-border hover:border-primary/50 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-secondary leading-relaxed">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-card-border">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
                        <Shield className="w-6 h-6 text-primary" />
                        <span className="font-bold">CodeTrust AI</span>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-secondary">
                        <a href="#" className="hover:text-foreground">Documentation</a>
                        <a href="#" className="hover:text-foreground">GitHub</a>
                        <a href="#" className="hover:text-foreground">Discord</a>
                        <a href="#" className="hover:text-foreground">Privacy Policy</a>
                    </div>
                    <p className="text-xs text-secondary">© 2024 CodeTrust AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
