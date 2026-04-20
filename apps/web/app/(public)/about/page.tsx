import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about NJNC 2028 — conference history, organizing bodies, venue, and CME accreditation.",
};

const timeline = [
  {
    year: "2016",
    title: "1st NJNC",
    location: "Kathmandu",
    desc: "Inaugural conference with 200 attendees",
  },
  {
    year: "2018",
    title: "2nd NJNC",
    location: "Kathmandu",
    desc: "Expanded to SAARC countries",
  },
  {
    year: "2020",
    title: "3rd NJNC",
    location: "Virtual",
    desc: "First virtual edition due to COVID-19",
  },
  {
    year: "2022",
    title: "4th NJNC",
    location: "Kathmandu",
    desc: "Return to in-person with 400+ attendees",
  },
  {
    year: "2024",
    title: "5th NJNC",
    location: "Kathmandu",
    desc: "Record 600 attendees from 35 countries",
  },
  {
    year: "2028",
    title: "6th NJNC",
    location: "Kathmandu",
    desc: "You are here! Register now.",
  },
];

const partners = [
  { name: "Nepal Epilepsy Society (NES)", role: "Primary Organizer" },
  {
    name: "International League Against Epilepsy (ILAE)",
    role: "International Partner",
  },
  { name: "Japan Neuroscience Society", role: "Academic Partner" },
  { name: "SAARC Neurology Association", role: "Regional Partner" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            About the Conference
          </span>
          <h1 className="font-display text-display-1 mt-3 mb-4">NJNC 2028</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            The Nepal Japan Neurological Conference brings together leading
            neurologists, epileptologists, and neuroscientists from Japan,
            Nepal, SAARC nations, and the world.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-display-3 text-navy mb-4">
                Conference Overview
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                NJNC 2028 is the 6th edition of the Nepal Japan Neurological
                Conference, the premier neuroscience event in South Asia.
                Organized jointly by the Nepal Epilepsy Society (NES) and the
                International League Against Epilepsy (ILAE), the conference
                serves as a vital platform for exchanging knowledge, sharing
                research, and building collaborative networks.
              </p>
              <p className="text-slate leading-relaxed">
                The 2028 edition focuses on epilepsy surgery, neuroimaging,
                genetics, and movement disorders, featuring keynote lectures by
                world-renowned neurologists, interactive workshops, and an
                extensive poster session for emerging researchers.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="font-display font-bold text-navy mb-2">
                  🎯 Mission
                </h3>
                <p className="text-sm text-slate">
                  To advance neurological care and research in South Asia
                  through international collaboration and knowledge exchange.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="font-display font-bold text-navy mb-2">
                  🏥 CME Credits
                </h3>
                <p className="text-sm text-slate">
                  NJNC 2028 is accredited for up to 20 CME credits by the Nepal
                  Medical Council. Certificates are issued post-conference.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="font-display font-bold text-navy mb-2">
                  🌏 Global Reach
                </h3>
                <p className="text-sm text-slate">
                  Attendees from 30+ countries, 50+ invited speakers, and
                  collaborative partnerships across Asia and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Conference Timeline
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex items-center gap-8 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div
                  className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <div
                    className={`bg-white rounded-xl p-5 border shadow-sm inline-block ${item.year === "2028" ? "border-gold bg-gold-50" : ""}`}
                  >
                    <div className="font-display text-2xl font-bold text-primary mb-1">
                      {item.year}
                    </div>
                    <div className="font-semibold text-navy text-sm mb-1">
                      {item.title} — {item.location}
                    </div>
                    <p className="text-xs text-slate">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md flex-shrink-0 z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Collaboration
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Partner Organizations
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-xl p-6 border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="font-display text-sm font-bold text-navy mb-1">
                  {p.name}
                </h3>
                <p className="text-xs text-slate">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-display-3 mb-4">
            Be Part of NJNC 2028
          </h2>
          <p className="text-white/70 mb-8">
            Join us in Kathmandu for two days of cutting-edge neuroscience and
            the beauty of Nepal.
          </p>
          <Link
            href="/register"
            className="inline-flex bg-gold hover:bg-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
