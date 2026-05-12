import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimateContent, Checklist, Page, PageSection } from "@josui/react";

export const Route = createFileRoute("/work/personal/josui")({
  component: JosuiCase,
  head: () => ({
    meta: [
      { title: "JOSUI Design System Monorepo - Joakim Strandell" },
      {
        name: "description",
        content:
          "Case study: An AI-native design system and build tooling monorepo – React components, shared utilities, and the apps that consume them, all in one workspace (2026–present).",
      },
    ],
  }),
});

function JosuiCase() {
  return (
    <Page>
      <PageSection width="narrow">
        <AnimateContent className="copy">
          <h1 className="mb-6 text-4xl font-bold">A Design System That Ships Alongside Its Apps</h1>
          <p>
            JOSUI is an AI-native design system and build tooling monorepo. It packages a React
            component library, shared utilities, and the apps that consume them: a playground, this
            portfolio, and the awkwardgroup company site.
          </p>
          <p>
            Library and apps share one workspace, so every change lands against real screens the
            same day. There is no isolated demo site standing in for production – the surfaces that
            ship are the test bed.
          </p>
          <p>
            The agent layer is first-class. An <code>AGENTS.md</code> contract and scoped skills
            define how to work in each package, so coding agents and I follow the same playbook
            across the repo.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>The Challenge</h2>
          <p>
            As a solo builder shipping several products, I needed a consistent UI foundation that
            stays out of my way. Most off-the-shelf approaches add ceremony I don’t need; bespoke
            setups tend to drift between projects.
          </p>
          <Checklist
            className="my-4"
            items={[
              "One component library, dogfooded by the apps that depend on it",
              "Clear package boundaries so framework-agnostic logic stays portable",
              "A single toolchain instead of a stack of fragmented configs",
              "An explicit contract for AI agents working across packages and apps",
            ]}
          />
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>The Approach</h2>
          <p>
            I structured the repo as layered packages with explicit boundaries – framework-agnostic
            core, web-only utilities, React components, and a Tailwind v4 preset – co-located with
            the apps that consume them. Tooling is intentionally minimal: one root toolchain, one
            release workflow, one agent contract.
          </p>
          <Checklist
            className="my-4"
            items={[
              "@josui/core for pure JS helpers (e.g., color via culori) that run anywhere",
              "@josui/core-web for browser-side primitives (clsx + tailwind-merge, hotkeys)",
              "@josui/react component library on Radix UI and Tailwind CSS v4",
              "@josui/tailwind-preset as a CSS-only Tailwind v4 preset, no token build step",
              "@josui/typescript-config with base/browser/node/react targets",
              "Vite+ (vp) as a unified toolchain for lint, format, test, build, and orchestration",
              "Changesets-driven releases; apps in the same repo dogfood every change",
              "AGENTS.md and scoped .claude skills so agentic coding follows the repo conventions",
            ]}
          />
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Implementation Highlights</h2>
          <p>
            <strong>React component library</strong>
            <br />
            Built on Radix UI primitives and Tailwind CSS v4, with composable building blocks for
            forms, navigation, overlays, and content layout. Tested with Vitest and Testing Library,
            and documented in Storybook.
          </p>
          <p>
            <strong>Core and web utilities</strong>
            <br />
            <code>@josui/core</code> stays pure JS so the same logic can run in any environment.{" "}
            <code>@josui/core-web</code> layers in browser concerns like className composition and
            keyboard shortcuts on top of it.
          </p>
          <p>
            <strong>Tailwind v4 preset</strong>
            <br />
            <code>@josui/tailwind-preset</code> distributes design decisions as a CSS-only preset
            using Tailwind v4’s CSS-first config – no separate token pipeline, no build step,
            consuming apps just import the preset.
          </p>
          <p>
            <strong>Unified toolchain via Vite+</strong>
            <br />
            Linting (oxlint), formatting (oxfmt with Tailwind class sorting), testing (Vitest),
            building, and task orchestration all run through one command. A <code>
              vp staged
            </code>{" "}
            pre-commit hook catches lint, format, and type drift before it lands.
          </p>
          <p>
            <strong>AI-native workflow</strong>
            <br />
            <code>AGENTS.md</code> defines the cross-agent workflow; scoped skills under{" "}
            <code>.claude/skills/</code> teach specific tasks (case-study writing, animations,
            audits). This is the interface agents work against – treated as first-class artefacts,
            not docs.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Results</h2>
          <p>
            The repo is in active development. Outcomes below reflect the current state rather than
            a final destination.
          </p>
          <Checklist
            className="my-4"
            items={[
              "One workspace powers three apps (playground, this portfolio, the awkwardgroup company site) on the same component library",
              "Five packages published to npm: @josui/core, @josui/core-web, @josui/react, @josui/tailwind-preset, @josui/typescript-config",
              "Single toolchain replaces a stack of per-package configs – one command for lint, format, test, build",
              "Agent contract (AGENTS.md + skills) makes cross-package work as cheap to start for an agent as it is for me",
            ]}
          />
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Learnings</h2>
          <p>
            <strong>Co-locating system and apps keeps the system honest.</strong>
            <br />
            The components that ship are the ones I use the next day. Dogfooding in the same repo
            prevents the “library is great in isolation, awkward in real apps” trap.
          </p>
          <p>
            <strong>Less ceremony, more reps.</strong>
            <br />
            Token pipelines, multi-framework adapters, and bespoke build setups all looked
            attractive on paper and slowed me down in practice. Cutting them out – tokens live in a
            separate repo, the system is React-only here – made it easier to evolve.
          </p>
          <p>
            <strong>The agent contract is part of the architecture.</strong>
            <br />
            <code>AGENTS.md</code> and skill files are not documentation; they’re the interface
            coding agents work against. Designing them deliberately pays off every time I open the
            repo.
          </p>
        </AnimateContent>

        <AnimateContent className="copy">
          <h2>Technical Summary</h2>
          <p>
            <strong>Stack:</strong> pnpm workspaces, Vite+ (oxlint, oxfmt, Vitest), TypeScript,
            React 19, Tailwind CSS v4, Radix UI, Storybook, Testing Library, Changesets
          </p>
          <p>
            <strong>Scope:</strong> Five published packages (<code>@josui/core</code>,{" "}
            <code>@josui/core-web</code>, <code>@josui/react</code>,{" "}
            <code>@josui/tailwind-preset</code>, <code>@josui/typescript-config</code>) and three
            internal apps (<code>playground</code>, <code>portfolio</code>,{" "}
            <code>awkwardgroup</code>) sharing one toolchain
          </p>
          <p>
            Repository:{" "}
            <a href="https://github.com/joakimstrandell/josui">github.com/joakimstrandell/josui</a>
          </p>
        </AnimateContent>
        <AnimateContent className="copy">
          <p>
            Lets <Link to="/connect">connect</Link> if you want to talk design systems or AI-native
            tooling.
          </p>
        </AnimateContent>
      </PageSection>
    </Page>
  );
}
