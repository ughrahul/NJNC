"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { cn } from "@/lib/utils";

const portalNav = [
  { href: "/portal", label: "Dashboard", icon: "🏠" },
  { href: "/portal/abstracts", label: "My Abstracts", icon: "📄" },
  { href: "/portal/schedule", label: "My Schedule", icon: "📅" },
  { href: "/portal/profile", label: "Profile", icon: "👤" },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-snow">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r flex flex-col">
        <div className="p-5 border-b">
          <h2 className="font-display text-lg font-bold text-navy">
            My Portal
          </h2>
          <p className="text-xs text-slate mt-1">{user?.name}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {portalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-slate hover:text-navy hover:bg-gray-50",
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t">
          <Link
            href="/"
            className="block px-3 py-2 text-sm text-slate hover:text-navy transition-colors"
          >
            ← Back to Site
          </Link>
          <button
            onClick={() => logout()}
            className="block px-3 py-2 text-sm text-crimson hover:text-crimson-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
