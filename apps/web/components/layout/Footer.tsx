"use client";

import Link from "next/link";
import { CONFERENCE } from "@njnc/utils";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/speakers", label: "Speakers" },
  { href: "/program", label: "Program" },
  { href: "/discover-nepal", label: "Discover Nepal" },
  { href: "/venue", label: "Venue & Travel" },
  { href: "/committee", label: "Committee" },
];

const resources = [
  { href: "/register", label: "Register Now" },
  { href: "/submit-abstract", label: "Submit Abstract" },
  { href: "/news", label: "News & Updates" },
  { href: "/contact", label: "Contact Us" },
  { href: "/travel", label: "Visa & Travel" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Nepal-inspired gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-crimson via-gold to-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Conference Info */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">
              <span className="text-crimson">NJNC</span> 2028
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Nepal Japan Neurological Conference
              <br />
              September 18–19, 2028
              <br />
              {CONFERENCE.venue.name}
              <br />
              {CONFERENCE.venue.city}, {CONFERENCE.venue.country}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${CONFERENCE.secretary.whatsapp}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-forest/30 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.627-1.475A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.17 0-4.207-.69-5.871-1.865l-.42-.281-2.748.877.87-2.65-.302-.466A9.705 9.705 0 012.25 12 9.75 9.75 0 0112 2.25 9.75 9.75 0 0121.75 12 9.75 9.75 0 0112 21.75z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-white/60 mb-3">
              Get the latest conference updates.
            </p>
            <form
              className="flex gap-2 mb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-gold hover:bg-gold-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                →
              </button>
            </form>
            <div className="text-sm text-white/60 space-y-1">
              <p>📧 info@njnc2028.com</p>
              <p>📞 {CONFERENCE.secretary.phone}</p>
              <p>📍 {CONFERENCE.venue.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2028 Nepal Japan Neurological Conference. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link href="#" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
