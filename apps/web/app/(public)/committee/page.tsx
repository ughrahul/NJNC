import type { Metadata } from "next";
import { CONFERENCE } from "@njnc/utils";

export const metadata: Metadata = {
  title: "Committee",
  description:
    "Meet the organizing, scientific, and advisory committees of NJNC 2028.",
};

const organizing = [
  {
    name: "Prof. Upendra Devkota",
    role: "Conference President",
    institution: "Annapurna Neurological Institute",
  },
  {
    name: "Ms. Medhawee Nepal",
    role: "Conference Secretary",
    institution: "NES Secretariat",
  },
  {
    name: "Dr. Basant Pant",
    role: "Finance Coordinator",
    institution: "Annapurna Neurological Institute",
  },
  {
    name: "Dr. Reema Rajbhandari",
    role: "Scientific Chair",
    institution: "TU Teaching Hospital",
  },
];

const scientific = [
  { name: "Prof. Takeshi Yamamoto", country: "🇯🇵 Japan" },
  { name: "Prof. Sarah Chen", country: "🇺🇸 USA" },
  { name: "Prof. Hiroshi Tanaka", country: "🇯🇵 Japan" },
  { name: "Dr. Anjali Sharma", country: "🇮🇳 India" },
  { name: "Prof. Kenji Suzuki", country: "🇯🇵 Japan" },
  { name: "Dr. Rajesh Khadka", country: "🇳🇵 Nepal" },
];

const advisory = [
  { name: "Prof. Emeritus Satoshi Kamei", country: "🇯🇵 Japan" },
  { name: "Prof. Emeritus Krishna Shahi", country: "🇳🇵 Nepal" },
  { name: "Prof. B.S. Joshi", country: "🇮🇳 India" },
];

export default function CommitteePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            Our Team
          </span>
          <h1 className="font-display text-display-1 mt-3 mb-4">Committee</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            The dedicated team behind NJNC 2028 — organizing a world-class
            neurology event.
          </p>
        </div>
      </section>

      {/* Organizing Committee */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-display-3 text-navy mb-8 text-center">
            Organizing Committee
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {organizing.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center text-white text-xl font-display font-bold mx-auto mb-4">
                  {member.name.split(" ").slice(-1)[0][0]}
                  {member.name.split(" ")[0][0]}
                </div>
                <h3 className="font-display font-bold text-navy text-sm">
                  {member.name}
                </h3>
                <p className="text-xs text-gold font-semibold mt-1">
                  {member.role}
                </p>
                <p className="text-xs text-slate mt-1">{member.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Committee */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-display-3 text-navy mb-8 text-center">
            Scientific Committee
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scientific.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-4 bg-snow rounded-xl p-4 border"
              >
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary font-display font-bold flex-shrink-0">
                  {member.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy text-sm">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate">{member.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-display-3 text-navy mb-8 text-center">
            Advisory Board
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {advisory.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border"
              >
                <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center text-gold font-display font-bold flex-shrink-0">
                  {member.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy text-sm">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate">{member.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secretary Contact */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-display-3 mb-3">
            Conference Secretary
          </h2>
          <p className="text-xl font-semibold mb-1">
            {CONFERENCE.secretary.name}
          </p>
          <p className="text-white/70 mb-6">
            For any queries, reach out directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${CONFERENCE.secretary.whatsapp}`}
              className="inline-flex items-center justify-center gap-2 bg-forest text-white px-6 py-3 rounded-xl font-semibold hover:bg-forest-700 transition-colors"
            >
              💬 WhatsApp
            </a>
            <a
              href={`tel:${CONFERENCE.secretary.phone}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              📞 {CONFERENCE.secretary.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
