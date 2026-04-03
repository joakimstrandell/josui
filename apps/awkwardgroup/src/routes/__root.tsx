import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { CellGrid, CustomCursor } from "@josui/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "@fontsource-variable/roboto-mono";
import "@/styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#000000" },
      {
        title: "Awkward Group - Independent Product Design & Engineering Studio",
      },
      {
        name: "description",
        content:
          "Awkward Group AB is a production studio and consultancy operated by Joakim Strandell in Stockholm, Sweden. Specialized in UX/UI design, modern web engineering, and AI integration.",
      },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <CellGrid gridColor="color-foreground" gridOpacity={0.05} cellOpacity={0.3} cellSize={16}>
          <div
            className="pointer-events-none fixed inset-x-0 top-0 z-0 h-150 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,var(--color-background)_0%,transparent_100%)]"
            aria-hidden="true"
          />
          <div className="min-h-screen flex flex-col relative z-10">
            <Header />
            <Outlet />
            <Footer />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-150 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,var(--color-background)_0%,transparent_100%)] opacity-80"
            aria-hidden="true"
          />
        </CellGrid>
        <CustomCursor />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
