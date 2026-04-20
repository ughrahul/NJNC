"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Static speaker data — in production this would come from API
const speakers = [
  {
    id: 1,
    name: "Prof. Takeshi Yamamoto",
    title: "Department Chair",
    institution: "Tokyo Medical University",
    country: "Japan",
    flag: "🇯🇵",
    specialty: "Epilepsy Surgery",
    bio: "Leading researcher in advanced epilepsy surgical techniques with over 200 publications.",
    type: "keynote",
  },
  {
    id: 2,
    name: "Dr. Rajesh Khadka",
    title: "Senior Neurologist",
    institution: "Annapurna Neurological Institute",
    country: "Nepal",
    flag: "🇳🇵",
    specialty: "Neuroimaging",
    bio: "Pioneer in neuroimaging applications in resource-limited settings.",
    type: "keynote",
  },
  {
    id: 3,
    name: "Prof. Sarah Chen",
    title: "Professor",
    institution: "Johns Hopkins University",
    country: "USA",
    flag: "🇺🇸",
    specialty: "Genetics",
    bio: "Expert in neurogenetics and personalized medicine approaches.",
    type: "keynote",
  },
  {
    id: 4,
    name: "Dr. Anjali Sharma",
    title: "Associate Professor",
    institution: "AIIMS New Delhi",
    country: "India",
    flag: "🇮🇳",
    specialty: "Pediatric Epilepsy",
    bio: "Specialist in pediatric epilepsy management across South Asia.",
    type: "panel",
  },
  {
    id: 5,
    name: "Prof. Kenji Suzuki",
    title: "Director",
    institution: "Kyoto University Hospital",
    country: "Japan",
    flag: "🇯🇵",
    specialty: "Movement Disorders",
    bio: "Renowned specialist in movement disorders and deep brain stimulation.",
    type: "workshop",
  },
  {
    id: 6,
    name: "Dr. Priya Adhikari",
    title: "Consultant Neurologist",
    institution: "TU Teaching Hospital",
    country: "Nepal",
    flag: "🇳🇵",
    specialty: "Stroke",
    bio: "Leading stroke specialist focused on improving acute stroke care in Nepal.",
    type: "panel",
  },
  {
    id: 7,
    name: "Prof. Hiroshi Tanaka",
    title: "Professor Emeritus",
    institution: "Osaka University",
    country: "Japan",
    flag: "🇯🇵",
    specialty: "Neuroimmunology",
    bio: "Pioneer in neuroimmunology with focus on autoimmune encephalitis.",
    type: "keynote",
  },
  {
    id: 8,
    name: "Dr. Maya Shrestha",
    title: "Researcher",
    institution: "BP Koirala Institute",
    country: "Nepal",
    flag: "🇳🇵",
    specialty: "Neurocritical Care",
    bio: "Advancing neurocritical care protocols for developing health systems.",
    type: "workshop",
  },
];

const specialties = [
  "All",
  "Epilepsy Surgery",
  "Neuroimaging",
  "Genetics",
  "Pediatric Epilepsy",
  "Movement Disorders",
  "Stroke",
  "Neuroimmunology",
  "Neurocritical Care",
];
const types = ["All", "keynote", "panel", "workshop"];

export default function SpeakersPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState<
    (typeof speakers)[0] | null
  >(null);

  const filtered = speakers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.institution.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialty === "All" || s.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            World-Class Faculty
          </span>
          <h1 className="font-display text-display-1 mt-3 mb-4">
            Speakers & Faculty
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Distinguished neurologists and researchers from around the world
            sharing cutting-edge knowledge.
          </p>
        </div>
      </section>

      <section className="py-16 bg-snow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              placeholder="Search speakers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-primary outline-none"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((speaker) => (
              <button
                key={speaker.id}
                onClick={() => setSelectedSpeaker(speaker)}
                className="bg-white rounded-2xl p-6 border hover:shadow-xl hover:-translate-y-1 transition-all text-left group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white text-2xl font-display font-bold mb-4">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{speaker.flag}</span>
                  <span className="text-xs text-slate">{speaker.country}</span>
                </div>
                <h3 className="font-display font-bold text-navy text-sm group-hover:text-primary transition-colors">
                  {speaker.name}
                </h3>
                <p className="text-xs text-slate mt-1">{speaker.institution}</p>
                <div className="mt-3">
                  <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 font-medium">
                    {speaker.specialty}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate">
              <p className="text-lg mb-2">No speakers match your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setSpecialty("All");
                }}
                className="text-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bio Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedSpeaker(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 text-slate hover:text-navy"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white text-xl font-display font-bold flex-shrink-0">
                {selectedSpeaker.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-navy">
                  {selectedSpeaker.name}
                </h3>
                <p className="text-sm text-slate">{selectedSpeaker.title}</p>
                <p className="text-sm text-slate">
                  {selectedSpeaker.flag} {selectedSpeaker.institution},{" "}
                  {selectedSpeaker.country}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-medium mr-2">
                {selectedSpeaker.specialty}
              </span>
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-gold-50 text-gold-700 font-medium capitalize">
                {selectedSpeaker.type}
              </span>
            </div>
            <p className="text-sm text-slate leading-relaxed">
              {selectedSpeaker.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
