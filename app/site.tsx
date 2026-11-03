import Image from "next/image";
import Link from "next/link";

// @placeholder store listings are not live yet; swap in the real URLs at launch.
const APP_STORE_URL = "/#download";
const PLAY_STORE_URL = "/#download";

export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${className}`}>
      {children}
    </span>
  );
}

export function StoreBadges({ size = "md" }: { size?: "md" | "lg" }) {
  const h = size === "lg" ? "h-14" : "h-11";
  return (
    <div className="flex flex-col gap-3">
      <Mono className="text-shuttle">Coming soon to</Mono>
      <div className="flex flex-wrap items-center gap-3">
        <a href={APP_STORE_URL} aria-label="O'Smash on the App Store, coming soon">
          <Image src="/badges/app-store.svg" alt="Download on the App Store" width={120} height={40} className={`${h} w-auto`} />
        </a>
        {/* Google's badge PNG carries its own clear space; the negative margin lines it up with Apple's. */}
        <a href={PLAY_STORE_URL} aria-label="O'Smash on Google Play, coming soon" className="-my-2">
          <Image src="/badges/google-play.png" alt="Get it on Google Play" width={646} height={250} className={size === "lg" ? "h-[84px] w-auto" : "h-[66px] w-auto"} />
        </a>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-paper">
          <Image src="/images/logo-symbol.png" alt="" width={38} height={28} />
          <span className="font-display text-xl font-semibold tracking-tight">O&apos;Smash</span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/15 p-1 md:flex">
          {[
            ["/#product", "Product"],
            ["/#coaches", "Coaches"],
            ["/#players", "Players"],
            ["/#how", "How it works"],
          ].map(([href, text]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm text-paper transition-colors duration-200 hover:bg-white/10"
            >
              {text}
            </Link>
          ))}
        </div>
        <Link
          href="/#download"
          className="rounded-full bg-shuttle px-5 py-2.5 text-sm font-medium text-navy transition-transform duration-300 ease-out hover:scale-105"
        >
          Coming soon
        </Link>
      </nav>
    </header>
  );
}

const legal = [
  ["/privacy", "Privacy Notice"],
  ["/terms", "Terms of Use"],
  ["/refund-policy", "Refund Policy"],
];

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pt-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="max-w-sm font-display text-2xl font-medium leading-tight text-paper">
            Badminton coaching, run from the court.
          </p>
          <div className="mt-8">
            <StoreBadges />
          </div>
        </div>
        <div>
          <Mono className="text-fog">Legal</Mono>
          <ul className="mt-4 space-y-2">
            {legal.map(([href, text]) => (
              <li key={href}>
                <Link href={href} className="text-paper underline-offset-4 hover:underline">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Mono className="text-fog">Support</Mono>
          <p className="mt-4 text-paper">Chat with support in the app, from Settings.</p>
          <a href="mailto:support@osmash.ocgt.app" className="mt-2 block text-shuttle underline-offset-4 hover:underline">
            support@osmash.ocgt.app
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] justify-between gap-4 px-4 pt-12 sm:px-8">
        <Mono className="text-fog">© 2026 OC Global Technology Sdn. Bhd.</Mono>
        <Mono className="text-fog">Made in Malaysia</Mono>
      </div>
      <p
        aria-hidden
        className="mt-6 select-none whitespace-nowrap text-center font-display text-[24vw] font-semibold uppercase leading-[0.75] tracking-[-0.04em] text-ink-subtle"
      >
        O&apos;Smash
      </p>
    </footer>
  );
}
