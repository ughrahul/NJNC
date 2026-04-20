"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/speakers", label: "Speakers" },
  { href: "/program", label: "Program" },
  { href: "/discover-nepal", label: "Discover Nepal" },
  { href: "/venue", label: "Venue" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                "font-display font-bold transition-colors",
                scrolled ? "text-navy" : "text-white",
                "text-xl sm:text-2xl",
              )}
            >
              <span className="text-crimson">NJNC</span> 2028
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? scrolled
                      ? "text-primary bg-primary-50"
                      : "text-white bg-white/20"
                    : scrolled
                      ? "text-slate hover:text-navy hover:bg-gray-50"
                      : "text-white/80 hover:text-white hover:bg-white/10",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="hidden sm:inline-flex bg-gold hover:bg-gold-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-gold/25"
            >
              Register Now
            </Link>
            <Link
              href="/login"
              className={cn(
                "hidden md:inline-flex px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                scrolled
                  ? "text-primary hover:bg-primary-50"
                  : "text-white/90 hover:bg-white/10",
              )}
            >
              Sign In
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                scrolled
                  ? "text-navy hover:bg-gray-100"
                  : "text-white hover:bg-white/10",
              )}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-in slide-in-from-right">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-xl text-navy">
                  <span className="text-crimson">NJNC</span> 2028
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-slate hover:text-navy"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary-50"
                      : "text-slate hover:text-navy hover:bg-gray-50",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 space-y-2 border-t">
              <Link
                href="/register"
                className="block w-full text-center bg-gold text-white px-4 py-3 rounded-lg text-sm font-semibold"
              >
                Register Now
              </Link>
              <Link
                href="/login"
                className="block w-full text-center text-primary px-4 py-3 rounded-lg text-sm font-medium border border-primary/20"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
