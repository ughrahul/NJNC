import type { Metadata } from "next";
import Link from "next/link";
import { CONFERENCE } from "@njnc/utils";

export const metadata: Metadata = {
  title: "Venue & Accommodation",
  description:
    "Conference venue Hotel Radisson Blu Kathmandu — facilities, nearby hotels, and airport transfer information.",
};

const nearbyHotels = [
  {
    name: "Hotel Yak & Yeti",
    stars: 5,
    distance: "1.5 km",
    price: "$120–$180/night",
    desc: "Heritage luxury hotel with garden",
  },
  {
    name: "Hotel Shanker",
    stars: 4,
    distance: "0.8 km",
    price: "$80–$120/night",
    desc: "Neo-classical palace hotel",
  },
  {
    name: "Hotel Marshyangdi",
    stars: 3,
    distance: "0.5 km",
    price: "$40–$70/night",
    desc: "Clean, comfortable, budget-friendly",
  },
  {
    name: "Kathmandu Guest House",
    stars: 3,
    distance: "2 km",
    price: "$30–$60/night",
    desc: "Iconic Thamel location, great value",
  },
];

const facilities = [
  { icon: "🎤", label: "Hall A", desc: "500-seat plenary hall with full AV" },
  { icon: "🏛️", label: "Hall B", desc: "200-seat secondary hall" },
  {
    icon: "🔬",
    label: "Workshop Room",
    desc: "80-seat hands-on workshop space",
  },
  {
    icon: "🖼️",
    label: "Exhibition Area",
    desc: "Poster boards and E-poster stations",
  },
  {
    icon: "🍽️",
    label: "Dining Hall",
    desc: "Buffet dining with international cuisine",
  },
  {
    icon: "📶",
    label: "High-Speed WiFi",
    desc: "Complimentary throughout venue",
  },
];

export default function VenuePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            Conference Venue
          </span>
          <h1 className="font-display text-display-1 mt-3 mb-4">
            {CONFERENCE.venue.name}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {CONFERENCE.venue.address} — World-class facilities in the heart of
            Kathmandu.
          </p>
        </div>
      </section>

      {/* Main Venue */}
      <section className="py-20 bg-snow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="Hotel Radisson Blu Kathmandu"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-display-3 text-navy mb-4">
                About the Venue
              </h2>
              <p className="text-slate leading-relaxed mb-6">
                The Radisson Hotel Kathmandu is a 5-star property located in
                Lazimpat, Kathmandu's most prestigious diplomatic and
                residential quarter. With panoramic views of the Himalayan range
                and the Kathmandu valley floor, the hotel offers an
                inspirational setting for scientific exchange.
              </p>
              <p className="text-slate leading-relaxed mb-6">
                The hotel features three dedicated conference halls, a large
                exhibition area, premium dining facilities, and 200+ rooms for
                convenient on-site accommodation.
              </p>
              <a
                href={CONFERENCE.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:text-primary-700 transition-colors"
              >
                📍 View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              What's Available
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Conference Facilities
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => (
              <div
                key={f.label}
                className="bg-snow rounded-xl p-6 border hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-display font-bold text-navy text-sm mb-1">
                  {f.label}
                </h3>
                <p className="text-xs text-slate">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Hotels */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">
              Accommodation
            </span>
            <h2 className="font-display text-display-2 text-navy mt-3">
              Nearby Hotels
            </h2>
            <p className="text-slate mt-2">
              Alternative accommodation options at various price points.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {nearbyHotels.map((hotel) => (
              <div
                key={hotel.name}
                className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-navy">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <span key={i} className="text-gold text-xs">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {hotel.price}
                  </span>
                </div>
                <p className="text-sm text-slate mb-2">{hotel.desc}</p>
                <span className="text-xs text-slate">
                  📍 {hotel.distance} from venue
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl p-8 border">
            <h2 className="font-display text-display-4 text-navy mb-4">
              ✈️ Getting to the Venue
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-navy mb-2">From Airport</h3>
                <p className="text-sm text-slate">
                  Tribhuvan International Airport (TIA) is only 6 km from the
                  hotel. Taxi fare: approx. NPR 700–1000 ($5–8). Most hotels
                  offer airport pickup service.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2">Getting Around</h3>
                <p className="text-sm text-slate">
                  Taxis and ride-sharing (inDrive, Pathao) are readily
                  available. The hotel is walking distance to Thamel tourist
                  district and major embassies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-display-3 mb-4">
            Ready to Join Us?
          </h2>
          <p className="text-white/70 mb-8">
            Secure your spot at NJNC 2028 and experience Kathmandu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-gold hover:bg-gold-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg"
            >
              Register Now
            </Link>
            <Link
              href="/travel"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Visa & Travel Info
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
