'use client';
import { useState } from 'react';

const registrations = [
  { id: 'REG-001', name: 'Dr. Takeshi Yamamoto', email: 'takeshi@tokyo-med.jp', country: 'Japan', category: 'International', amount: '$300', status: 'PAID', date: '2028-04-15' },
  { id: 'REG-002', name: 'Dr. Rajesh Khadka', email: 'rajesh@anni.org.np', country: 'Nepal', category: 'National', amount: 'NPR 15,000', status: 'PAID', date: '2028-04-14' },
  { id: 'REG-003', name: 'Dr. Sarah Chen', email: 'sarah@jhu.edu', country: 'USA', category: 'International', amount: '$300', status: 'PENDING', date: '2028-04-13' },
  { id: 'REG-004', name: 'Dr. Anjali Sharma', email: 'anjali@aiims.in', country: 'India', category: 'SAARC', amount: '$150', status: 'PAID', date: '2028-04-12' },
  { id: 'REG-005', name: 'Dr. Maya Shrestha', email: 'maya@bpkihs.edu.np', country: 'Nepal', category: 'National', amount: 'NPR 15,000', status: 'PENDING', date: '2028-04-11' },
  { id: 'REG-006', name: 'Dr. Kenji Suzuki', email: 'kenji@kyoto-u.ac.jp', country: 'Japan', category: 'International', amount: '$300', status: 'PAID', date: '2028-04-10' },
];

const statusColors: Record<string, string> = {
  PAID: 'bg-forest-50 text-forest-700',
  PENDING: 'bg-gold-50 text-gold-700',
  CANCELLED: 'bg-crimson-50 text-crimson-700',
};

export default function AdminRegistrations() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? registrations : registrations.filter(r => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-display-4 text-navy">Registration Management</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">Export CSV</button>
      </div>

      <div className="flex gap-2">
        {['All', 'PAID', 'PENDING', 'CANCELLED'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-white text-slate border hover:border-primary'}`}>{s}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-gray-50">
            <th className="text-left p-4 font-semibold text-navy">ID</th>
            <th className="text-left p-4 font-semibold text-navy">Name</th>
            <th className="text-left p-4 font-semibold text-navy">Country</th>
            <th className="text-left p-4 font-semibold text-navy">Category</th>
            <th className="text-left p-4 font-semibold text-navy">Amount</th>
            <th className="text-left p-4 font-semibold text-navy">Status</th>
            <th className="text-left p-4 font-semibold text-navy">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-xs">{r.id}</td>
                <td className="p-4"><div className="font-medium text-navy">{r.name}</div><div className="text-xs text-slate">{r.email}</div></td>
                <td className="p-4 text-slate">{r.country}</td>
                <td className="p-4 text-slate">{r.category}</td>
                <td className="p-4 font-medium">{r.amount}</td>
                <td className="p-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[r.status] || ''}`}>{r.status}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {r.status === 'PENDING' && <button className="text-xs px-3 py-1 bg-forest text-white rounded-lg hover:bg-forest-700">Verify</button>}
                    <button className="text-xs px-3 py-1 bg-gray-100 text-slate rounded-lg hover:bg-gray-200">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
