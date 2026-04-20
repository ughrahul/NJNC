import type { Metadata } from "next";
import Link from "next/link";
import { CONFERENCE } from "@njnc/utils";

export const metadata: Metadata = {
  title: "Visa & Travel Information",
  description:
    "Visa requirements, travel health, weather, currency, and emergency contacts for NJNC 2028 attendees.",
};

const visaFree = ["India"];
const visaOnArrival = [
  "USA",
  "UK",
  "Japan",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "South Korea",
  "China",
  "Brazil",
  "Most other countries",
];

const healthTips = [
  {
    title: "Altitude",
    desc: "Kathmandu is at 1,400m. Not an issue for most, but stay hydrated. Higher-altitude trips require acclimatization.",
  },
  {
    title: "Vaccinations",
    desc: "No mandatory vaccines for Nepal, but Hepatitis A/B, Typhoid, and Tetanus are recommended. Consult your travel clinic.",
  },
  {
    title: "Water",
    desc: "Drink only bottled or filtered water. Bottled water is widely available and inexpensive (NPR 20–40).",
  },
  {
    title: "Insurance",
    desc: "Comprehensive travel and medical insurance is strongly recommended for all international attendees.",
  },
];

const embassies = [
  { country: "🇮🇳 India", phone: "+977-1-4410900" },
  { country: "🇺🇸 USA", phone: "+977-1-4234000" },
  { country: "🇯🇵 Japan", phone: "+977-1-4426680" },
  { country: "🇬🇧 UK", phone: "+977-1-4237100" },
  { country: "🇦🇺 Australia", phone: "+977-1-4371678" },
];

export default function TravelPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">
            Plan Your Trip
          </span>
          <h1 className="font-display text-display-1 mt-3 mb-4">
            Visa & Travel
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Everything you need to know about traveling to Kathmandu for NJNC
            2028.
          </p>
        </div>
      </section>

      {/* Visa */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-display-3 text-navy mb-8">
            🛂 Visa Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-display font-bold text-forest mb-3">
                ✅ Visa-Free Entry
              </h3>
              <p className="text-sm text-slate mb-3">
                Citizens of India do not require a visa to enter Nepal.
              </p>
              <div className="flex flex-wrap gap-2">
                {visaFree.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-3 py-1 bg-forest-50 text-forest-700 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="font-display font-bold text-primary mb-3">
                🛬 Visa on Arrival
              </h3>
              <p className="text-sm text-slate mb-3">
                Available at Tribhuvan International Airport for most
                nationalities.
              </p>
              <div className="flex flex-wrap gap-2">
                {visaOnArrival.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-3 py-1 bg-primary-50 text-primary-700 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 border">
            <h3 className="font-display font-bold text-navy mb-3">
              📋 What You Need
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-slate">
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span> Passport valid
                  for 6+ months
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span> 2 passport-size
                  photos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span> Visa fee in USD
                  (15/30/90 days: $30/$50/$125)
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-slate">
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span> Return ticket
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span> Hotel booking
                  confirmation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">✓</span> Online form:{" "}
                  <a
                    href="https://nepaliport.immigration.gov.np"
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    nepaliport.immigration.gov.np
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Letter */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-gold-50 to-primary-50 rounded-2xl p-8 border flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="font-display text-display-4 text-navy mb-3">
                📄 Need an Invitation Letter?
              </h2>
              <p className="text-sm text-slate mb-4">
                Registered attendees can request a formal invitation letter for
                visa purposes. The letter will be generated and available in
                your attendee portal.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center text-primary font-semibold hover:text-primary-700 transition-colors"
              >
                Register first to request a letter →
              </Link>
            </div>
            <div className="text-6xl">📬</div>
          </div>
        </div>
      </section>

      {/* Weather */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-display-3 text-navy mb-8">
            🌤️ Weather in September
          </h2>
          <div className="bg-white rounded-xl p-6 border">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🌡️</div>
                <div className="font-display text-2xl font-bold text-primary">
                  18–28°C
                </div>
                <p className="text-xs text-slate mt-1">Temperature range</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌧️</div>
                <div className="font-display text-2xl font-bold text-primary">
                  Moderate
                </div>
                <p className="text-xs text-slate mt-1">
                  Monsoon tail-end, occasional rain
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">👕</div>
                <div className="font-display text-2xl font-bold text-primary">
                  Light layers
                </div>
                <p className="text-xs text-slate mt-1">Umbrella recommended</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-display-3 text-navy mb-8">
            🏥 Travel Health
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {healthTips.map((tip) => (
              <div key={tip.title} className="bg-snow rounded-xl p-6 border">
                <h3 className="font-display font-bold text-navy mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currency & Emergencies */}
      <section className="py-20 bg-snow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-display-4 text-navy mb-6">
                💱 Currency
              </h2>
              <div className="bg-white rounded-xl p-6 border space-y-3">
                <p className="text-sm text-slate">
                  <strong>Nepali Rupee (NPR)</strong> — 1 USD ≈ 133 NPR
                </p>
                <p className="text-sm text-slate">
                  ATMs are widely available in Kathmandu. Major credit cards
                  accepted at hotels and restaurants.
                </p>
                <p className="text-sm text-slate">
                  Money exchange available at the airport and in Thamel area.
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-display-4 text-navy mb-6">
                🚨 Emergency Contacts
              </h2>
              <div className="bg-white rounded-xl p-6 border space-y-3">
                <p className="text-sm text-slate">
                  <strong>Nepal Police:</strong> 100
                </p>
                <p className="text-sm text-slate">
                  <strong>Tourist Police:</strong> 1144
                </p>
                <p className="text-sm text-slate">
                  <strong>Ambulance:</strong> 102
                </p>
                <p className="text-sm text-slate">
                  <strong>Conference Secretary:</strong>{" "}
                  {CONFERENCE.secretary.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display text-display-5 text-navy mb-4">
              🏛️ Embassies in Kathmandu
            </h3>
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {embassies.map((e) => (
                <div
                  key={e.country}
                  className="bg-white rounded-lg p-3 border text-center"
                >
                  <div className="text-sm font-medium text-navy">
                    {e.country}
                  </div>
                  <div className="text-xs text-slate">{e.phone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
