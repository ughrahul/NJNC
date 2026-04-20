export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-snow">
      <div className="text-center">
        <h1 className="font-display text-display-1 text-navy mb-4">
          NJNC 2028
        </h1>
        <p className="font-body text-lg text-slate max-w-xl mx-auto">
          Nepal Japan Neurological Conference — September 18-19, 2028
          <br />
          Hotel Radisson Blu, Kathmandu, Nepal
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/register"
            className="bg-primary text-white px-8 py-3 rounded-lg font-body font-semibold hover:bg-primary/90 transition-colors"
          >
            Register Now
          </a>
          <a
            href="/submit-abstract"
            className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-body font-semibold hover:bg-gold hover:text-white transition-colors"
          >
            Submit Abstract
          </a>
        </div>
      </div>
    </main>
  );
}
