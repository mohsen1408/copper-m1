import Image from "next/image";
import { formatUsd, type Product } from "@/lib/copper/catalog";

const CUTOUT_SIZE = 1254;

// Catalog color names → brand swatches. Matched by keyword, so "Polished
// Copper" and "Brushed Copper" share one swatch.
const SWATCHES: [RegExp, string][] = [
  [/copper/i, "bg-primary"],
  [/teal/i, "bg-accent"],
  [/night/i, "bg-[#1c2333]"],
  [/sand/i, "bg-[#efe3d0]"],
];

const swatchClass = (color: string) =>
  SWATCHES.find(([pattern]) => pattern.test(color))?.[1] ?? "bg-muted";

export function Products({ products }: { products: Product[] }) {
  return (
    <section
      id="products"
      data-testid="products"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 md:py-24"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
          The lineup
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Two devices, one helpful Copper
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.id}
            data-testid="product-card"
            data-product={product.id}
            className="bg-card text-card-foreground ring-foreground/10 flex flex-col overflow-hidden rounded-2xl ring-1"
          >
            <div className="bg-secondary flex flex-col items-center gap-4 px-6 pt-8 pb-6">
              <Image
                src={product.cutout}
                alt={`${product.name} ${product.type} in ${product.colors[0]}`}
                width={CUTOUT_SIZE}
                height={CUTOUT_SIZE}
                sizes="(min-width: 768px) 16rem, 60vw"
                className="h-auto w-3/5 max-w-64 drop-shadow-lg"
              />
              <ul aria-label={`${product.name} colors`} className="flex gap-3">
                {product.colors.map((color) => (
                  <li key={color} className="flex flex-col items-center gap-1">
                    <span
                      aria-hidden
                      className={`ring-foreground/20 size-6 rounded-full ring-1 ${swatchClass(color)}`}
                    />
                    <span className="text-secondary-foreground/80 text-xs">
                      {color}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.type}</p>
                </div>
                <p className="text-primary text-3xl font-extrabold">
                  {formatUsd(product.priceUsd)}
                </p>
              </div>
              <ul className="flex flex-col gap-4">
                {product.features.map((feature) => (
                  <li key={feature.name} className="flex gap-3">
                    <span
                      aria-hidden
                      className="bg-primary mt-2 size-2 shrink-0 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{feature.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
