'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Upload, FileCode, AlertCircle, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_CODE = `import sqlite3
from fastapi import FastAPI

app = FastAPI()

@app.get("/search")
async def search(q: str):
    db = sqlite3.connect("data.db")
    cur = db.cursor()
    cur.execute(f"SELECT * FROM items WHERE name = '{'{q}'}'")
    return cur.fetchall()`;

export default function AnalyzePage() {
    const [code, setCode] = useState(INITIAL_CODE);
    const [analyzing, setAnalyzing] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [showFix, setShowFix] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleAnalyze = () => {
        setAnalyzing(true);
        setAnalyzed(false);
        setTimeout(() => {
            setAnalyzing(false);
            setAnalyzed(true);
        }, 2000);
    };

    const resetCode = () => {
        setCode(INITIAL_CODE);
        setAnalyzed(false);
        setShowFix(false);
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden relative">
            {/* Background 3D Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Code Editor Panel */}
            <div className="flex-1 flex flex-col border-r border-card-border bg-[#0A0F1E] min-h-[400px] z-10">
                {/* Editor Header */}
                <div className="h-14 glass border-b border-card-border px-4 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/20">
                            <FileCode className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">main.py</span>
                        <span className="text-[10px] bg-card px-2 py-0.5 rounded text-secondary font-mono border border-card-border">Python 3.10</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={resetCode}
                            className="p-2 text-secondary hover:text-foreground hover:bg-card/50 rounded-lg transition-colors"
                            title="Reset Code"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button className="hidden sm:flex px-4 py-2 text-xs text-secondary hover:text-foreground hover:bg-card/50 rounded-lg transition-colors items-center gap-2 border border-transparent hover:border-card-border">
                            <Upload className="w-4 h-4" />
                            Upload
                        </button>
                        <button
                            onClick={handleAnalyze}
                            disabled={analyzing}
                            className="px-4 md:px-6 py-2 bg-primary hover:bg-blue-600 rounded-lg text-xs md:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                        >
                            {analyzing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4" />
                                    Analyze Code
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Code Editor Content */}
                <div className="flex-1 relative overflow-hidden group">
                    <textarea
                        ref={textAreaRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck={false}
                        className="absolute inset-0 w-full h-full p-6 bg-transparent text-transparent caret-white font-mono text-sm leading-relaxed resize-none focus:outline-none z-10"
                    />
                    <pre className="absolute inset-0 p-6 font-mono text-sm leading-relaxed pointer-events-none overflow-auto">
                        <code className="block">
                            {code.split('\n').map((line, i) => (
                                <div key={i} className={`flex whitespace-pre ${line.includes('execute') && analyzed ? 'bg-vulnerable/10 -mx-6 px-6 border-l-2 border-vulnerable' : ''}`}>
                                    <span className="text-gray-600 w-12 text-right pr-4 select-none italic">{i + 1}</span>
                                    <span className="text-gray-400">
                                        {line.split(' ').map((word, j) => {
                                            const isKeyword = ['import', 'from', 'def', 'async', 'return', 'class'].includes(word);
                                            const isFunction = word.includes('(');
                                            return (
                                                <span key={j} className={isKeyword ? 'text-purple-400' : isFunction ? 'text-yellow-300' : 'text-blue-300'}>
                                                    {word}{' '}
                                                </span>
                                            );
                                        })}
                                    </span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Results Panel */}
            <div className="w-full lg:w-[420px] flex flex-col bg-background/80 backdrop-blur-xl border-l border-card-border h-full lg:h-auto overflow-auto z-10">
                <div className="h-14 glass border-b border-card-border px-6 flex items-center justify-between flex-shrink-0">
                    <h2 className="font-bold tracking-tight">AI Audit Results</h2>
                    {analyzed && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-safe/10 border border-safe/20 text-[10px] font-bold text-safe">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {!analyzed && !analyzing ? (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-glow"></div>
                                <div className="relative w-24 h-24 rounded-3xl glass border border-primary/40 flex items-center justify-center animate-float shadow-2xl shadow-primary/20">
                                    <Sparkles className="w-10 h-10 text-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="font-extrabold text-xl text-foreground">Awaiting Analysis</p>
                                <p className="text-sm text-secondary leading-relaxed">
                                    Upload your code or paste it directly in the editor to start a forensic security audit.
                                </p>
                            </div>
                        </motion.div>
                    ) : analyzing ? (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-1 flex flex-col items-center justify-center p-12 space-y-8"
                        >
                            <div className="w-32 h-1 bg-card rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ left: '-100%' }}
                                    animate={{ left: '100%' }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                                />
                            </div>
                            <div className="text-center space-y-4">
                                <p className="text-sm font-bold text-primary animate-pulse tracking-widest uppercase">Scanning Neural Patterns</p>
                                <div className="space-y-1">
                                    <p className="text-xs text-secondary font-mono">analyzing data flow...</p>
                                    <p className="text-xs text-secondary font-mono">verifying logic paths...</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1 p-6 space-y-6"
                        >
                            {/* Score Card */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="glass p-6 rounded-2xl border border-vulnerable/30 bg-vulnerable/5 shadow-2xl shadow-vulnerable/5"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-vulnerable tracking-widest uppercase mb-1">Critical Finding</span>
                                        <h3 className="text-xl font-black">SQL Injection</h3>
                                    </div>
                                    <div className="relative w-16 h-16">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="6" />
                                            <circle cx="32" cy="32" r="28" fill="none" stroke="#EF4444" strokeWidth="6" strokeDasharray="176" strokeDashoffset="28" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center font-black text-vulnerable">8.4</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-vulnerable/10 border border-vulnerable/20 space-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-vulnerable">
                                        <AlertCircle className="w-4 h-4" />
                                        Unsanitized Data Input
                                    </div>
                                    <p className="text-xs text-secondary leading-relaxed">
                                        User input `q` is passed directly into an f-string database query. This allows unauthorized data extraction.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="py-3 glass border border-card-border rounded-xl text-xs font-bold hover:bg-card/50 transition-all flex items-center justify-center gap-2">
                                    Ignore
                                </button>
                                <button className="py-3 glass border border-card-border rounded-xl text-xs font-bold hover:bg-card/50 transition-all flex items-center justify-center gap-2">
                                    Export Log
                                </button>
                            </div>

                            <button
                                onClick={() => setShowFix(true)}
                                className="w-full py-4 bg-foreground text-background rounded-xl font-bold hover:bg-gray-200 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                                Generate Secure Fix
                            </button>

                            {/* Quick Findings */}
                            <div className="space-y-3 pt-4 border-t border-card-border">
                                <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest">Neural Signatures</h4>
                                <div className="space-y-2">
                                    {['Tainted Input', 'Direct Concatenation', 'Weak Sanitization'].map((sig, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 glass rounded-lg border border-card-border text-xs">
                                            <span className="text-secondary">{sig}</span>
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Suggested Fix Overlay */}
            <AnimatePresence>
                {showFix && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-2xl glass rounded-3xl border border-primary/30 shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-primary/20 text-primary">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black">AI Proposed Fix</h2>
                                            <p className="text-sm text-secondary">Parameterizing queries to eliminate injection points.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowFix(false)}
                                        className="p-2 hover:bg-card rounded-full text-secondary hover:text-foreground"
                                    >
                                        <AlertCircle className="rotate-45 w-6 h-6" />
                                    </button>
                                </div>

                                <div className="glass rounded-xl border border-safe/30 bg-safe/5 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-safe/20 flex justify-between items-center text-[10px] font-bold">
                                        <span className="text-safe lowercase font-mono">remediated_code.py</span>
                                        <span className="text-safe uppercase tracking-widest">Secure</span>
                                    </div>
                                    <div className="p-6 bg-[#0A0F1E] font-mono text-xs md:text-sm text-blue-300 leading-relaxed overflow-auto max-h-[200px]">
                                        <pre>
                                            <code>
                                                {`cur.execute("SELECT * FROM items WHERE name = ?", (q,))`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 py-4 glass border border-card-border rounded-xl font-bold hover:bg-card transition-all">Copy Fix</button>
                                    <button
                                        onClick={() => {
                                            setShowFix(false);
                                            setCode(code.replace(`cur.execute(f"SELECT * FROM items WHERE name = '{'{q}'}'")`, `cur.execute("SELECT * FROM items WHERE name = ?", (q,))`));
                                            setAnalyzed(false);
                                        }}
                                        className="flex-1 py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 shadow-xl shadow-primary/20 transition-all"
                                    >
                                        Apply Locally
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
