'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/hooks/use-auth';

interface DashboardStats {
  registrations: { total: number; byCategory: { category: string; count: number }[] };
  payments: { pending: number; verified: number };
  abstracts: { total: number; submitted: number; reviewed: number };
  speakers: number;
  unresolvedInquiries: number;
}

export default function AdminDashboard() {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      api.get<DashboardStats>('/api/admin/stats', accessToken)
        .then(setStats)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [accessToken]);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-xl" />
      ))}
    </div>;
  }

  if (!stats) return <div className="text-red-500">Failed to load stats</div>;

  const kpis = [
    { label: 'Total Registrations', value: stats.registrations.total, icon: '📝', color: 'bg-primary-50 text-primary-700' },
    { label: 'Pending Payments', value: stats.payments.pending, icon: '⏳', color: 'bg-gold-50 text-gold-700' },
    { label: 'Verified Payments', value: stats.payments.verified, icon: '✅', color: 'bg-forest-50 text-forest-700' },
    { label: 'Total Abstracts', value: stats.abstracts.total, icon: '📄', color: 'bg-primary-50 text-primary-700' },
    { label: 'Under Review', value: stats.abstracts.submitted, icon: '🔍', color: 'bg-gold-50 text-gold-700' },
    { label: 'Keynote Speakers', value: stats.speakers, icon: '🎤', color: 'bg-primary-50 text-primary-700' },
    { label: 'Open Inquiries', value: stats.unresolvedInquiries, icon: '📬', color: 'bg-crimson-50 text-crimson-700' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`rounded-xl p-6 ${kpi.color}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <span className="text-3xl font-bold">{kpi.value}</span>
            </div>
            <div className="text-sm font-medium opacity-80">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-semibold text-navy mb-4">Registrations by Category</h3>
          {stats.registrations.byCategory.map((cat) => (
            <div key={cat.category} className="flex justify-between py-2 border-b last:border-0">
              <span className="text-sm text-slate">{cat.category}</span>
              <span className="text-sm font-medium text-navy">{cat.count}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-semibold text-navy mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <a href="/admin/registrations" className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm transition-colors">
              📝 Manage Registrations
            </a>
            <a href="/admin/finance" className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm transition-colors">
              💰 Verify Pending Payments
            </a>
            <a href="/admin/abstracts" className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm transition-colors">
              📄 Review Abstracts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
