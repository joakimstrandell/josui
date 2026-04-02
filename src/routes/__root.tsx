import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';

import '@fontsource-variable/roboto-mono';
import '@/styles/globals.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Awkward Group - Independent Product Design & Engineering Studio' },
      {
        name: 'description',
        content:
          'Awkward Group AB is a production studio and consultancy operated by Joakim Strandell in Stockholm, Sweden. Specialized in UX/UI design, modern web engineering, and AI integration.',
      },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Outlet />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
