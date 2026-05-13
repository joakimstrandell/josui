import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  AnimateContent,
  AnimatedTabbedList,
  AnimatedTabbedListItem,
  Page,
  PageSection,
} from "@josui/react";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@josui/core-web";

type Category = "professional" | "personal";

type WorkSearch = {
  category?: Category;
};

export const Route = createFileRoute("/work/")({
  component: Work,
  validateSearch: (search: Record<string, unknown>): WorkSearch => {
    if (!search.category) return {};

    return {
      category: search.category as Category,
    };
  },
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
  const search = useSearch({ from: "/work/" });
  const navigate = useNavigate({ from: "/work/" });

  const activeTab = search.category ?? "all";

  function handleTabChange(value: string) {
    navigate({
      search: { category: value === "all" ? undefined : (value as Category) },
    });
  }

  function isCategoryHidden(category: Category) {
    return search.category && search.category !== category;
  }

  return (
    <Page>
      <PageSection width="narrow">
        <AnimateContent className="copy">
          <h1 className="mb-2 font-bold">Work</h1>
          <p className="text-xl">A collection of professional work and personal projects.</p>

          <div className="flex items-center gap-x-2">
            <CategoryLink label="All" />
            <CategoryLink category="professional" label="Professional" />
            <CategoryLink category="personal" label="Personal" />
          </div>
        </AnimateContent>
        <AnimateContent className="space-y-8 lg:space-y-10">
          <ProjectCard
            to="/work/client/design-to-engineering-at-stockholm-exergi"
            type="professional"
            title="Frontend Architecture for a Multi-Product Platform"
            extract="7 years owning frontend architecture at Stockholm Exergi – a React/TypeScript monorepo, 60+ component design system, and type-safe API layer that shipped features ~3x faster."
            hidden={isCategoryHidden("professional")}
          />
          <ProjectCard
            to="/work/client/contract-first-apis-at-stockholm-exergi"
            type="professional"
            title="An API Contract Both Teams Owned"
            extract="A contract-first workflow that made frontend–backend integrations faster and safer across multiple services with generated, type-safe clients."
            hidden={isCategoryHidden("professional")}
          />
          <ProjectCard
            to="/work/personal/josui"
            type="personal"
            title="A Design System That Ships Alongside Its Apps"
            extract="An AI-native design system and build tooling monorepo that powers multiple production apps from one workspace."
            hidden={isCategoryHidden("personal")}
          />
        </AnimateContent>
      </PageSection>
    </Page>
  );
}

const CategoryLink = ({ category, label }: { category?: Category; label: string }) => {
  const search = useSearch({ from: "/work/" });

  return (
    <Link
      to="/work"
      search={{ category }}
      className="group relative inline-flex items-center cursor-pointer transition-all duration-100 no-underline rounded-md data-[state=active]:mr-6 data-[state=active]:pl-0"
      data-interactive
      data-state={search.category === category ? "active" : "inactive"}
    >
      <div
        className={cn(
          "absolute bg-muted-background inset-0 aspect-square size-3 rounded-xl top-1/2 -translate-y-1/2",
          "transition-all duration-150 group-not-data-[state=active]:group-hover:scale-75",
          "group-data-[state=active]:left-0 group-data-[state=active]:w-full group-data-[state=active]:size-full group-data-[state=active]:rounded-md",
          {
            "bg-secondary-200": category === "professional",
            "bg-primary-200": category === "personal",
          },
        )}
      />
      <div
        className={cn(
          "text-muted-foreground group-data-[state=active]:text-foreground group-hover:text-foreground relative pr-6 z-10 pl-6 py-1 transition-colors duration-100",
          {
            "group-data-[state=active]:text-secondary-800": category === "professional",
            "group-data-[state=active]:text-primary-800": category === "personal",
          },
        )}
      >
        {label}
      </div>
    </Link>
  );
};
