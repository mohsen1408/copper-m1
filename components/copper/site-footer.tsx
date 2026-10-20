import { Logo } from "@/components/copper/logo";

export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#1c2333] text-[#efe3d0]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo onDark className="w-36" />
        <p className="text-sm opacity-80">Fictional — for educational use.</p>
      </div>
    </footer>
  );
}
