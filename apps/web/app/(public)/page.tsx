import Link from "next/link";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { CONFERENCE, DELEGATE_CATEGORIES, ABSTRACT_TOPICS } from "@njnc/utils";

const stats = [
  { value: "50+", label: "Speakers" },
  { value: "30+", label: "Countries" },
  { value: "20", label: "CME Credits" },
  { value: "2", label: "Days" },
];

const nepalImages = [
  {
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    alt: "Mount Everest at sunrise",
    title: "Himalayas",
  },
  {
    src: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
    alt: "Boudhanath Stupa",
    title: "Heritage",
  },
  {
    src: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=800",
    alt: "Phewa Lake Pokhara",
    title: "Nature",
  },
];

const categories = [
  {
    name: "International",
    price: "$300",
    features: [
      "Full conference access",
      "CME certificate",
      "Conference materials",
      "Welcome dinner",
    ],
  },
  {
    name: "SAARC",
    price: "$150",
    features: [
      "Full conference access",
      "CME certificate",
      "Conference materials",
      "Welcome dinner",
    ],
  },
  {
    name: "National",
    price: "NPR (See QR)",
    features: [
      "Full conference access",
      "CME certificate",
      "Conference materials",
      "Welcome dinner",
    ],
  },
  {
    name: "Resident / MO / Paramedics",
    price: "$75",
    features: [
      "Full conference access",
      "CME certificate",
      "Conference materials",
    ],
  },
];

const faqTopics = ABSTRACT_TOPICS.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-primary-900 to-navy" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/50" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-crimson/3 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            <span className="text-xs font-medium text-white/80 uppercase tracking-widest">
              Registration Open
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Nepal Japan
            <br />
            <span className="bg-gradient-to-r from-gold via-gold-300 to-gold bg-clip-text text-transparent">
              Neurological Conference
            </span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Uniting world-class neuroscience with the majesty of the Himalayas.
            <br className="hidden sm:block" />
            September 18–19, 2028 · Hotel Radisson Blu, Kathmandu
          </p>

          {/* Countdown */}
          <div className="flex justify-center mb-10">
            <CountdownTimer targetDate={CONFERENCE.dates.start} />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-2xl shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
            >
              Register Now
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/submit-abstract"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              Submit Abstract
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="relative -mt-16 z-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ NEPAL TEASER ═══════════════ */}
      <section className="py-24 bg-snow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Beyond the Conference
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3 mb-4">
              Discover Nepal
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              Experience the breathtaking landscapes, ancient temples, and warm
              hospitality that make Nepal truly extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nepalImages.map((img) => (
              <Link
                key={img.title}
                href="/discover-nepal"
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {img.title}
                  </h3>
                  <span className="text-sm text-white/70 group-hover:text-gold transition-colors">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Registration
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3 mb-4">
              Delegate Categories
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              Choose the category that best fits your profile. All categories
              include full conference access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className={`rounded-2xl p-6 border-2 transition-all hover:-translate-y-1 hover:shadow-xl ${
                  i === 0
                    ? "border-gold bg-gradient-to-b from-gold-50 to-white shadow-lg"
                    : "border-gray-100 bg-white"
                }`}
              >
                {i === 0 && (
                  <div className="inline-block bg-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  {cat.name}
                </h3>
                <div className="font-display text-3xl font-bold text-primary mb-4">
                  {cat.price}
                </div>
                <ul className="space-y-2 mb-6">
                  {cat.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate"
                    >
                      <svg
                        className="w-4 h-4 text-forest flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    i === 0
                      ? "bg-gold text-white hover:bg-gold-700"
                      : "bg-primary-50 text-primary hover:bg-primary-100"
                  }`}
                >
                  Register
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CALL FOR ABSTRACTS ═══════════════ */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-navy to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-crimson/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            Call for Abstracts
          </span>
          <h2 className="font-display text-display-2 mt-3 mb-4">
            Share Your Research
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Submit your abstract for oral or poster presentation. Accepted
            abstracts will be published in the conference proceedings.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {faqTopics.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10"
              >
                {topic}
              </span>
            ))}
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gold border border-gold/30">
              + {ABSTRACT_TOPICS.length - 6} more
            </span>
          </div>

          <Link
            href="/submit-abstract"
            className="inline-flex items-center bg-gold hover:bg-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-2xl shadow-gold/25"
          >
            Submit Your Abstract
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════ VENUE ═══════════════ */}
      <section className="py-24 bg-snow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">
                Conference Venue
              </span>
              <h2 className="font-display text-display-2 text-navy mt-3 mb-4">
                {CONFERENCE.venue.name}
              </h2>
              <p className="text-slate leading-relaxed mb-6">
                Located in the heart of Kathmandu's diplomatic district of
                Lazimpat, Hotel Radisson Blu offers world-class conference
                facilities with stunning views of the Himalayan range. The hotel
                features state-of-the-art meeting halls, premium accommodation,
                and easy access to Kathmandu's cultural landmarks.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate">
                  <span className="text-lg">📍</span> {CONFERENCE.venue.address}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate">
                  <span className="text-lg">🏔️</span> Panoramic Himalayan views
                </div>
                <div className="flex items-center gap-3 text-sm text-slate">
                  <span className="text-lg">✈️</span> 6 km from Tribhuvan
                  International Airport
                </div>
              </div>
              <Link
                href="/venue"
                className="inline-flex items-center text-primary font-semibold hover:text-primary-700 transition-colors"
              >
                View Venue Details
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="Hotel Radisson Blu Kathmandu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="py-20 bg-gradient-to-r from-crimson via-crimson-600 to-crimson-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-display-2 mb-4">
            Experience Nepal. Advance Medicine.
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join leading neurologists from around the world at NJNC 2028. Don't
            miss this unique opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-crimson px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              Register Now
            </Link>
            <Link
              href="/discover-nepal"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Discover Nepal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
