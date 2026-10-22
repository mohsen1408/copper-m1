import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  annualSavings,
  BillingToggle,
} from "@/components/copper/landing/billing-toggle";
import { formatUsd, getPlans, type Plan } from "@/lib/copper/catalog";

// Class Example 1 extension: the Monthly / Annual switch in Copper Plus.
const plusCard = (container: HTMLElement) =>
  within(container.querySelector<HTMLElement>('[data-plan="copper-plus"]')!);

describe("Monthly / Annual billing switch", () => {
  it("starts on monthly and still shows both catalog prices", () => {
    const { container } = render(<BillingToggle plans={getPlans()} />);
    const plus = getPlans().find((p) => p.id === "copper-plus")!;
    expect(screen.getByRole("radio", { name: /monthly/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    const card = plusCard(container);
    expect(card.getByText(`${formatUsd(plus.monthlyUsd)}`, { exact: false }))
      .toBeInTheDocument();
    expect(container.textContent).toContain(`${formatUsd(plus.annualUsd)}/year`);
  });

  it("switching to annual leads with the yearly price and the savings", () => {
    const { container } = render(<BillingToggle plans={getPlans()} />);
    const plus = getPlans().find((p) => p.id === "copper-plus")!;
    const { savings, perMonth } = annualSavings(plus);

    fireEvent.click(screen.getByRole("radio", { name: /annual/i }));

    expect(screen.getByRole("radio", { name: /annual/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByTestId("annual-savings")).toHaveTextContent(
      `Save ${formatUsd(savings)} a year`,
    );
    expect(container.textContent).toContain(`${formatUsd(perMonth)}/month`);
    // The monthly price is still on the page, just no longer the headline.
    expect(container.textContent).toContain(formatUsd(plus.monthlyUsd));

    fireEvent.click(screen.getByRole("radio", { name: /monthly/i }));
    expect(screen.queryByTestId("annual-savings")).toBeNull();
  });

  it("computes the savings from the catalog, so new prices update it", () => {
    const changed: Plan[] = getPlans().map((p) =>
      p.id === "copper-plus" ? { ...p, monthlyUsd: 10, annualUsd: 100 } : p,
    );
    expect(annualSavings(changed[1])).toEqual({
      savings: 20,
      percent: 17,
      perMonth: 8.33,
    });

    render(<BillingToggle plans={changed} />);
    expect(screen.getByRole("radio", { name: /annual/i })).toHaveTextContent(
      "Save 17%",
    );
    fireEvent.click(screen.getByRole("radio", { name: /annual/i }));
    expect(screen.getByTestId("annual-savings")).toHaveTextContent(
      "Save $20 a year",
    );
  });

  it("never shows savings on the Free plan", () => {
    const free = getPlans().find((p) => p.id === "free")!;
    expect(annualSavings(free).savings).toBe(0);
  });
});
