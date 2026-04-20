'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';
import { api } from '@/lib/api-client';
import type { Registration } from '@njnc/types';
import Link from 'next/link';

export default function PortalDashboard() {
  const { user, accessToken } = useAuth();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      api.get<Registration | null>('/api/registrations/me', accessToken)
        .then(setRegistration)
        .catch(() => setRegistration(null))
        .finally(() => setLoading(false));
    }
  }, [accessToken]);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-32 bg-gray-200 rounded-xl" />
      <div className="h-48 bg-gray-200 rounded-xl" />
    </div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-display-3 text-navy mb-6">
        Welcome, {user?.name}
      </h1>

      {/* Registration Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <h2 className="font-display text-display-5 text-navy mb-4">Registration</h2>
        {registration ? (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate text-sm">Code</span>
              <span className="font-mono text-sm font-semibold">{registration.registrationCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate text-sm">Category</span>
              <span className="text-sm">{registration.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate text-sm">Payment Status</span>
              <span className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                registration.paymentStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                registration.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              )}>
                {registration.paymentStatus}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate mb-4">You haven't registered yet.</p>
            <Link href="/register" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Register Now
            </Link>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/portal/abstracts" className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow">
          <span className="text-2xl mb-2 block">📄</span>
          <h3 className="font-semibold text-navy">My Abstracts</h3>
          <p className="text-xs text-slate mt-1">Submit and track your abstracts</p>
        </Link>
        <Link href="/portal/schedule" className="bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-shadow">
          <span className="text-2xl mb-2 block">📅</span>
          <h3 className="font-semibold text-navy">My Schedule</h3>
          <p className="text-xs text-slate mt-1">View and save sessions</p>
        </Link>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
