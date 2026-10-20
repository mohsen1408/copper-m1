import Image from "next/image";
import type { Product } from "@/lib/copper/catalog";

// What each lifestyle photo shows, keyed by its path in the catalog.
const PHOTOS: Record<
  string,
  { width: number; height: number; alt: string; caption: string }
> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    width: 1672,
    height: 941,
    alt: "Copper Home speaker on a stone counter, showing 4:25 and 92° as the sun sets over saguaros outside the window",
    caption: "Copper Home keeps time, weather and the whole house in one glance.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    width: 1672,
    height: 941,
    alt: "Brushed copper Copper Notes recorder standing beside its charging puck on a stone desk in warm afternoon light",
    caption: "Copper Notes charges on its puck, ready for the next meeting.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    width: 1536,
    height: 1024,
    alt: "Person writing in a notebook at a café with Copper Notes clipped to their shirt pocket, amber ring glowing",
    caption: "Clip it on, and the amber ring lets everyone know it's listening.",
  },
};

export function Showcase({ products }: { products: Product[] }) {
  const photos = products.flatMap((product) =>
    product.lifestyle.map((src) => ({
      src,
      product,
      ...(PHOTOS[src] ?? {
        width: 1600,
        height: 1000,
        alt: `${product.name} at home in Arizona`,
        caption: product.name,
      }),
    })),
  );

  return (
    <section
      id="showcase"
      data-testid="showcase"
      className="bg-secondary text-secondary-foreground scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">
            Made for the desert
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            At home from Phoenix to Flagstaff
          </h2>
        </div>
        <div className="flex flex-col gap-12 md:gap-16">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="grid items-center gap-6 md:grid-cols-5 md:gap-10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 60vw, 100vw"
                className={`h-auto w-full rounded-2xl shadow-lg md:col-span-3 ${
                  index % 2 === 1 ? "md:order-last" : ""
                }`}
              />
              <figcaption className="md:col-span-2">
                <p className="text-primary text-sm font-semibold tracking-widest uppercase">
                  {photo.product.name}
                </p>
                <p className="mt-2 text-2xl leading-snug font-bold">
                  {photo.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
