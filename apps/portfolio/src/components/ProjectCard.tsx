import { cn } from "@josui/core-web";
import { Link } from "@tanstack/react-router";
import { Pin } from "lucide-react";

interface ProjectCardProps {
  to: string;
  type: "professional" | "personal";
  pinned?: boolean;
  title: string;
  extract: string;
}

export function ProjectCard({ to, type, pinned = false, title, extract }: ProjectCardProps) {
  return (
    <Link to={to} className="group block">
      <article className="flex flex-col">
        <div className="copy-fluid transition-transform duration-300 group-hover:translate-x-2">
          <h1 className="mb-0 flex items-center gap-x-3 copy-heading-3">{title}</h1>
          <p className="mt-2 group-hover:underline">{extract}</p>
          <span
            className={cn(
              "bg-secondary-200 text-secondary-900 inline-flex items-center gap-x-1 rounded px-2 py-1 text-xs",
              {
                "bg-secondary-50 text-secondary-700": type === "professional",
                "bg-primary-50 text-primary-700": type === "personal",
              },
            )}
          >
            {pinned && <Pin className="size-3" />}
            {type === "professional" ? "Professional Work" : "Personal Project"}
          </span>
        </div>
      </article>
    </Link>
  );
}
