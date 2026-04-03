import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="p-6">
      <Link to="/" className="inline-block">
        <img src="/awwkard-group-logo.png" alt="Awkward Group" className="h-8" />
      </Link>
    </header>
  );
}
