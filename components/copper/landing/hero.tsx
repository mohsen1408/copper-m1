import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/copper/catalog";

const CUTOUT_SIZE = 1254;

// Hero: headline, tagline and the two product cutouts side by side.
export function Hero({ products }: { products: Product[] }) {
  return (
    <section
      id="top"
      data-testid="hero"
      className="bg-secondary text-secondary-foreground scroll-mt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div className="flex flex-col items-start gap-5 text-left">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">
            Copper State Labs
          </p>
          <h1 className="text-4xl leading-tight font-extrabold text-balance sm:text-5xl lg:text-6xl">
            Smart devices built for Arizona life.
          </h1>
          <p className="text-secondary-foreground/80 max-w-md text-lg sm:text-xl">
            From raw ideas to refined answers.
          </p>
          <Button asChild size="lg" className="h-11 px-6 text-base">
            <a href="#products">See products</a>
          </Button>
        </div>
        <div className="flex items-end justify-center gap-2 sm:gap-4">
          {products.map((product, index) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={`${product.name}, the Copper State Labs ${product.type}`}
              width={CUTOUT_SIZE}
              height={CUTOUT_SIZE}
              preload
              sizes="(min-width: 768px) 25vw, 45vw"
              className={
                index === 0
                  ? "h-auto w-1/2 max-w-xs drop-shadow-xl"
                  : "h-auto w-[42%] max-w-[17rem] drop-shadow-xl"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
