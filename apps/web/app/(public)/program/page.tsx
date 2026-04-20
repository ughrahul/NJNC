'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { CONFERENCE } from '@njnc/utils';

type SessionType = 'KEYNOTE' | 'PANEL' | 'WORKSHOP' | 'ORAL_PRESENTATION' | 'BREAK';

interface Session {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  hall: string;
  type: SessionType;
  duration: string;
}

const typeColors: Record<SessionType, string> = {
  KEYNOTE: 'bg-crimson-50 text-crimson-700 border-crimson-200',
  PANEL: 'bg-primary-50 text-primary-700 border-primary-200',
  WORKSHOP: 'bg-forest-50 text-forest-700 border-forest-200',
  ORAL_PRESENTATION: 'bg-gold-50 text-gold-700 border-gold-200',
  BREAK: 'bg-gray-100 text-gray-600 border-gray-200',
};

const day1Sessions: Session[] = [
  { id: '1', time: '08:30', title: 'Registration & Welcome Coffee', hall: 'Lobby', type: 'BREAK', duration: '30 min' },
  { id: '2', time: '09:00', title: 'Opening Ceremony', hall: 'Hall A', type: 'KEYNOTE', duration: '30 min', speaker: 'Organizing Committee' },
  { id: '3', time: '09:30', title: 'Advances in Epilepsy Surgery', hall: 'Hall A', type: 'KEYNOTE', duration: '45 min', speaker: 'Prof. Takeshi Yamamoto' },
  { id: '4', time: '09:30', title: 'Neuroimaging Workshop', hall: 'Workshop Room', type: 'WORKSHOP', duration: '90 min', speaker: 'Dr. Rajesh Khadka' },
  { id: '5', time: '10:15', title: 'Neurogenetics: From Bench to Bedside', hall: 'Hall A', type: 'KEYNOTE', duration: '45 min', speaker: 'Prof. Sarah Chen' },
  { id: '6', time: '10:15', title: 'Pediatric Epilepsy Panel', hall: 'Hall B', type: 'PANEL', duration: '60 min', speaker: 'Dr. Anjali Sharma et al.' },
  { id: '7', time: '11:00', title: 'Coffee Break', hall: 'Lobby', type: 'BREAK', duration: '30 min' },
  { id: '8', time: '11:30', title: 'Oral Presentations — Session 1', hall: 'Hall A', type: 'ORAL_PRESENTATION', duration: '90 min' },
  { id: '9', time: '11:30', title: 'Movement Disorders Masterclass', hall: 'Hall B', type: 'WORKSHOP', duration: '90 min', speaker: 'Prof. Kenji Suzuki' },
  { id: '10', time: '13:00', title: 'Lunch', hall: 'Dining Hall', type: 'BREAK', duration: '60 min' },
  { id: '11', time: '14:00', title: 'Stroke Management in South Asia', hall: 'Hall A', type: 'PANEL', duration: '60 min', speaker: 'Dr. Priya Adhikari et al.' },
  { id: '12', time: '14:00', title: 'Poster Session 1', hall: 'Exhibition', type: 'ORAL_PRESENTATION', duration: '120 min' },
  { id: '13', time: '16:00', title: 'Autoimmune Encephalitis', hall: 'Hall A', type: 'KEYNOTE', duration: '45 min', speaker: 'Prof. Hiroshi Tanaka' },
  { id: '14', time: '17:00', title: 'Welcome Dinner', hall: 'Hotel Garden', type: 'BREAK', duration: '180 min' },
];

const day2Sessions: Session[] = [
  { id: '15', time: '08:30', title: 'Morning Coffee', hall: 'Lobby', type: 'BREAK', duration: '30 min' },
  { id: '16', time: '09:00', title: 'Neurocritical Care — Current Practices', hall: 'Hall A', type: 'KEYNOTE', duration: '45 min', speaker: 'Dr. Maya Shrestha' },
  { id: '17', time: '09:00', title: 'EEG Interpretation Workshop', hall: 'Workshop Room', type: 'WORKSHOP', duration: '90 min' },
  { id: '18', time: '10:00', title: 'Oral Presentations — Session 2', hall: 'Hall A', type: 'ORAL_PRESENTATION', duration: '90 min' },
  { id: '19', time: '10:00', title: 'Headache Medicine Panel', hall: 'Hall B', type: 'PANEL', duration: '60 min' },
  { id: '20', time: '11:30', title: 'Coffee Break', hall: 'Lobby', type: 'BREAK', duration: '30 min' },
  { id: '21', time: '12:00', title: 'Nepal-Japan Joint Research Session', hall: 'Hall A', type: 'PANEL', duration: '60 min' },
  { id: '22', time: '13:00', title: 'Lunch & Poster Session 2', hall: 'Dining / Exhibition', type: 'BREAK', duration: '90 min' },
  { id: '23', time: '14:30', title: 'Awards & Closing Ceremony', hall: 'Hall A', type: 'KEYNOTE', duration: '60 min' },
];

const halls = ['Hall A', 'Hall B', 'Workshop Room'];

export default function ProgramPage() {
  const [activeDay, setActiveDay] = useState(1);
  const sessions = activeDay === 1 ? day1Sessions : day2Sessions;

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">Scientific Program</span>
          <h1 className="font-display text-display-1 mt-3 mb-4">Conference Schedule</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Two days of world-class sessions across three halls — September 18–19, 2028.
          </p>
        </div>
      </section>

      <section className="py-16 bg-snow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Day Tabs */}
          <div className="flex gap-3 mb-10 justify-center">
            {[1, 2].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeDay === day
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white text-slate border hover:border-primary'
                }`}
              >
                Day {day} — Sep {17 + day}, 2028
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {(Object.keys(typeColors) as SessionType[]).map((type) => (
              <span key={type} className={`text-xs px-3 py-1 rounded-full border ${typeColors[type]}`}>
                {type.replace('_', ' ')}
              </span>
            ))}
          </div>

          {/* Sessions */}
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`bg-white rounded-xl p-5 border hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4 ${
                  session.type === 'BREAK' ? 'bg-gray-50' : ''
                }`}
              >
                <div className="sm:w-20 text-sm font-mono font-bold text-primary flex-shrink-0">
                  {session.time}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-navy text-sm">{session.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[session.type]}`}>
                      {session.type.replace('_', ' ')}
                    </span>
                  </div>
                  {session.speaker && <p className="text-xs text-slate">{session.speaker}</p>}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate flex-shrink-0">
                  <span>📍 {session.hall}</span>
                  <span>⏱ {session.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
