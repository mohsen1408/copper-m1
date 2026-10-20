import { ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import type { PrivacySummary as Privacy } from "@/lib/copper/catalog";

const MASCOT_SIZE = 1254;

// How Copper handles recordings, straight from the 2026 privacy policy.
export function PrivacySummary({ privacy }: { privacy: Privacy }) {
  return (
    <section
      id="privacy"
      data-testid="privacy-summary"
      className="bg-accent text-accent-foreground scroll-mt-16"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-3 md:py-24">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold tracking-widest uppercase">
            Privacy, {privacy.policy} policy
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Nothing leaves home until you say &ldquo;{privacy.wakeWord}&rdquo;
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {privacy.points.map((point) => (
              <li key={point} className="flex gap-3 text-lg">
                <ShieldCheckIcon
                  aria-hidden
                  className="mt-1 size-5 shrink-0"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/assets/brand/copper-mascot.png"
          alt="Copper, the robot mascot in a yellow hard hat, waving and holding a checklist"
          width={MASCOT_SIZE}
          height={MASCOT_SIZE}
          sizes="(min-width: 768px) 30vw, 60vw"
          className="mx-auto h-auto w-3/5 max-w-xs md:w-full"
        />
      </div>
    </section>
  );
}
