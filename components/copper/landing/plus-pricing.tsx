import { BillingToggle } from "@/components/copper/landing/billing-toggle";
import type { Plan } from "@/lib/copper/catalog";

// Free vs. Copper Plus, side by side. Copper Plus is highlighted in Copper,
// and a Monthly / Annual switch shows what annual billing saves.
export function PlusPricing({ plans }: { plans: Plan[] }) {
  return (
    <section
      id="plus"
      data-testid="plus-pricing"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 md:py-24"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          Copper Plus
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          More memory, more notes, sharper answers
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Every Copper device works on the Free plan. Upgrade when you want
          more, and save when you pay for the year.
        </p>
      </div>
      <BillingToggle plans={plans} />
    </section>
  );
}
