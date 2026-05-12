import { createFileRoute } from "@tanstack/react-router";
import { AnimateContent, Page, PageSection } from "@josui/react";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/work/")({
  component: Work,
  head: () => ({
    meta: [
      { title: "Work - Joakim Strandell" },
      {
        name: "description",
        content: "A collection of professional work and personal projects from Joakim Strandell.",
      },
    ],
  }),
});

function Work() {
  return (
    <Page>
      <PageSection>
        <AnimateContent className="copy">
          <h1 className="mb-2 font-bold">Work</h1>
          <p className="text-xl">A collection of professional work and personal projects.</p>
        </AnimateContent>
        <AnimateContent className="space-y-8">
          <ProjectCard
            to="/work/client/design-to-engineering-at-stockholm-exergi"
            type="client"
            title="Frontend Architecture for a Multi-Product Platform"
            extract="7 years owning frontend architecture at Stockholm Exergi – a React/TypeScript monorepo, 60+ component design system, and type-safe API layer that shipped features ~3x faster."
            thumbnail={{
              src: "/exergi-plant.png",
              alt: "Stockholm Exergi Plant in Lego blocks",
            }}
            logo={{ src: "/exergi-logo.png", alt: "Stockholm Exergi Logo" }}
          />
          <ProjectCard
            to="/work/client/contract-first-apis-at-stockholm-exergi"
            type="client"
            title="Contract-First APIs"
            extract="A contract-first workflow that made frontend–backend integrations faster and safer across multiple services with generated, type-safe clients."
            thumbnail={{
              src: "/contract-first-apis-thumb.png",
              alt: "Abstract contract-first API diagram",
            }}
            logo={{ src: "/exergi-logo.png", alt: "Stockholm Exergi Logo" }}
          />
          <ProjectCard
            to="/work/personal/josui"
            type="personal"
            title="A Design System That Ships Alongside Its Apps"
            extract="An AI-native design system and build tooling monorepo that powers multiple production apps from one workspace."
            thumbnail={{
              src: "/josui-thumbnail.png",
              alt: "Abstract design system diagram",
            }}
            logo={{ src: "/josui-logo.png", alt: "JOSUI logo" }}
          />
        </AnimateContent>
      </PageSection>
    </Page>
  );
}
