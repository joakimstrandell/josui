"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@josui/core-web";
import { BracketButton as Button } from "@josui/react";

export function Navigation() {
  return (
    <nav>
      <ul className="flex gap-0 text-sm leading-none">
        <Navigation.Item href="/work">Work</Navigation.Item>
        <Navigation.Item href="/readme">Readme</Navigation.Item>
        <Navigation.Item href="/connect">Connect</Navigation.Item>
      </ul>
    </nav>
  );
}

Navigation.Item = function NavigationItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <Button
        variant="ghost"
        className={cn({
          "text-foreground-hc": isActive,
          "text-foreground-lc": !isActive,
        })}
        asChild
      >
        <Link to={href}>{children}</Link>
      </Button>
    </li>
  );
};
