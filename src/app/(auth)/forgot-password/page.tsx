'use client';

import { Mail, ArrowRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        setLoading(true);

        await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        setLoading(false);
        setIsSubmitted(true);
    };

    return (
        <div className="glass p-8 rounded-3xl border shadow-2xl space-y-8">

            {!isSubmitted ? (
                <>
                    <div className="text-center space-y-2">
                        <Link href="/login" className="text-xs">
                            <ChevronLeft /> Back to Login
                        </Link>
                        <h1 className="text-3xl font-bold">Reset Password</h1>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-xl"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </>
            ) : (
                <div className="text-center space-y-4">
                    <ShieldCheck className="mx-auto w-10 h-10 text-green-500" />
                    <h2 className="text-xl font-bold">Check your email</h2>
                    <Link href="/login">Return to login</Link>
                </div>
            )}

        </div>
    );
}
