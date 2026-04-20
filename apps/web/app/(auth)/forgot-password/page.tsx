'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch {
      // Always show success to prevent email enumeration
      setSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl text-center">
        <div className="text-4xl mb-4">📧</div>
        <h1 className="font-display text-display-5 text-navy mb-2">Check Your Email</h1>
        <p className="text-slate text-sm mb-6">
          If an account exists with {email}, we've sent a password reset link.
        </p>
        <Link href="/login" className="text-primary text-sm font-medium hover:underline">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="font-display text-display-4 text-navy mb-2">Reset Password</h1>
        <p className="text-slate text-sm">Enter your email and we'll send a reset link.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required />
        </div>
        <button type="submit" disabled={isLoading}
          className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors">
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate">
        <Link href="/login" className="text-primary font-medium hover:underline">Back to Sign In</Link>
      </p>
    </div>
  );
}
