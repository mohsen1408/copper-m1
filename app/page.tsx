import { Hero } from "@/components/copper/landing/hero";
import { PlusPricing } from "@/components/copper/landing/plus-pricing";
import { PrivacySummary } from "@/components/copper/landing/privacy-summary";
import { Products } from "@/components/copper/landing/products";
import { Showcase } from "@/components/copper/landing/showcase";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import {
  getPlans,
  getPrivacySummary,
  getProducts,
} from "@/lib/copper/catalog";

// The Module 1 landing page. Every price and plan detail comes from the catalog.
export default function Home() {
  const products = getProducts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero products={products} />
        <Products products={products} />
        <Showcase products={products} />
        <PlusPricing plans={getPlans()} />
        <PrivacySummary privacy={getPrivacySummary()} />
      </main>
      <SiteFooter />
    </>
  );
}
