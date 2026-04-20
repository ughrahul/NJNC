'use client';

const sessions = [
  { id: 1, time: '09:00', hall: 'Hall A', day: 1, title: 'Opening Ceremony', speaker: 'Committee', type: 'KEYNOTE', published: true },
  { id: 2, time: '09:30', hall: 'Hall A', day: 1, title: 'Advances in Epilepsy Surgery', speaker: 'Prof. Yamamoto', type: 'KEYNOTE', published: true },
  { id: 3, time: '09:30', hall: 'Workshop Room', day: 1, title: 'Neuroimaging Workshop', speaker: 'Dr. Khadka', type: 'WORKSHOP', published: false },
  { id: 4, time: '10:15', hall: 'Hall B', day: 1, title: 'Pediatric Epilepsy Panel', speaker: 'Dr. Sharma', type: 'PANEL', published: true },
  { id: 5, time: '09:00', hall: 'Hall A', day: 2, title: 'Neurocritical Care', speaker: 'Dr. Shrestha', type: 'KEYNOTE', published: true },
  { id: 6, time: '10:00', hall: 'Hall B', day: 2, title: 'Headache Panel', speaker: 'TBA', type: 'PANEL', published: false },
];

const tc: Record<string,string> = { KEYNOTE: 'bg-crimson-50 text-crimson-700', PANEL: 'bg-primary-50 text-primary-700', WORKSHOP: 'bg-forest-50 text-forest-700' };

export default function AdminProgram() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-display-4 text-navy">Program Builder</h2>
        <button className="px-4 py-2 bg-forest text-white rounded-lg text-sm font-semibold hover:bg-forest-700 transition-colors">Publish All</button>
      </div>

      {[1, 2].map(day => (
        <div key={day}>
          <h3 className="font-display text-lg font-bold text-navy mb-4">Day {day} — Sep {17+day}, 2028</h3>
          <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-semibold text-navy">Time</th>
                <th className="text-left p-3 font-semibold text-navy">Hall</th>
                <th className="text-left p-3 font-semibold text-navy">Session</th>
                <th className="text-left p-3 font-semibold text-navy">Speaker</th>
                <th className="text-left p-3 font-semibold text-navy">Type</th>
                <th className="text-left p-3 font-semibold text-navy">Status</th>
                <th className="text-left p-3 font-semibold text-navy">Actions</th>
              </tr></thead>
              <tbody>
                {sessions.filter(s => s.day === day).map(s => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-xs">{s.time}</td>
                    <td className="p-3 text-slate text-xs">{s.hall}</td>
                    <td className="p-3 font-medium text-navy">{s.title}</td>
                    <td className="p-3 text-slate text-xs">{s.speaker}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${tc[s.type] || 'bg-gray-100'}`}>{s.type}</span></td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${s.published ? 'bg-forest-50 text-forest-700' : 'bg-gray-100 text-gray-600'}`}>{s.published ? 'Published' : 'Draft'}</span></td>
                    <td className="p-3"><button className="text-xs px-3 py-1 bg-gray-100 text-slate rounded-lg hover:bg-gray-200">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <button className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-slate hover:border-primary hover:text-primary transition-colors w-full">+ Add Session</button>
    </div>
  );
}
