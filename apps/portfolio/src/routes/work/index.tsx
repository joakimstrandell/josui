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
      <PageSection width="narrow">
        <AnimateContent className="copy">
          <h1 className="mb-2 font-bold">Work</h1>
          <p className="text-xl">A collection of professional work and personal projects.</p>
        </AnimateContent>
        <AnimateContent className="space-y-8 lg:space-y-10">
          <ProjectCard
            to="/work/client/design-to-engineering-at-stockholm-exergi"
            type="professional"
            title="Frontend Architecture for a Multi-Product Platform"
            extract="7 years owning frontend architecture at Stockholm Exergi – a React/TypeScript monorepo, 60+ component design system, and type-safe API layer that shipped features ~3x faster."
          />
          <ProjectCard
            to="/work/client/contract-first-apis-at-stockholm-exergi"
            type="professional"
            title="An API Contract Both Teams Owned"
            extract="A contract-first workflow that made frontend–backend integrations faster and safer across multiple services with generated, type-safe clients."
          />
          <ProjectCard
            to="/work/personal/josui"
            type="personal"
            title="A Design System That Ships Alongside Its Apps"
            extract="An AI-native design system and build tooling monorepo that powers multiple production apps from one workspace."
          />
        </AnimateContent>
      </PageSection>
    </Page>
  );
}
