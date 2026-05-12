import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimateContent, Checklist, Page, PageSection } from "@josui/react";

export const Route = createFileRoute("/work/client/design-to-engineering-at-stockholm-exergi")({
  component: StockholmExergiCase,
  head: () => ({
    meta: [
      {
        title: "Frontend Architecture for a Multi-Product Platform – Joakim Strandell",
      },
      {
        name: "description",
        content:
          "Case study: 7 years owning frontend architecture at Stockholm Exergi – a React/TypeScript monorepo, 60+ component design system, and type-safe API layer that let 9+ products ship features ~3x faster.",
      },
    ],
  }),
});

function StockholmExergiCase() {
  return (
    <Page>
      <PageSection width="narrow">
        <AnimateContent className="copy">
          <h1>Frontend Architecture for a Multi-Product Platform</h1>
          <p className="copy copy-lg">
            React/TypeScript platform and design system across 9+ products
          </p>
          <div className="flex flex-col">
            <strong>Role:</strong> Lead Frontend Engineer & Product Designer
          </div>
          <div className="flex items-center gap-x-8 flex-wrap gap-y-2">
            <div className="flex flex-col">
              <strong>Client:</strong> Stockholm Exergi
            </div>
            <div className="flex flex-col">
              <strong>Contract:</strong> 2018–2025 (7 years)
            </div>
          </div>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Overview</h2>
          <p>
            Stockholm Exergi's Intelligy Solutions is a multi-product energy analytics platform –
            cloud services connecting 10,000+ properties for monitoring, control, and optimisation.
            I joined in 2018 as a UX/UI designer. Over the next seven years, my scope expanded from
            product design into full ownership of the frontend architecture across 9+ products.
          </p>
          <p>
            I built what those teams now share: a React 18+/TypeScript monorepo, a 60+ component
            design system, and a type-safe API layer generated from OpenAPI specs. It became the
            foundation for every new frontend, and features ship roughly 3x faster on it.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>The Challenge</h2>
          <p>
            The platform had successfully digitised thousands of district energy substations, but
            the software had grown organically. Engineering pain had accumulated:
          </p>
          <Checklist
            className="my-4"
            items={[
              "Multiple products on independent codebases – inconsistent UX, duplicated effort",
              "Legacy Django/Python stack made frontend iteration slow",
              "No shared component library, no design system",
              "API integration was brittle – each team hand-wrote clients against a shifting spec",
              "New apps started from scratch, re-solving the same problems",
            ]}
          />
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>The Work (2018–2025)</h2>
          <p>
            My scope expanded steadily – from product design into frontend engineering, then
            architecture and enablement.
          </p>
        </AnimateContent>

        <div className="border-primary-500/30 relative my-8 ml-1.5 space-y-8 border-l-2 pl-8">
          <AnimateContent>
            <TimelineItem period="2018–2019" title="Discovery & UX Foundation">
              Joined to lead UX/UI design. Conducted user research with property owners and housing
              associations, designed data visualisation interfaces for complex energy data, and
              established patterns for the customer-facing analytics product.
            </TimelineItem>
          </AnimateContent>
          <AnimateContent>
            <TimelineItem period="2019–2022" title="Platform Modernisation">
              Expanded into frontend engineering. Built features within the existing Django stack,
              then led the design and development of Intelligy Pro – a React-based platform that
              eventually absorbed the original product.
            </TimelineItem>
          </AnimateContent>
          <AnimateContent>
            <TimelineItem period="2022–2024" title="Architecture & Infrastructure">
              Took ownership of frontend architecture. Built STEXUI – a 60+ component design system
              on Radix UI and Tailwind CSS. Created type-safe API infrastructure (OpenAPI →
              TypeScript SDK → TanStack Query hooks). Developed shared utility libraries for
              formatting, dates, and translations.
            </TimelineItem>
          </AnimateContent>
          <AnimateContent>
            <TimelineItem period="2024–2025" title="Technical Direction & Enablement">
              As the team grew, shifted focus to standards and enablement. Authored ADRs for API
              design and frontend conventions, mentored senior engineers, and ran feature planning
              and code reviews. Introduced Cursor and Claude into the team's workflow – used for
              component scaffolding, migration work, and PR review.
            </TimelineItem>
          </AnimateContent>
        </div>

        <AnimateContent className="copy">
          <h2>Architecture</h2>
          <p>
            Operations users needed to make decisions quickly on complex energy data. The platform
            had to surface context without forcing people to interpret raw numbers – consistently
            across every product in the suite. A few UX principles carried through from design into
            engineering:
          </p>
          <Checklist
            className="my-4"
            items={[
              "Progressive disclosure – summary first, details on demand",
              "Contextual comparison – data means nothing without reference",
              "Action-oriented – every insight connects to something users can do",
              "Consistent naming – shared language across products and field workflows",
            ]}
          />
          <p>
            Everything below was built to support those principles across 9+ products, 8+
            microservices, and multiple teams.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h3>Design System (STEXUI)</h3>
          <p>
            A comprehensive component and theming system built with React, TypeScript, Radix UI
            primitives, Tailwind CSS, and CVA for type-safe variants. Sixty-plus components – from
            primitives to composite modules – standardising how measurements are formatted, how
            loading states render, and how optimistic updates behave, so the experience feels
            consistent everywhere.
          </p>
          <p>
            Complex components built for real needs: data tables with TanStack integration,
            Mapbox-powered property maps, date range pickers with custom intervals, a Chart.js-based
            analytics module for custom datasets, and a composable sidebar system.
          </p>

          <h3>Type-Safe API Infrastructure</h3>
          <p>
            Connected 8+ microservices with generated TypeScript clients. OpenAPI spec → generated
            SDK → TanStack Query hooks → UI, with Zod validation at the boundary. API integration
            bugs went from a recurring problem to essentially zero.
            <span className="text-muted-foreground block pt-3 text-sm">
              Read more:{" "}
              <Link
                to="/work/client/contract-first-apis-at-stockholm-exergi"
                className="underline underline-offset-4"
              >
                Contract-First APIs at Stockholm Exergi
              </Link>
              .
            </span>
          </p>

          <h3>Shared Infrastructure</h3>
          <p>
            A monorepo with shared utilities for formatting, localization, and common data patterns.
            Reusable hooks and table tooling. Tooling standards kept packages, configs, and updates
            centralised. New apps inherited the full platform from day one.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>No Handoffs</h2>
          <p>
            Our frontend team owned product design and engineering together. No translation layer
            between Figma and code, no disciplines to hand off between. Components were the spec.
          </p>
          <p>
            When a pattern needed to change, the same people who designed it could ship it. When
            implementation forced a rethink, we rethought the design on the spot. The feedback loop
            stayed tight, and decisions stayed consistent from UX intent through to production.
          </p>
          <p>
            Every handoff is lossy compression. Removing that layer is what made the architecture
            above possible to build – and keep coherent across 9+ products.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Results</h2>
          <p>
            <strong>Adoption:</strong> Unified stack across internal products – 4 migrated, 5 in
            pipeline at handover.
          </p>
          <p>
            <strong>Velocity:</strong> New features shipped ~3x faster once teams adopted the shared
            component library and API tooling.
          </p>
          <p>
            <strong>Quality:</strong> Hard-to-trace integration bugs became same-day fixes after
            type-safe API clients with Zod validation landed across all endpoints.
          </p>
          <p>
            <strong>Onboarding:</strong> Developer ramp-up dropped from weeks to days – same stack,
            same patterns across all products.
          </p>
          <p>
            <strong>Reusability:</strong> New applications inherited the full component library and
            tooling from day one.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Learnings</h2>
          <p>
            <strong>Contracts scale better than conventions.</strong>
            <br />
            Generated, type-safe clients eliminated an entire class of bugs that no amount of review
            could catch. Every service becomes predictable from the frontend's point of view.
          </p>
          <p>
            <strong>Design systems are governance problems, not component problems.</strong>
            <br />
            Building a button is easy. Getting nine products to use the same button – and keep using
            it – is the real work.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Technical Summary</h2>
          <p>
            <strong>Stack:</strong> React 18, TypeScript, TanStack Query, TanStack Router, Radix UI,
            Tailwind CSS, OpenAPI, Zod, Figma, Vite, npm workspaces
          </p>
          <p>
            <strong>Scope:</strong> 9+ internal operations products on a shared frontend platform
            and design system
          </p>
        </AnimateContent>
        <AnimateContent>
          <blockquote className="border-primary-500/30 my-12 border-l-2 pl-6">
            <p className="text-lg italic">
              "Joakim's ability to own the entire chain – from design concept to complex
              implementation – enabled us to deliver higher quality faster."
            </p>
            <footer className="text-muted-foreground mt-3 text-sm">
              <strong className="text-foreground">Patrik Höjner</strong> · Head of Intelligy
              Solutions DevOps, Stockholm Exergi
            </footer>
          </blockquote>
        </AnimateContent>
        <AnimateContent className="copy">
          <p>
            See some of the patterns in action in the{" "}
            <Link to="/work/personal/josui" className="underline underline-offset-4">
              JOSUI design system monorepo case study
            </Link>{" "}
            and in <a href="https://github.com/joakimstrandell/josui">josui</a> – my open source
            design system inspired by some of the same principles.
          </p>
        </AnimateContent>
      </PageSection>
    </Page>
  );
}

function TimelineItem({
  period,
  title,
  children,
}: {
  period: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mb-10 last:mb-0">
      <div className="bg-primary-500 absolute top-1 -left-9.25 h-2 w-2 rounded-full" />
      <p className="text-muted-foreground font-mono text-sm">{period}</p>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground copy mt-1">{children}</p>
    </div>
  );
}
