"use client";

import { CheckIcon, MinusIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  type Plan,
} from "@/lib/copper/catalog";

type Billing = "monthly" | "annual";

const cents = (amount: number) => Math.round(amount * 100) / 100;

/** What a year of monthly billing costs vs. the annual price, from the catalog. */
export function annualSavings(plan: Plan) {
  const yearOfMonthly = plan.monthlyUsd * 12;
  const savings = cents(yearOfMonthly - plan.annualUsd);
  return {
    savings,
    percent: yearOfMonthly > 0 ? Math.round((savings / yearOfMonthly) * 100) : 0,
    perMonth: cents(plan.annualUsd / 12),
  };
}

// Class Example 1 extension: a Monthly / Annual switch that shows the same
// catalog plans billed two ways, so shoppers can see what annual saves.
// Both prices stay on the page; the switch only picks which one leads.
export function BillingToggle({ plans }: { plans: Plan[] }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const plus = plans.find((plan) => plan.id === "copper-plus");
  const bestPercent = plus ? annualSavings(plus).percent : 0;

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="bg-secondary inline-flex rounded-full p-1"
      >
        <BillingOption
          checked={billing === "monthly"}
          onSelect={() => setBilling("monthly")}
        >
          Monthly
        </BillingOption>
        <BillingOption
          checked={billing === "annual"}
          onSelect={() => setBilling("annual")}
        >
          Annual
          {bestPercent > 0 && (
            <span className="bg-accent text-accent-foreground ml-2 rounded-full px-2 py-0.5 text-xs font-bold">
              Save {bestPercent}%
            </span>
          )}
        </BillingOption>
      </div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>
    </div>
  );
}

function BillingOption({
  checked,
  onSelect,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
        checked
          ? "bg-background text-foreground shadow"
          : "text-secondary-foreground/70 hover:text-secondary-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const plus = plan.id === "copper-plus";
  const paid = plan.monthlyUsd > 0;
  const { savings, perMonth } = annualSavings(plan);
  const annual = billing === "annual" && paid;

  return (
    <article
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
          <Badge className="bg-[#1c2333] text-[#efe3d0]">Most helpful</Badge>
        )}
      </div>
      <div aria-live="polite">
        {annual ? (
          <>
            <p className="text-4xl font-extrabold">
              {formatUsd(plan.annualUsd)}
              <span className="text-lg font-semibold">/year</span>
            </p>
            <p className="font-medium">
              That&apos;s {formatUsd(perMonth)}/month · or{" "}
              {formatUsd(plan.monthlyUsd)}/month billed monthly
            </p>
            {savings > 0 && (
              <p
                data-testid="annual-savings"
                className="mt-2 inline-block rounded-full bg-[#1c2333] px-3 py-1 text-sm font-semibold text-[#efe3d0]"
              >
                Save {formatUsd(savings)} a year vs. monthly
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-4xl font-extrabold">
              {formatUsd(plan.monthlyUsd)}
              <span className="text-lg font-semibold">/month</span>
            </p>
            <p className={plus ? "font-medium" : "text-muted-foreground"}>
              or {formatUsd(plan.annualUsd)}/year
            </p>
          </>
        )}
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
                <MinusIcon aria-hidden className="size-4" /> Not included
              </span>
            )
          }
        />
      </dl>
    </article>
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
