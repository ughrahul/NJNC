"use client";
import { useState } from "react";

const abstracts = [
  {
    id: "ABS-001",
    title: "Novel Epilepsy Surgical Approaches",
    author: "Anonymous",
    topic: "Epilepsy Surgery",
    status: "SUBMITTED",
    score: null,
  },
  {
    id: "ABS-002",
    title: "Neuroimaging in Pediatric Epilepsy",
    author: "Anonymous",
    topic: "Neuroimaging",
    status: "UNDER_REVIEW",
    score: 4.2,
  },
  {
    id: "ABS-003",
    title: "Genetic Markers for Movement Disorders",
    author: "Anonymous",
    topic: "Genetics",
    status: "ACCEPTED",
    score: 4.7,
  },
  {
    id: "ABS-004",
    title: "Stroke Outcomes in SAARC Nations",
    author: "Anonymous",
    topic: "Stroke",
    status: "REVISION_REQUIRED",
    score: 3.1,
  },
  {
    id: "ABS-005",
    title: "Autoimmune Encephalitis Case Series",
    author: "Anonymous",
    topic: "Neuroimmunology",
    status: "SUBMITTED",
    score: null,
  },
];

const statusColors: Record<string, string> = {
  SUBMITTED: "bg-gray-100 text-gray-700",
  UNDER_REVIEW: "bg-primary-50 text-primary-700",
  ACCEPTED: "bg-forest-50 text-forest-700",
  REJECTED: "bg-crimson-50 text-crimson-700",
  REVISION_REQUIRED: "bg-gold-50 text-gold-700",
};

export default function AdminAbstracts() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? abstracts : abstracts.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-display-4 text-navy">Abstract Review</h2>
      <div className="flex gap-2 flex-wrap">
        {[
          "All",
          "SUBMITTED",
          "UNDER_REVIEW",
          "ACCEPTED",
          "REVISION_REQUIRED",
          "REJECTED",
        ].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === s ? "bg-primary text-white" : "bg-white text-slate border"}`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-semibold text-navy">ID</th>
              <th className="text-left p-4 font-semibold text-navy">Title</th>
              <th className="text-left p-4 font-semibold text-navy">Topic</th>
              <th className="text-left p-4 font-semibold text-navy">Score</th>
              <th className="text-left p-4 font-semibold text-navy">Status</th>
              <th className="text-left p-4 font-semibold text-navy">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-xs">{a.id}</td>
                <td className="p-4 font-medium text-navy max-w-xs truncate">
                  {a.title}
                </td>
                <td className="p-4 text-slate text-xs">{a.topic}</td>
                <td className="p-4">
                  {a.score ? (
                    <span className="font-semibold text-navy">{a.score}/5</span>
                  ) : (
                    <span className="text-xs text-slate">—</span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[a.status]}`}
                  >
                    {a.status.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 bg-primary-50 text-primary rounded-lg hover:bg-primary-100">
                      Assign
                    </button>
                    <button className="text-xs px-3 py-1 bg-forest-50 text-forest rounded-lg hover:bg-forest-100">
                      Accept
                    </button>
                    <button className="text-xs px-3 py-1 bg-crimson-50 text-crimson rounded-lg hover:bg-crimson-100">
                      Reject
                    </button>
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
