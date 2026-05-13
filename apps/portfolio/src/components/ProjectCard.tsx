import { cn } from "@josui/core-web";
import { Link } from "@tanstack/react-router";

interface ProjectCardProps {
  to: string;
  type: "professional" | "personal";
  title: string;
  extract: string;
  hidden?: boolean;
}

export function ProjectCard({ to, type, title, extract, hidden = false }: ProjectCardProps) {
  if (hidden) return null;

  return (
    <Link to={to} className="group block">
      <article className="flex flex-col">
        <div className="copy-fluid">
          <h1 className="mb-0 flex items-center gap-x-3 copy-heading-3">
            <span
              className={cn("aspect-square size-3 inline-block rounded-full -ml-6", {
                "bg-secondary-200": type === "professional",
                "bg-primary-200": type === "personal",
              })}
            />
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              {title}
            </span>
          </h1>
          <p className="mt-2 group-hover:underline transition-transform duration-300 group-hover:translate-x-2 blur-in-3xl">
            {extract}
          </p>
        </div>
      </article>
    </Link>
  );
}
