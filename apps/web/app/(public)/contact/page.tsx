'use client';
import { useState } from 'react';
import { CONFERENCE, INQUIRY_TYPES } from '@njnc/utils';

const faqs = [
  { q: 'Who can attend NJNC 2028?', a: 'Medical professionals, researchers, students, and allied health workers from around the world.' },
  { q: 'How do I pay the registration fee?', a: 'National delegates scan the QR code. International delegates use bank transfer. Upload proof after payment.' },
  { q: 'What is the abstract submission deadline?', a: 'August 1, 2028. Decisions will be communicated by August 31, 2028.' },
  { q: 'Do I need a visa for Nepal?', a: 'Most nationalities get visa on arrival. Indian citizens are visa-free. Check /travel for details.' },
  { q: 'Is CME accreditation available?', a: 'Yes, up to 20 CME credits accredited by the Nepal Medical Council.' },
  { q: 'Can I get an invitation letter?', a: 'Yes, registered attendees can request one through the attendee portal.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">Get in Touch</span>
          <h1 className="font-display text-display-1 mt-3 mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">We&apos;re here to help with any questions about NJNC 2028.</p>
        </div>
      </section>

      <section className="py-20 bg-snow">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            {sent ? (
              <div className="text-center py-8">
                <span className="text-4xl block mb-4">✅</span>
                <h2 className="font-display text-display-4 text-navy mb-2">Message Sent!</h2>
                <p className="text-slate text-sm">We&apos;ll get back to you within 24-48 hours.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="font-display text-display-4 text-navy">Send a Message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary outline-none" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Inquiry Type *</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border text-sm focus:border-primary outline-none">
                      <option value="">Select type</option>
                      {INQUIRY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Message *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full px-4 py-3 rounded-lg border text-sm focus:border-primary outline-none resize-none" />
                </div>
                <button onClick={() => setSent(true)} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">Send Message</button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border"><h3 className="font-display font-bold text-navy mb-3">📍 Venue</h3><p className="text-sm text-slate">{CONFERENCE.venue.name}<br/>{CONFERENCE.venue.address}</p></div>
            <div className="bg-white rounded-xl p-6 border"><h3 className="font-display font-bold text-navy mb-3">📧 Email</h3><p className="text-sm text-slate">info@njnc2028.com</p></div>
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-display font-bold text-navy mb-3">💬 Conference Secretary</h3>
              <p className="text-sm text-slate mb-3">{CONFERENCE.secretary.name}</p>
              <a href={`https://wa.me/${CONFERENCE.secretary.whatsapp}`} className="inline-flex items-center gap-2 bg-forest text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-forest-700 transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-display-2 text-navy mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-snow rounded-xl border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-navy text-sm">{faq.q}</span>
                  <span className={`text-primary transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-slate">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
