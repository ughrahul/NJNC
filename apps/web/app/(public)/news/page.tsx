import type { Metadata } from 'next';
import Link from 'next/link';
import { NEWS_CATEGORIES } from '@njnc/utils';

export const metadata: Metadata = { title: 'News & Updates', description: 'Latest news, announcements, and updates for NJNC 2028.' };

const posts = [
  { slug: 'registration-open', title: 'Registration Now Open for NJNC 2028', date: 'April 15, 2028', category: 'Conference Update', excerpt: 'We are excited to announce that registration for the 6th Nepal Japan Neurological Conference is now open.' },
  { slug: 'abstract-deadline', title: 'Call for Abstracts — Deadline August 1', date: 'April 10, 2028', category: 'Deadline', excerpt: 'Submit your abstracts for oral or poster presentation. Topics include epilepsy, neuroimaging, and more.' },
  { slug: 'keynote-speakers', title: 'Keynote Speakers Announced', date: 'March 28, 2028', category: 'Speaker Announcement', excerpt: 'We are honored to welcome Prof. Takeshi Yamamoto and Prof. Sarah Chen as keynote speakers.' },
  { slug: 'venue-confirmed', title: 'Venue Confirmed: Hotel Radisson Blu', date: 'March 15, 2028', category: 'Venue', excerpt: 'The conference will be held at Hotel Radisson Blu, Lazimpat, Kathmandu with panoramic Himalayan views.' },
  { slug: 'early-bird', title: 'Early Bird Registration Ends July 31', date: 'March 1, 2028', category: 'Deadline', excerpt: 'Register before July 31 to take advantage of early bird rates across all delegate categories.' },
  { slug: 'cme-accreditation', title: 'CME Accreditation Confirmed — 20 Credits', date: 'Feb 20, 2028', category: 'General', excerpt: 'NJNC 2028 has been accredited for 20 CME credits by the Nepal Medical Council.' },
];

export default function NewsPage() {
  return (
    <div className="pt-24">
      <section className="py-20 bg-gradient-to-br from-primary-900 to-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-gold uppercase tracking-widest">Stay Informed</span>
          <h1 className="font-display text-display-1 mt-3 mb-4">News & Updates</h1>
        </div>
      </section>

      <section className="py-16 bg-snow">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link key={post.slug} href={`/news/${post.slug}`} className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="h-40 bg-gradient-to-br from-primary-100 to-gold-50 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📰</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">{post.category}</span>
                    <span className="text-xs text-slate">{post.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-navy text-sm group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                  <p className="text-xs text-slate line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
