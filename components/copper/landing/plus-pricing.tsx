import { CheckIcon, MinusIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  type Plan,
} from "@/lib/copper/catalog";

// Free vs. Copper Plus, side by side. Copper Plus is highlighted in Copper.
export function PlusPricing({ plans }: { plans: Plan[] }) {
  return (
    <section
      id="plus"
      data-testid="plus-pricing"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 md:py-24"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          Copper Plus
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          More memory, more notes, sharper answers
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Every Copper device works on the Free plan. Upgrade when you want
          more.
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan) => {
          const plus = plan.id === "copper-plus";
          return (
            <article
              key={plan.id}
              data-plan={plan.id}
              className={`flex flex-col gap-6 rounded-2xl p-6 sm:p-8 ${
                plus
                  ? "bg-primary text-primary-foreground shadow-xl"
                  : "bg-card text-card-foreground ring-foreground/10 ring-1"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                {plus && (
                  <Badge className="bg-[#1c2333] text-[#efe3d0]">
                    Most helpful
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-4xl font-extrabold">
                  {formatUsd(plan.monthlyUsd)}
                  <span className="text-lg font-semibold">/month</span>
                </p>
                <p className={plus ? "font-medium" : "text-muted-foreground"}>
                  or {formatUsd(plan.annualUsd)}/year
                </p>
              </div>
              <dl className="flex flex-col divide-y divide-current/15 border-y border-current/15">
                <Row label="Memory kept" value={formatMemory(plan.memoryDays)} />
                <Row
                  label="Notes recording"
                  value={formatNotesHours(plan.notesHoursPerMonth)}
                />
                <Row
                  label="Refined answers"
                  value={
                    plan.refinedAnswers ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckIcon aria-hidden className="size-4" /> Included
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <MinusIcon aria-hidden className="size-4" /> Not
                        included
                      </span>
                    )
                  }
                />
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt>{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
