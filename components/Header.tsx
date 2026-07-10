import Link from "next/link";
import { Radio } from "lucide-react";

interface HeaderProps {
  active?: "home" | "demo" | "developers" | "research";
}

const links = [
  { href: "/demo", label: "Demo", key: "demo" as const },
  { href: "/developers", label: "Developers", key: "developers" as const },
  { href: "/research", label: "Research", key: "research" as const },
];

export default function Header({ active }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 ring-1 ring-accent/40 transition group-hover:bg-accent/30">
            <Radio className="h-4 w-4 text-accent-hover" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Agent<span className="text-accent-hover">Watch</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                active === link.key
                  ? "bg-accent/15 text-accent-hover"
                  : "text-gray-400 hover:bg-surface-overlay hover:text-gray-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/demo"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
        >
          Open Demo
        </Link>
      </div>
    </header>
  );
}
