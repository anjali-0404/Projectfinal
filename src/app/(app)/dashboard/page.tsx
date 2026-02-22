'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Shield, AlertTriangle, CheckCircle, BarChart3, ArrowUpRight,
    ArrowRight, Play, ExternalLink, Activity, Target, Zap,
    Search, Filter, ArrowUpDown, ChevronRight, CheckCircle2,
    Clock, Download, FileText, Database, ShieldCheck, AlertCircle, Loader2,
    ChevronDown, Code2
} from 'lucide-react';

const LANGUAGES_DATA = {
    python: {
        name: 'Python',
        stats: [
            { label: 'Integrity Score', value: '94.2', desc: '+2.4% from last week', icon: Shield, color: 'primary' },
            { label: 'Active Threats', value: '12', desc: '3 high priority items', icon: AlertTriangle, color: 'vulnerable' },
            { label: 'Fixed Issues', value: '342', desc: 'AI auto-remediated', icon: CheckCircle, color: 'safe' },
            { label: 'Scan Volume', value: '1.2k', desc: 'Across 42 repos', icon: BarChart3, color: 'secondary' },
        ],
        snippet: `def secure_query(user_id):\n    # Using parameterized query\n    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))`
    },
    c: {
        name: 'C',
        stats: [
            { label: 'Integrity Score', value: '88.1', desc: '-1.2% from last week', icon: Shield, color: 'primary' },
            { label: 'Active Threats', value: '28', desc: 'Buffer overflow risks', icon: AlertTriangle, color: 'vulnerable' },
            { label: 'Fixed Issues', value: '156', desc: 'Memory leaks patched', icon: CheckCircle, color: 'safe' },
            { label: 'Scan Volume', value: '0.8k', desc: 'Kernel modules', icon: BarChart3, color: 'secondary' },
        ],
        snippet: `void safe_copy(char *dest, const char *src, size_t n) {\n    strncpy(dest, src, n - 1);\n    dest[n - 1] = '\\0';\n}`
    },
    cpp: {
        name: 'C++',
        stats: [
            { label: 'Integrity Score', value: '91.5', desc: '+0.5% from last week', icon: Shield, color: 'primary' },
            { label: 'Active Threats', value: '15', desc: 'Smart pointer audits', icon: AlertTriangle, color: 'vulnerable' },
            { label: 'Fixed Issues', value: '210', desc: 'RAII violations fixed', icon: CheckCircle, color: 'safe' },
            { label: 'Scan Volume', value: '2.1k', desc: 'Systems engine', icon: BarChart3, color: 'secondary' },
        ],
        snippet: `std::unique_ptr<User> getUser(int id) {\n    return std::make_unique<User>(db.query(id));\n}`
    },
    java: {
        name: 'Java',
        stats: [
            { label: 'Integrity Score', value: '95.8', desc: '+1.1% from last week', icon: Shield, color: 'primary' },
            { label: 'Active Threats', value: '5', desc: 'Log4j signature found', icon: AlertTriangle, color: 'vulnerable' },
            { label: 'Fixed Issues', value: '412', desc: 'Spring Boot alerts', icon: CheckCircle, color: 'safe' },
            { label: 'Scan Volume', value: '3.5k', desc: 'Enterprise microservices', icon: BarChart3, color: 'secondary' },
        ],
        snippet: `public User findById(Long id) {\n    return userRepository.findById(id)\n        .orElseThrow(() -> new UserNotFoundException(id));\n}`
    }
};

type LanguageKey = keyof typeof LANGUAGES_DATA;

