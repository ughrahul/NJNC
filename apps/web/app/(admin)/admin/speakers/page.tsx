'use client';

const speakers = [
  { id: 1, name: 'Prof. Takeshi Yamamoto', institution: 'Tokyo Medical University', country: 'Japan', status: 'CONFIRMED', sessions: 1 },
  { id: 2, name: 'Dr. Rajesh Khadka', institution: 'Annapurna Neurological Institute', country: 'Nepal', status: 'CONFIRMED', sessions: 1 },
  { id: 3, name: 'Prof. Sarah Chen', institution: 'Johns Hopkins University', country: 'USA', status: 'CONFIRMED', sessions: 1 },
  { id: 4, name: 'Dr. Anjali Sharma', institution: 'AIIMS New Delhi', country: 'India', status: 'PENDING', sessions: 1 },
  { id: 5, name: 'Prof. Kenji Suzuki', institution: 'Kyoto University Hospital', country: 'Japan', status: 'CONFIRMED', sessions: 1 },
  { id: 6, name: 'Dr. Priya Adhikari', institution: 'TU Teaching Hospital', country: 'Nepal', status: 'INVITED', sessions: 0 },
];

const sc: Record<string,string> = { CONFIRMED: 'bg-forest-50 text-forest-700', PENDING: 'bg-gold-50 text-gold-700', INVITED: 'bg-primary-50 text-primary-700', DECLINED: 'bg-crimson-50 text-crimson-700' };

export default function AdminSpeakers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-display-4 text-navy">Speaker Management</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-slate rounded-lg text-sm font-medium hover:bg-gray-200">Import CSV</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-700">+ Add Speaker</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-gray-50">
            <th className="text-left p-4 font-semibold text-navy">Name</th>
            <th className="text-left p-4 font-semibold text-navy">Institution</th>
            <th className="text-left p-4 font-semibold text-navy">Country</th>
            <th className="text-left p-4 font-semibold text-navy">Sessions</th>
            <th className="text-left p-4 font-semibold text-navy">Status</th>
            <th className="text-left p-4 font-semibold text-navy">Actions</th>
          </tr></thead>
          <tbody>
            {speakers.map(s => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-navy">{s.name}</td>
                <td className="p-4 text-slate text-xs">{s.institution}</td>
                <td className="p-4 text-slate">{s.country}</td>
                <td className="p-4 text-center">{s.sessions}</td>
                <td className="p-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sc[s.status]}`}>{s.status}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 bg-gray-100 text-slate rounded-lg hover:bg-gray-200">Edit</button>
                    <button className="text-xs px-3 py-1 bg-primary-50 text-primary rounded-lg hover:bg-primary-100">Invite</button>
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
