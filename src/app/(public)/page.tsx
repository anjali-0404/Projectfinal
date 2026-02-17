'use client';

import { Shield, Zap, Lock, Code, Cpu, Globe, ArrowRight, ChevronRight, PlayCircle, Chrome } from 'lucide-react';
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
                    <Link href="/login" className="px-5 py-2 bg-foreground text-background rounded-full hover:bg-gray-200 transition-colors">
                        Sign In
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
                                href="/signup"
                                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20"
                            >
                                Get Started Free <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/signup"
                                className="w-full sm:w-auto px-8 py-4 glass border border-card-border hover:bg-card text-foreground rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                <PlayCircle className="w-5 h-5" /> View Demo
                            </Link>
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

            {/* Download Extensions Section */}
            <section id="download" className="py-20 px-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full"></div>
                <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold">Secure Your Pipeline Anywhere</h2>
                        <p className="text-secondary text-lg">Download our extensions to integrate CodeTrust AI directly into your browsing and development workflow.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <a
                            href="https://chromewebstore.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto flex items-center gap-4 px-8 py-6 glass border border-card-border hover:border-primary/50 hover:bg-card transition-all rounded-2xl group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Chrome className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Available on Web Store</p>
                                <p className="text-xl font-bold">Chrome Extension</p>
                            </div>
                        </a>

                        <a
                            href="https://marketplace.visualstudio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto flex items-center gap-4 px-8 py-6 glass border border-card-border hover:border-primary/50 hover:bg-card transition-all rounded-2xl group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-blue-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 9.33-4.12-2.54a1.491 1.491 0 0 0-1.921.22L.21 8.765a1.5 1.5 0 0 0 .22 2.126l4.64 3.73-4.64 3.73a1.5 1.5 0 0 0-.22 2.126l.794 1.254a1.491 1.491 0 0 0 1.921.22l4.12-2.54 9.46 9.33a1.494 1.494 0 0 0 1.705.29l4.94-2.377a1.5 1.5 0 0 0 .866-1.353V3.94a1.5 1.5 0 0 0-.866-1.353zM15 12l-9-5.55V17.55L15 12z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Available on Marketplace</p>
                                <p className="text-xl font-bold">VS Code Extension</p>
                            </div>
                        </a>
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