export default function DashboardPage() {

    // 🔐 AUTH
    const { data: session, status } = useSession();
    const router = useRouter();

    // UI STATE (your original)
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedLang, setSelectedLang] = useState<LanguageKey>('python');
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    // 🔐 redirect if not logged in
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // ⏳ loading screen
    if (status === "loading") {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-6 h-6" />
            </div>
        );
    }

    // 🚫 no session
    if (!session) return null;

    // YOUR ORIGINAL FUNCTION
    const handleGeneratePDF = () => {
        setIsGeneratingPDF(true);
        setTimeout(() => {
            setIsGeneratingPDF(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

            const link = document.createElement('a');
            link.href = 'data:application/pdf;base64,JVBERi0xLjQKJ...';
            link.download = `Security-Posture-Report-${new Date().toISOString().split('T')[0]}.pdf`;
        }, 2000);
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto relative overflow-hidden">

            {/* 🔐 OPTIONAL — show logged user */}
            <div className="text-xs text-right opacity-60">
                Logged in as: {session.user?.email}
            </div>

            {/* Toast Notification Container */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-10 left-1/2 glass px-8 py-4 rounded-3xl border border-primary/30 shadow-2xl shadow-primary/20 flex items-center gap-4 z-[100]"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-foreground">
                            Report Generated Successfully
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background 3D Elements */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 blur-[80px] rounded-full animate-float"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-vulnerable/5 blur-[100px] rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Hero Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-3 text-primary font-black text-[10px] tracking-widest uppercase"
                    >
                        <Activity className="w-4 h-4" /> Neural Node: Operational
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter">
                        Security <span className="gradient-text">Posture</span>
                    </h1>

                    <div className="flex items-center gap-4 mt-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 glass border border-card-border rounded-xl text-xs font-black uppercase tracking-widest hover:text-primary transition-all focus:outline-none"
                            >
                                <Code2 className="w-4 h-4" />
                                {LANGUAGES_DATA[selectedLang].name}
                                <ChevronDown className={`w-3 h-3 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLangDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 mt-2 w-40 bg-[#0A0F1E] border border-card-border rounded-2xl shadow-2xl overflow-hidden z-50 p-1"
                                    >
                                        {(Object.keys(LANGUAGES_DATA) as LanguageKey[]).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    setSelectedLang(lang);
                                                    setIsLangDropdownOpen(false);
                                                }}
                                                className={`w-full px-4 py-2 text-left text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors rounded-xl ${selectedLang === lang ? 'text-primary bg-primary/5' : 'text-secondary'}`}
                                            >
                                                {LANGUAGES_DATA[lang].name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className="text-secondary text-sm font-medium">
                            Forenics for <span className="text-foreground font-black">{LANGUAGES_DATA[selectedLang].name}</span> codebase.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleGeneratePDF}
                        disabled={isGeneratingPDF}
                        className={`px-6 py-3 glass border border-card-border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-card transition-all active:scale-95 flex items-center gap-2 ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isGeneratingPDF ? (
                            <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate PDF'
                        )}
                    </button>

                    <Link href="/analyze" className="px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 shadow-xl shadow-primary/20 transition-all active:scale-95">
                        <Play className="w-4 h-4 fill-current" /> New Scan
                    </Link>
                </div>
            </div>

            {/* EVERYTHING BELOW REMAINS EXACTLY SAME */}
            {/* I DID NOT TOUCH YOUR UI */}

            {/* Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                {LANGUAGES_DATA[selectedLang].stats.map((stat, i) => (
                    <motion.div
                        key={selectedLang + i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-3xl border border-card-border bg-card/10 group hover:border-primary/20 transition-all hover:-translate-y-1"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl group-hover:scale-110 transition-transform ${stat.color === 'primary' ? 'bg-primary/10 text-primary' :
                                stat.color === 'vulnerable' ? 'bg-vulnerable/10 text-vulnerable' :
                                    stat.color === 'safe' ? 'bg-safe/10 text-safe' : 'bg-secondary/10 text-secondary'
                                }`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-[10px] text-secondary uppercase font-black tracking-widest mb-1 opacity-60">{stat.label}</p>
                        <motion.h3
                            key={stat.value}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-3xl font-black mb-2"
                        >
                            {stat.value}
                        </motion.h3>
                        <p className={`text-[10px] font-bold ${stat.color === 'vulnerable' ? 'text-vulnerable' : (stat.color === 'safe' ? 'text-safe' : 'text-primary')}`}>
                            {stat.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass rounded-3xl border border-card-border overflow-hidden bg-card/5">
                    <div className="p-6 border-b border-card-border flex items-center justify-between">
                        <h3 className="font-black text-lg flex items-center gap-3 italic">
                            <Target className="w-5 h-5 text-primary" /> Forensic History
                        </h3>
                        <Link href="/history" className="text-[10px] font-black uppercase text-secondary hover:text-primary transition-colors">See all logs</Link>
                    </div>
                    <div className="divide-y divide-card-border/50">
                        {[
                            { id: 'SCN-8291', project: 'Auth-Microservice-v2', status: 'Fixed', risk: 'Low', date: '2 min ago', type: 'safe' },
                            { id: 'SCN-8290', project: 'Legacy-API-Gateway', status: 'Alert', risk: 'Critical', date: '1 hour ago', type: 'vulnerable' },
                            { id: 'SCN-8289', project: 'Payment-Processor-JS', status: 'Review', risk: 'High', date: '4 hours ago', type: 'hallucinated' },
                            { id: 'SCN-8288', project: 'Customer-Portal-App', status: 'Safe', risk: 'None', date: 'Yesterday', type: 'safe' },
                        ].map((scan, i) => (
                            <Link href="/reports" key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-card/20 transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${scan.type === 'vulnerable' ? 'bg-vulnerable/10' :
                                        scan.type === 'safe' ? 'bg-safe/10' : 'bg-hallucinated/10'
                                        }`}>
                                        <Shield className={`w-6 h-6 ${scan.type === 'vulnerable' ? 'text-vulnerable' :
                                            scan.type === 'safe' ? 'text-safe' : 'text-hallucinated'
                                            }`} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm group-hover:text-primary transition-colors">{scan.project}</h4>
                                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">{scan.id} • {scan.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                    <div className="text-right">
                                        <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-1 opacity-50">Risk Level</p>
                                        <p className={`text-xs font-black uppercase tracking-widest ${scan.type === 'vulnerable' ? 'text-vulnerable' :
                                            scan.type === 'safe' ? 'text-safe' : 'text-hallucinated'
                                            }`}>{scan.risk}</p>
                                    </div>
                                    <div className="p-3 rounded-xl border border-card-border group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
                                        <ArrowRight className="w-4 h-4 text-secondary group-hover:text-primary" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Threat Distro */}
                <div className="flex flex-col gap-6">
                    <div className="glass p-6 rounded-3xl border border-card-border bg-card/5 flex-1 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vulnerable via-primary to-safe"></div>
                        <h3 className="font-black text-lg mb-6 flex items-center gap-2 italic">
                            <Zap className="w-5 h-5 text-hallucinated" /> Audit Distribution
                        </h3>

                        <div className="space-y-6">
                            {[
                                { label: 'SQL Injection', value: 85, color: 'vulnerable' },
                                { label: 'XSS Vectors', value: 45, color: 'hallucinated' },
                                { label: 'Broken Auth', value: 20, color: 'primary' },
                                { label: 'Logic Flaws', value: 15, color: 'safe' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-secondary group-hover:text-foreground transition-colors">{item.label}</span>
                                        <span className={
                                            item.color === 'vulnerable' ? 'text-vulnerable' :
                                                item.color === 'hallucinated' ? 'text-hallucinated' :
                                                    item.color === 'primary' ? 'text-primary' : 'text-safe'
                                        }>{item.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-card rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className={`h-full ${item.color === 'vulnerable' ? 'bg-vulnerable' :
                                                item.color === 'hallucinated' ? 'bg-hallucinated' :
                                                    item.color === 'primary' ? 'bg-primary' : 'bg-safe'
                                                }`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Language Code Snapshot */}
                        <div className="mt-8 pt-6 border-t border-card-border/50">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">Live Snapshot</h4>
                                <span className="text-[10px] font-mono text-secondary">{LANGUAGES_DATA[selectedLang].name}</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-black/40 border border-card-border font-mono text-[10px] text-blue-300 overflow-hidden relative group/code">
                                <motion.pre
                                    key={selectedLang}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="whitespace-pre-wrap"
                                >
                                    {LANGUAGES_DATA[selectedLang].snippet}
                                </motion.pre>
                                <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="w-full py-3 glass border border-card-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-card transition-all flex items-center justify-center gap-2">
                                <ExternalLink className="w-4 h-4" /> View Full Matrix
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
