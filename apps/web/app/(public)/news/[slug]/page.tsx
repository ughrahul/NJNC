import Link from 'next/link';

const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  'registration-open': { title: 'Registration Now Open for NJNC 2028', date: 'April 15, 2028', category: 'Conference Update', content: 'We are excited to announce that registration for the 6th Nepal Japan Neurological Conference is now open. The conference will take place on September 18-19, 2028 at the prestigious Hotel Radisson Blu in Kathmandu, Nepal.\n\nAll four delegate categories are available: International ($300), SAARC ($150), National (NPR), and Resident/MO/Paramedics ($75). Each registration includes full conference access, CME certificates, conference materials, and welcome dinner.\n\nPayment is accepted via bank transfer (international) or QR code payment (national). Register now to secure your spot!' },
  'abstract-deadline': { title: 'Call for Abstracts — Deadline August 1', date: 'April 10, 2028', category: 'Deadline', content: 'We invite researchers and clinicians to submit abstracts for oral or poster presentation at NJNC 2028. Topics include Epilepsy Surgery, Neuroimaging, Genetics, Pediatric Epilepsy, Neuroimmunology, Stroke, Movement Disorders, and more.\n\nAbstracts should not exceed 300 words with a title of maximum 20 words. Decisions will be communicated by August 31, 2028.' },
  'keynote-speakers': { title: 'Keynote Speakers Announced', date: 'March 28, 2028', category: 'Speaker Announcement', content: 'We are honored to welcome distinguished keynote speakers including Prof. Takeshi Yamamoto from Tokyo Medical University and Prof. Sarah Chen from Johns Hopkins University. More speakers will be announced soon.' },
};

export default function NewsPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) return <div className="pt-32 text-center text-slate"><h1 className="font-display text-display-2 text-navy">Post Not Found</h1><Link href="/news" className="text-primary mt-4 inline-block">← Back to News</Link></div>;

  return (
    <div className="pt-24 pb-20 bg-snow min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <Link href="/news" className="text-sm text-primary hover:underline mb-6 inline-block">← Back to News</Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700">{post.category}</span>
          <span className="text-xs text-slate">{post.date}</span>
        </div>
        <h1 className="font-display text-display-2 text-navy mb-8">{post.title}</h1>
        <div className="prose prose-slate max-w-none">
          {post.content.split('\n\n').map((p, i) => <p key={i} className="text-slate leading-relaxed mb-4">{p}</p>)}
        </div>
      </div>
    </div>
  );
}
