import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discover Nepal",
  description:
    "Explore Nepal's breathtaking landscapes, ancient heritage, vibrant culture, and why you should attend NJNC 2028 in person.",
};

const destinations = [
  {
    title: "Kathmandu Valley",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600",
    desc: "UNESCO World Heritage sites, ancient temples, and vibrant bazaars",
  },
  {
    title: "Everest Region",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600",
    desc: "The world's highest peak and legendary trekking routes",
  },
  {
    title: "Pokhara",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=600",
    desc: "Lakeside paradise with stunning Annapurna reflections",
  },
  {
    title: "Chitwan National Park",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600",
    desc: "One-horned rhinos, Bengal tigers, and jungle safaris",
  },
  {
    title: "Lumbini",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600",
    desc: "Birthplace of Lord Buddha — a UNESCO Heritage site",
  },
  {
    title: "Mustang",
    image: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=600",
    desc: "Hidden Himalayan kingdom with ancient cave temples",
  },
];

const foods = [
  {
    name: "Dal Bhat",
    desc: "The national dish — lentil soup, rice, vegetables, and pickles",
    emoji: "🍛",
  },
  {
    name: "Momo",
    desc: "Nepali-style steamed or fried dumplings — a must-try!",
    emoji: "🥟",
  },
  {
    name: "Thukpa",
    desc: "Hearty Himalayan noodle soup, perfect for cool evenings",
    emoji: "🍜",
  },
  {
    name: "Sel Roti",
    desc: "Traditional ring-shaped fried bread served during festivals",
    emoji: "🍩",
  },
];

const tours = [
  {
    name: "Kathmandu Heritage Walk",
    duration: "1 day",
    cost: "Included",
    highlights: "Pashupatinath, Boudhanath, Durbar Square",
  },
  {
    name: "Pokhara Escape",
    duration: "2 days",
    cost: "$150/person",
    highlights: "Phewa Lake, Sarangkot sunrise, Davis Falls",
  },
  {
    name: "Everest Scenic Flight",
    duration: "Half day",
    cost: "$200/person",
    highlights: "Aerial view of Mt. Everest and the Himalayas",
  },
  {
    name: "Chitwan Safari",
    duration: "2 days",
    cost: "$250/person",
    highlights: "Rhino spotting, jungle walk, Tharu cultural show",
  },
  {
    name: "Lumbini Pilgrimage",
    duration: "1 day",
    cost: "$100/person",
    highlights: "Maya Devi Temple, Peace Flame, monasteries",
  },
];

