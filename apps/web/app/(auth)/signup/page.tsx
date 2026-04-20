'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth';

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    institution: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        country: formData.country || undefined,
        institution: formData.institution || undefined,
      });
      router.push('/portal');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-8 shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="font-display text-display-4 text-navy mb-2">
          Create Account
        </h1>
        <p className="text-slate text-sm">
          Join NJNC 2028 — Nepal Japan Neurological Conference
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-crimson-50 border border-crimson-200 px-4 py-3 text-crimson-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">Full Name *</label>
          <input id="name" type="text" value={formData.name} onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">Email Address *</label>
          <input id="email" type="email" value={formData.email} onChange={(e) => update('email', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">Password *</label>
            <input id="password" type="password" value={formData.password} onChange={(e) => update('password', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy mb-1">Confirm *</label>
            <input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required />
          </div>
        </div>

        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-navy mb-1">Institution</label>
          <input id="institution" type="text" value={formData.institution} onChange={(e) => update('institution', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-navy mb-1">Country</label>
            <input id="country" type="text" value={formData.country} onChange={(e) => update('country', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">Phone</label>
            <input id="phone" type="tel" value={formData.phone} onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
          </div>
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
