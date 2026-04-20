"use client";
import { useState } from "react";

const tabs = ["News", "FAQ", "Committee"];

const newsItems = [
  {
    id: 1,
    title: "Registration Now Open for NJNC 2028",
    status: "Published",
    date: "2028-04-15",
  },
  {
    id: 2,
    title: "Call for Abstracts — Deadline August 1",
    status: "Published",
    date: "2028-04-10",
  },
  {
    id: 3,
    title: "Keynote Speakers Announced",
    status: "Published",
    date: "2028-03-28",
  },
  {
    id: 4,
    title: "Workshop Schedule Released",
    status: "Draft",
    date: "2028-04-18",
  },
];

const faqItems = [
  {
    id: 1,
    q: "Who can attend NJNC 2028?",
    a: "Medical professionals, researchers, students...",
  },
  {
    id: 2,
    q: "How do I pay?",
    a: "National: QR code. International: bank transfer.",
  },
  { id: 3, q: "What is the abstract deadline?", a: "August 1, 2028." },
];

export default function AdminContent() {
  const [tab, setTab] = useState("News");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-display-4 text-navy">
        Content Management
      </h2>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-primary text-white" : "bg-white text-slate border"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "News" && (
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-navy">News Posts</h3>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-700">
              + New Post
            </button>
          </div>
          {newsItems.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
            >
              <div>
                <div className="font-medium text-navy text-sm">{n.title}</div>
                <div className="text-xs text-slate">{n.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${n.status === "Published" ? "bg-forest-50 text-forest-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {n.status}
                </span>
                <button className="text-xs px-3 py-1 bg-gray-100 text-slate rounded-lg hover:bg-gray-200">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "FAQ" && (
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-navy">FAQ Items</h3>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
              + Add FAQ
            </button>
          </div>
          {faqItems.map((f) => (
            <div key={f.id} className="p-4 border-b hover:bg-gray-50">
              <div className="font-medium text-navy text-sm mb-1">{f.q}</div>
              <div className="text-xs text-slate">{f.a}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "Committee" && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <p className="text-sm text-slate">
            Manage committee members — add, edit, or remove members from
            organizing, scientific, and advisory boards.
          </p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
            + Add Member
          </button>
        </div>
      )}
    </div>
  );
}
