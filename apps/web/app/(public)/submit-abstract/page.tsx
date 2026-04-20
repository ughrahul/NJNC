"use client";

import { useState } from "react";
import {
  ABSTRACT_TOPICS,
  PRESENTATION_TYPES,
  ABSTRACT_CONSTRAINTS,
} from "@njnc/utils";

function wordCount(t: string) {
  return t.trim() ? t.trim().split(/\s+/).length : 0;
}

export default function SubmitAbstractPage() {
  const [form, setForm] = useState({
    title: "",
    body: "",
    topic: "",
    presentationType: "",
    coAuthors: [""],
  });
  const [submitted, setSubmitted] = useState(false);
  const tw = wordCount(form.title),
    bw = wordCount(form.body);

  if (submitted)
    return (
      <div className="pt-24 pb-20 bg-snow min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-16 text-center">
          <div className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="font-display text-display-2 text-navy mb-3">
            Abstract Submitted!
          </h1>
          <p className="text-slate mb-6">
            You will be notified of the decision via email.
          </p>
        </div>
      </div>
    );

  return (
    <div className="pt-24 pb-20 bg-snow min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 pt-10">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            Call for Abstracts
          </span>
          <h1 className="font-display text-display-2 text-navy mt-3 mb-2">
            Submit Your Abstract
          </h1>
          <p className="text-slate">Deadline: August 1, 2028</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border p-8 space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-navy">Title *</label>
              <span
                className={`text-xs font-mono ${tw > 20 ? "text-crimson font-bold" : "text-slate"}`}
              >
                {tw}/20 words
              </span>
            </div>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Abstract title (max 20 words)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Topic *
            </label>
            <select
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary outline-none"
            >
              <option value="">Select topic</option>
              {ABSTRACT_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Presentation Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESENTATION_TYPES.map((pt) => (
                <button
                  key={pt.value}
                  onClick={() =>
                    setForm({ ...form, presentationType: pt.value })
                  }
                  className={`p-3 rounded-lg border-2 text-sm transition-all ${form.presentationType === pt.value ? "border-primary bg-primary-50 font-semibold" : "border-gray-200 hover:border-gray-300"}`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-navy">Body *</label>
              <span
                className={`text-xs font-mono ${bw > 300 ? "text-crimson font-bold" : "text-slate"}`}
              >
                {bw}/300 words
              </span>
            </div>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={10}
              className="w-full px-4 py-3 rounded-lg border text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              placeholder="Objective, Methods, Results, Conclusion"
            />
            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${bw > 300 ? "bg-crimson" : bw > 250 ? "bg-gold" : "bg-forest"}`}
                style={{ width: `${Math.min((bw / 300) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Co-Authors (up to 10)
            </label>
            {form.coAuthors.map((a, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={a}
                  onChange={(e) => {
                    const u = [...form.coAuthors];
                    u[i] = e.target.value;
                    setForm({ ...form, coAuthors: u });
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border text-sm focus:border-primary outline-none"
                  placeholder={`Co-author ${i + 1}`}
                />
                {form.coAuthors.length > 1 && (
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        coAuthors: form.coAuthors.filter((_, j) => j !== i),
                      })
                    }
                    className="px-3 text-slate hover:text-crimson"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {form.coAuthors.length < 10 && (
              <button
                onClick={() =>
                  setForm({ ...form, coAuthors: [...form.coAuthors, ""] })
                }
                className="text-sm text-primary font-medium hover:underline"
              >
                + Add co-author
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Supporting Document (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <p className="text-sm text-slate">📎 PDF or Word · Max 5MB</p>
            </div>
          </div>
          <div className="flex gap-4 pt-4 border-t">
            <button className="px-6 py-2.5 rounded-lg border text-sm font-medium text-slate hover:bg-gray-50">
              Save Draft
            </button>
            <button
              onClick={() => setSubmitted(true)}
              className="flex-1 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Submit Abstract
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
