import Link from 'next/link';

const kpis = [
  { label: 'Total Registrations', value: '247', delta: '+12 this week', icon: '📝', color: 'bg-primary-50 text-primary' },
  { label: 'Revenue', value: '$48,350', delta: '+$3,200 this week', icon: '💰', color: 'bg-forest-50 text-forest' },
  { label: 'Abstracts', value: '89', delta: '+8 this week', icon: '📄', color: 'bg-gold-50 text-gold' },
  { label: 'Countries', value: '28', delta: '+2 this week', icon: '🌍', color: 'bg-crimson-50 text-crimson' },
];

const recentActivity = [
  { text: 'Dr. Tanaka registered (International)', time: '5 min ago', icon: '📝' },
  { text: 'Payment verified: Dr. Khadka', time: '12 min ago', icon: '✅' },
  { text: 'Abstract submitted: #ABS-089', time: '25 min ago', icon: '📄' },
  { text: 'New contact inquiry from Japan', time: '1 hour ago', icon: '💬' },
  { text: 'Speaker confirmed: Prof. Yamamoto', time: '2 hours ago', icon: '🎤' },
  { text: 'Payment proof uploaded: Dr. Chen', time: '3 hours ago', icon: '💳' },
];

const categoryData = [
  { name: 'International', count: 98, pct: 40, color: 'bg-primary' },
  { name: 'National', count: 72, pct: 29, color: 'bg-forest' },
  { name: 'SAARC', count: 45, pct: 18, color: 'bg-gold' },
  { name: 'Resident/MO', count: 32, pct: 13, color: 'bg-crimson' },
];

const quickActions = [
  { label: 'Verify Payments', href: '/admin/finance', icon: '💳', count: 12 },
  { label: 'Review Abstracts', href: '/admin/abstracts', icon: '📄', count: 8 },
  { label: 'Export Registrations', href: '/admin/registrations', icon: '📥' },
  { label: 'Send Announcement', href: '/admin/emails', icon: '📧' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center text-lg`}>{kpi.icon}</span>
            </div>
            <div className="font-display text-2xl font-bold text-navy">{kpi.value}</div>
            <div className="text-sm text-slate mt-1">{kpi.label}</div>
            <div className="text-xs text-forest mt-2">{kpi.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Registration by Category */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border shadow-sm">
          <h2 className="font-display font-bold text-navy mb-6">Registrations by Category</h2>
          <div className="space-y-4">
            {categoryData.map(cat => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-navy font-medium">{cat.name}</span>
                  <span className="text-slate">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full transition-all`} style={{width: `${cat.pct}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <h2 className="font-display font-bold text-navy mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map(a => (
              <Link key={a.label} href={a.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span>{a.icon}</span>
                  <span className="text-sm text-navy font-medium">{a.label}</span>
                </div>
                {a.count && <span className="text-xs bg-crimson text-white px-2 py-0.5 rounded-full">{a.count}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <h2 className="font-display font-bold text-navy mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span>{item.icon}</span>
              <span className="text-navy flex-1">{item.text}</span>
              <span className="text-xs text-slate">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
