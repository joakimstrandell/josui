import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
      <h1 className="font-mono text-4xl font-light tracking-tight sm:text-5xl">
        Independent Product Design
        <br />
        &amp; Engineering Studio
      </h1>

      <div className="mt-12 max-w-xl space-y-4 text-lg text-gray-600">
        <p>
          Awkward Group AB is a production studio and consultancy operated by Joakim Strandell in Stockholm, Sweden. The
          company functions as a venture lab for digital products, while providing specialized expertise in UX/UI design,
          modern web engineering, and AI integration.
        </p>
      </div>

      <div className="mt-12 space-y-1 font-mono text-sm text-gray-500">
        <p>
          For consulting inquiries, portfolio, and case studies:
          <br />
          <a href="https://www.joakimstrandell.com" className="text-foreground underline underline-offset-4">
            www.joakimstrandell.com
          </a>
        </p>
      </div>

      <footer className="mt-24 flex items-center justify-between border-t border-gray-200 pt-6 font-mono text-xs text-gray-400">
        <div>
          <p>Awkward Group AB</p>
          <p>Org. No. 556837-9852</p>
        </div>
        <div className="text-right">
          <p>hello@awkwardgroup.com</p>
          <p>Stockholm, Sweden</p>
        </div>
      </footer>
    </main>
  );
}
