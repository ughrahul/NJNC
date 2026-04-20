'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/use-auth';
import { cn } from '@/lib/utils';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/registrations', label: 'Registrations', icon: '📝' },
  { href: '/admin/abstracts', label: 'Abstracts', icon: '📄' },
  { href: '/admin/program', label: 'Program', icon: '📅' },
  { href: '/admin/speakers', label: 'Speakers', icon: '🎤' },
  { href: '/admin/finance', label: 'Finance', icon: '💰' },
  { href: '/admin/emails', label: 'Emails', icon: '📧' },
  { href: '/admin/content', label: 'Content', icon: '✏️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-display text-lg font-bold">NJNC 2028</h2>
          <p className="text-xs text-white/60 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                pathname === item.href
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/60 mb-2">{user?.name}</div>
          <button
            onClick={() => logout()}
            className="text-xs text-crimson-300 hover:text-crimson-200 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-navy">
            {adminNav.find((n) => n.href === pathname)?.label || 'Admin'}
          </h1>
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Back to Site
          </Link>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