export default function DiscoverNepalPage() {
  return (
    <div className="pt-24">
      {/* ═══════════════ CINEMATIC HERO ═══════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
            <span className="text-sm">🇳🇵</span>
            <span className="text-xs font-medium text-white/80 uppercase tracking-widest">
              Experience Nepal
            </span>
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Where the Himalayas Meet
            <br />
            <span className="bg-gradient-to-r from-gold via-gold-300 to-gold bg-clip-text text-transparent">
              World-Class Medicine
            </span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            More than a conference destination — Nepal is an experience that
            will stay with you forever.
          </p>
        </div>
      </section>

      {/* ═══════════════ WHY NEPAL ═══════════════ */}
      <section className="py-24 bg-snow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Why Visit
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Why Nepal?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏔️",
                title: "Natural Wonder",
                desc: "Home to 8 of the 14 highest peaks on Earth, diverse ecosystems from tropical jungles to arctic tundra, and unparalleled biodiversity.",
              },
              {
                icon: "🛕",
                title: "Ancient Culture",
                desc: "An 8,000-year-old civilization with 4 UNESCO World Heritage sites in the Kathmandu Valley alone, living traditions, and vibrant festivals.",
              },
              {
                icon: "🙏",
                title: "Warm Hospitality",
                desc: '"Atithi Devo Bhava" — the guest is god. Nepal\'s legendary hospitality, safety for international visitors, and English widely spoken.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-shadow text-center"
              >
                <span className="text-5xl mb-4 block">{item.icon}</span>
                <h3 className="font-display text-xl font-bold text-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DESTINATIONS GALLERY ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Explore
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Must-Visit Destinations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.title}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg cursor-pointer"
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {dest.title}
                  </h3>
                  <p className="text-sm text-white/70">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOD & CULTURE ═══════════════ */}
      <section className="py-24 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Taste & Tradition
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Food & Culture
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {foods.map((food) => (
              <div
                key={food.name}
                className="bg-white rounded-xl p-6 border text-center hover:shadow-md transition-shadow"
              >
                <span className="text-4xl mb-3 block">{food.emoji}</span>
                <h3 className="font-display font-bold text-navy mb-1">
                  {food.name}
                </h3>
                <p className="text-xs text-slate">{food.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 border">
            <h3 className="font-display text-display-4 text-navy mb-4">
              🎭 Festivals in September
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-navy mb-1">Indra Jatra</h4>
                <p className="text-sm text-slate">
                  Kathmandu's biggest street festival — masked dances, chariot
                  processions, and the living goddess Kumari. A spectacular
                  experience if your visit coincides!
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-navy mb-1">Teej</h4>
                <p className="text-sm text-slate">
                  A vibrant women's festival celebrated with red attire,
                  singing, dancing, and fasting. Witness the joyous atmosphere
                  across Kathmandu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TOURS ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Extend Your Stay
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Tour Suggestions
            </h2>
            <p className="text-slate mt-2">
              Explore beyond Kathmandu before or after the conference.
            </p>
          </div>
          <div className="space-y-4">
            {tours.map((tour) => (
              <div
                key={tour.name}
                className="bg-snow rounded-xl p-6 border flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="font-display font-bold text-navy">
                    {tour.name}
                  </h3>
                  <p className="text-sm text-slate mt-1">{tour.highlights}</p>
                </div>
                <div className="flex items-center gap-6 text-sm flex-shrink-0">
                  <span className="text-slate">⏱ {tour.duration}</span>
                  <span className="font-semibold text-primary">
                    {tour.cost}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRAVEL QUICK REF ═══════════════ */}
      <section className="py-24 bg-snow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-8 border">
            <h2 className="font-display text-display-4 text-navy mb-6">
              🧳 Quick Travel Reference
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm">
                  <strong className="text-navy">🌤️ Weather (September):</strong>{" "}
                  <span className="text-slate">18–28°C, monsoon tail-end</span>
                </div>
                <div className="text-sm">
                  <strong className="text-navy">🔌 Voltage:</strong>{" "}
                  <span className="text-slate">
                    230V, 50Hz (Type C/D/M plugs)
                  </span>
                </div>
                <div className="text-sm">
                  <strong className="text-navy">🚗 Driving side:</strong>{" "}
                  <span className="text-slate">Left</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <strong className="text-navy">💱 Currency:</strong>{" "}
                  <span className="text-slate">
                    Nepali Rupee (NPR), ATMs available
                  </span>
                </div>
                <div className="text-sm">
                  <strong className="text-navy">📞 Emergency:</strong>{" "}
                  <span className="text-slate">
                    Police: 100, Tourist Police: 1144
                  </span>
                </div>
                <div className="text-sm">
                  <strong className="text-navy">🛂 Visa:</strong>{" "}
                  <span className="text-slate">
                    On arrival for most nationalities
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/travel"
              className="inline-flex items-center text-primary font-semibold mt-6 hover:text-primary-700 transition-colors"
            >
              View Full Visa & Travel Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="py-20 bg-gradient-to-r from-crimson via-crimson-600 to-crimson-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-display-2 mb-4">
            Experience Nepal. Advance Medicine.
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Don't just attend — experience the magic of Nepal alongside
            world-class neuroscience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-crimson px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              Register Now
            </Link>
            <Link
              href="/submit-abstract"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Submit Abstract
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
