'use client';

import { useState } from 'react';
import { Search, Bell, User, Menu, Settings, LogOut, Shield, ChevronDown, Sparkles, Download, Chrome } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showDownload, setShowDownload] = useState(false);

    return (
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 glass border-b border-card-border z-20 backdrop-blur-xl">
            <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-card/50 rounded-xl md:hidden flex-shrink-0 group transition-all"
                >
                    <Menu className="w-5 h-5 text-secondary group-hover:text-primary group-hover:rotate-180 transition-all duration-500" />
                </button>

                {/* Search */}
                <div className="flex-1 max-w-xl hidden sm:block">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search repositories, scan IDs..."
                            className="w-full pl-10 pr-4 py-2 bg-card/50 border border-card-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:bg-card transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 opacity-40 group-focus-within:opacity-100 transition-opacity">
                            <kbd className="px-1.5 py-0.5 text-[10px] bg-background border border-card-border rounded font-sans">⌘K</kbd>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 md:gap-4 ml-auto">
                    {/* AI Status */}
                    <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-primary/20 bg-primary/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] font-black text-safe whitespace-nowrap tracking-wider">ENGINE: ONLINE</span>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowProfile(false);
                            }}
                            className={`relative p-2.5 rounded-xl transition-all ${showNotifications ? 'bg-primary/20 text-primary shadow-lg shadow-primary/10' : 'hover:bg-card/50 text-secondary'}`}
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-vulnerable rounded-full border-2 border-[#0F172A] animate-bounce"></span>
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-80 bg-[#161F31] dark:bg-[#161F31] light:bg-white rounded-2xl border border-card-border shadow-2xl overflow-hidden z-[100] backdrop-blur-xl"
                                >
                                    <div className="p-4 border-b border-card-border bg-card/20 flex items-center justify-between">
                                        <h3 className="font-black text-xs uppercase tracking-widest">Alert Center</h3>
                                        <span className="text-[10px] text-primary hover:underline cursor-pointer">Mark all read</span>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {[
                                            { title: 'Critical Bug Found', desc: 'SQL Injection in Auth module', time: '2m ago', type: 'vulnerable' },
                                            { title: 'Scan Completed', desc: 'API Gateway scan 100% finished', time: '1h ago', type: 'safe' },
                                            { title: 'System Update', desc: 'AI Neural network version 4.2 applied', time: '5h ago', type: 'primary' },
                                        ].map((n, i) => (
                                            <div key={i} className="p-4 border-b border-card-border/50 hover:bg-card/30 transition-colors cursor-pointer group">
                                                <div className="flex gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.type === 'vulnerable' ? 'bg-vulnerable/10' :
                                                        n.type === 'safe' ? 'bg-safe/10' : 'bg-primary/10'
                                                        }`}>
                                                        <Shield className={`w-4 h-4 ${n.type === 'vulnerable' ? 'text-vulnerable' :
                                                            n.type === 'safe' ? 'text-safe' : 'text-primary'
                                                            }`} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold group-hover:text-primary transition-colors">{n.title}</p>
                                                        <p className="text-[10px] text-secondary mt-0.5">{n.desc}</p>
                                                        <p className="text-[9px] text-secondary/50 mt-1 uppercase font-bold">{n.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-secondary hover:bg-card/50 transition-colors">View All Messages</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Download Extensions */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowDownload(!showDownload);
                                setShowNotifications(false);
                                setShowProfile(false);
                            }}
                            className={`p-2.5 rounded-xl transition-all ${showDownload ? 'bg-primary/20 text-primary' : 'hover:bg-card/50 text-secondary'}`}
                            title="Download Extensions"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        <AnimatePresence>
                            {showDownload && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-64 bg-[#161F31] dark:bg-[#161F31] light:bg-white rounded-2xl border border-card-border shadow-2xl overflow-hidden z-[100] backdrop-blur-xl"
                                >
                                    <div className="p-4 border-b border-card-border bg-card/20">
                                        <h3 className="font-black text-xs uppercase tracking-widest">Get Extensions</h3>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <a
                                            href="https://chromewebstore.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-card/50 transition-colors group"
                                        >
                                            <Chrome className="w-5 h-5 text-secondary group-hover:text-primary" />
                                            <div>
                                                <p className="text-xs font-bold">Chrome Extension</p>
                                                <p className="text-[9px] text-secondary">Analyze code in browser</p>
                                            </div>
                                        </a>
                                        <a
                                            href="https://marketplace.visualstudio.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-card/50 transition-colors group"
                                        >
                                            <div className="w-5 h-5 flex items-center justify-center">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.15 2.587l-4.94-2.377c-.528-.254-1.153-.134-1.705.29l-9.46 9.33-4.12-2.54a1.493 1.493 0 00-1.921.22l-.794 1.254c-.45.541-.35 1.48.22 2.126l4.639 3.73-4.639 3.73a1.493 1.493 0 00-.22 2.126l.794 1.254c.449.541 1.278.616 1.921.22l4.12-2.54 9.46 9.33c.552.424 1.177.544 1.705.29l4.94-2.377c.528-.254.866-.757.866-1.353V3.94c0-.596-.338-1.099-.866-1.353z" fill="#0877b9" />
                                                    <path d="M15 12l7.062 5.342c.31.235.438.497.438.718V8.658c0-.221-.128-.483-.438-.718L15 12z" fill="#34a9f4" />
                                                    <path d="M6 17.55l9-5.55-9-5.55v11.1z" fill="#1f9ae0" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold">VS Code Extension</p>
                                                <p className="text-[9px] text-secondary">IDE Integration</p>
                                            </div>
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Profile */}
                    <div className="relative">
                        <div
                            onClick={() => {
                                setShowProfile(!showProfile);
                                setShowNotifications(false);
                            }}
                            className={`flex items-center gap-2 md:gap-3 pl-2 pr-2 md:pl-3 md:pr-4 py-1.5 md:py-2 rounded-xl cursor-pointer border transition-all duration-300 ${showProfile ? 'bg-primary/10 border-primary/30 shadow-lg' : 'glass-hover border-card-border'}`}
                        >
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-white/10 flex-shrink-0 shadow-lg group-hover:scale-105">
                                <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                            </div>
                            <div className="text-left hidden lg:block pr-1">
                                <p className="text-xs font-black leading-none mb-1">Alex Rivera</p>
                                <p className="text-[9px] text-secondary/70 font-bold uppercase tracking-tighter">Enterprise Admin</p>
                            </div>
                            <ChevronDown className={`w-3 h-3 text-secondary transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
                        </div>

                        <AnimatePresence>
                            {showProfile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-56 bg-[#161F31] dark:bg-[#161F31] light:bg-white rounded-2xl border border-card-border shadow-2xl overflow-hidden z-[100] backdrop-blur-xl"
                                >
                                    <div className="p-4 border-b border-card-border bg-card/20">
                                        <p className="text-[10px] text-secondary uppercase font-black tracking-widest mb-1">Signed in as</p>
                                        <p className="text-xs font-bold truncate">arivera@codetrust.ai</p>
                                    </div>
                                    <div className="p-2">
                                        {[
                                            { icon: User, label: 'Account Profile', color: 'foreground', href: '/settings?tab=profile' },
                                            { icon: Settings, label: 'Preferences', color: 'foreground', href: '/settings?tab=security' },
                                            { icon: Sparkles, label: 'Advanced Features', color: 'primary', href: '/settings?tab=advanced' },
                                        ].map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                onClick={() => setShowProfile(false)}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-card/50 transition-colors text-left group"
                                            >
                                                <item.icon className={`w-4 h-4 ${item.color === 'primary' ? 'text-primary' : 'text-secondary group-hover:text-foreground'
                                                    }`} />
                                                <span className={`text-xs font-bold ${item.color === 'primary' ? 'text-primary' : 'text-secondary group-hover:text-foreground'
                                                    }`}>{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="p-2 border-t border-card-border/50">
                                        <Link
                                            href="/login"
                                            onClick={() => setShowProfile(false)}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-vulnerable/10 hover:text-vulnerable transition-all text-left group"
                                        >
                                            <LogOut className="w-4 h-4 text-secondary group-hover:text-vulnerable" />
                                            <span className="text-xs font-bold text-secondary group-hover:text-vulnerable">Log Out Session</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
