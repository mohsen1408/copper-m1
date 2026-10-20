import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

const NAV = [
  { href: "#products", label: "Products" },
  { href: "#plus", label: "Copper Plus", short: "Plus" },
  { href: "#privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-28 sm:w-40" />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {NAV.map(({ href, label, short }) => (
            <a
              key={href}
              href={href}
              className="text-foreground/80 hover:text-primary rounded-md px-1.5 py-1 text-sm font-medium transition-colors sm:px-2"
            >
              {short ? (
                <>
                  <span className="sm:hidden">{short}</span>
                  <span className="hidden sm:inline">{label}</span>
                </>
              ) : (
                label
              )}
            </a>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
