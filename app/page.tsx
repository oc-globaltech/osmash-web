import Image from "next/image";
import { ArrowDown, MapPin, QrCode, Users, Wallet } from "lucide-react";
import Motion from "./motion";
import { Footer, Header, Mono, StoreBadges } from "./site";

const features = [
  ["Sessions", "Run every session from the court.", "Schedule, courts and sub-coaches in one place, built for the minute between games."],
  ["Team", "Invite your team.", "Add players and coaches with one invite link. They join in a tap."],
  ["Check-in", "Scan in. Know who showed up.", "QR attendance for every session, with your sub-coaches and players in one roster."],
  ["Fees", "Fees, paid in the app.", "Players pay their monthly fee in O'Smash. The money goes to your academy."],
  ["Discover", "Find a coach near you.", "Choose where you train and see the academies and solo coaches near it."],
  ["Family", "Bring your child along.", "Guardians connect their child, follow their sessions and pay their fees."],
];

const ticker = ["Sessions", "QR check-in", "Monthly fees", "Find a coach", "Sub-coaches", "Courts"];

const coachPoints = [
  "Coach solo for free, under your own name",
  "Create an academy and bring in sub-coaches",
  "Plan sessions across all your courts",
  "Collect monthly fees in the app and track income",
];

const playerPoints = [
  { Icon: MapPin, title: "Find a coach near you", body: "Pick where you train and see the academies and solo coaches near it, with their courts." },
  { Icon: QrCode, title: "Check in with a scan", body: "Scan your coach's session QR when you arrive. Your coach sees you on the list." },
  { Icon: Wallet, title: "Pay the month in the app", body: "Pay your academy's monthly fee by card. The money goes straight to the academy." },
  { Icon: Users, title: "Bring your child along", body: "Link your child's account, approve their academy and pay their fees." },
];

const steps = [
  ["Pick your role", "Coach, player or guardian. Choose how you use O'Smash."],
  ["Join your team", "Create an academy, or join one with an invite link or code."],
  ["Get on court", "Sessions, check-ins and fees run from your phone."],
];

// A badminton court to scale: 13.4 m × 6.1 m, 1 unit = 1 cm.
function Court({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1340 610" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="1" y="1" width="1338" height="608" />
      <path d="M0 46H1340M0 564H1340M76 0V610M1264 0V610M472 0V610M868 0V610M0 305H472M868 305H1340" />
      <path d="M670 -20V630" strokeWidth="4" strokeDasharray="6 6" />
    </svg>
  );
}

// Material Design Icons "badminton" (Apache-2.0).
function Shuttle() {
  return (
    <svg viewBox="0 0 24 24" className="inline-block size-[0.7em]" aria-hidden>
      <path
        fill="currentColor"
        d="M12.3 2c-.97.03-1.72.84-1.69 1.8c.01.24.06.47.16.7l.29.64c.04.13-.03.27-.17.31c-.09.05-.19 0-.26-.08l-.42-.55c-.33-.42-.83-.68-1.36-.69c-.97-.02-1.77.75-1.79 1.71c-.01.42.13.82.39 1.16l.42.5h.01c.08.13.05.29-.06.37c-.09.07-.21.07-.29 0L7 7.45c-.34-.26-.75-.4-1.16-.39c-.96.02-1.73.82-1.71 1.79c.01.53.27 1.03.69 1.36l.57.44c.11.1.11.26-.01.35a.23.23 0 0 1-.26.05h-.01l-.61-.28c-.23-.09-.46-.15-.7-.16c-.96-.03-1.77.73-1.8 1.7c0 .72.4 1.38 1.06 1.66l11.39 5.07l4.59-4.59l-5.07-11.39C13.69 2.39 13 1.97 12.3 2m.83 4.1c.42-.01.8.23.96.61l3.05 6.84l-3.95-3.94l-.93-2.11c-.3-.63.16-1.38.87-1.4M9.85 8.85c.27 0 .52.1.71.3l4.81 4.81c.4.38.41 1.01.03 1.41c-.4.4-1.02.41-1.44 0l-4.81-4.81a.987.987 0 0 1-.02-1.41c.19-.2.45-.3.72-.3m-2.72 3.32c.13 0 .27.04.37.09l2.13.94l3.94 3.94l-6.86-3.05c-1.02-.44-.68-1.95.42-1.92m13.15 3.87l-4.24 4.24l.85.85c.76.75 1.86 1.04 2.89.77a3.02 3.02 0 0 0 2.12-2.12c.27-1.03-.02-2.13-.77-2.89z"
      />
    </svg>
  );
}

function SoloSticker() {
  return (
    <div className="relative grid size-32 place-items-center rounded-full bg-shuttle text-navy md:size-40">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text className="fill-current font-mono text-[9.5px] font-medium uppercase tracking-[0.2em]">
          <textPath href="#ring">Free for solo coaches · Free for solo coaches ·</textPath>
        </text>
      </svg>
      <span className="font-display text-3xl font-semibold">RM0</span>
      <span className="sr-only">Free for solo coaches</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 overflow-x-clip">
        {/* Hero */}
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%] [perspective:900px]">
            <Court className="absolute bottom-[-25%] left-1/2 w-[160%] max-w-none -translate-x-1/2 text-white/15 [transform:rotateX(64deg)]" />
          </div>
          <div className="absolute left-1/2 top-[38%] -z-10 size-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-court-deep/50 blur-[120px]" />

          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 pb-8 pt-28 sm:px-8">
            <div className="grid grid-cols-2 gap-4 border-b border-white/15 pb-4 md:grid-cols-3">
              <Mono className="text-paper">(01) Badminton coaching app</Mono>
              <Mono className="hidden text-fog md:block md:justify-self-center">Sessions · Check-ins · Fees</Mono>
              <Mono className="justify-self-end text-shuttle">● Coming soon · iOS &amp; Android</Mono>
            </div>

            <div className="relative mt-[3vh] flex flex-1 flex-col justify-center">
              <h1>
              <span className="sr-only">Smash your limits</span>
              {/* The jump-smash photo shows through the letters and drifts as you scroll. */}
              <span aria-hidden className="block overflow-hidden">
                <span
                  data-rise
                  data-bg-drift
                  className="block bg-[url('/photos/jump-indoor.jpg')] bg-cover bg-[position:50%_30%] bg-clip-text text-center font-display text-[25vw] font-semibold uppercase leading-[0.8] tracking-[-0.055em] text-transparent xl:text-[360px]"
                >
                  Smash
                </span>
              </span>
              <span aria-hidden className="mt-2 flex items-baseline justify-center gap-[3vw] md:mt-0">
                <span data-split className="text-outline font-display text-[10vw] font-semibold uppercase leading-none tracking-[-0.04em] text-paper xl:text-[150px]">
                  your
                </span>
                <span data-split className="font-serif text-[12vw] italic leading-none tracking-[-0.02em] text-shuttle xl:text-[175px]">
                  limits
                </span>
              </span>
              </h1>

            </div>

            <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full" aria-hidden>
              <path
                d="M-40 820 C 360 120, 1000 20, 1500 460"
                pathLength={1}
                strokeDasharray="1"
                className="animate-draw fill-none stroke-shuttle"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="relative mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto_auto]">
              <p className="max-w-md text-lg text-paper/90">
                Sessions, QR check-ins and monthly fees for badminton academies, solo coaches, players and parents. Run from the
                court, on your phone.
              </p>
              <StoreBadges />
              <a
                href="#idea"
                aria-label="Scroll to the next section"
                className="group relative hidden size-28 place-items-center rounded-full border border-white/20 md:grid"
              >
                <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full text-fog" aria-hidden>
                  <defs>
                    <path id="scroll-ring" d="M50 50m-40 0a40 40 0 1 1 80 0a40 40 0 1 1-80 0" />
                  </defs>
                  <text className="fill-current font-mono text-[9px] uppercase tracking-[0.25em]">
                    <textPath href="#scroll-ring">Scroll down · Scroll down ·</textPath>
                  </text>
                </svg>
                <ArrowDown className="size-5 text-paper transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="relative z-10 -rotate-2 scale-105 overflow-hidden bg-shuttle py-4 text-navy">
          <div className="animate-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {ticker.map((word) => (
                  <span key={word} className="flex items-center gap-8 px-4 font-display text-5xl font-semibold uppercase tracking-tight md:text-7xl">
                    {word}
                    <Shuttle />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Statement */}
        <section id="idea" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-32 sm:px-8 md:py-48">
          <Mono className="text-fog">(02) The idea</Mono>
          <p
            data-scrub-words
            className="mt-10 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-paper md:text-[5.2vw] xl:text-[76px]"
          >
            Coaching happens in the minute between games. O&apos;Smash puts the schedule, the courts, the check-ins
            and the fees in that minute, on the phone already in your hand.
          </p>
        </section>

        {/* Product */}
        <section id="product" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-4 py-24 sm:px-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <Mono className="text-fog">(03) The app</Mono>
                <div className="relative mt-10">
                  <div className="absolute -inset-10 -z-10 rounded-full bg-court/40 blur-3xl" />
                  <div className="mx-auto w-[260px] -rotate-6 rounded-[44px] bg-gradient-to-br from-ink-subtle to-ink-raised p-3 ring-1 ring-white/10 md:w-[300px]">
                    <Image
                      src="/images/app-find-coach.png"
                      alt="O'Smash Find a coach screen listing academies and solo coaches near Johor Bahru"
                      width={644}
                      height={1400}
                      sizes="300px"
                      className="rounded-[34px]"
                    />
                  </div>
                  <Mono className="mt-8 block text-center text-fog">Find a coach · iOS</Mono>
                </div>
              </div>
            </div>
            <ol className="md:col-span-7">
              {features.map(([tag, title, body], i) => (
                <li key={title} data-reveal className="grid gap-4 border-b border-line py-10 first:pt-0 md:grid-cols-[120px_1fr]">
                  <Mono className="text-shuttle">
                    {String(i + 1).padStart(2, "0")} / {tag}
                  </Mono>
                  <div>
                    <h2 className="font-display text-3xl font-medium tracking-[-0.02em] text-paper md:text-5xl">{title}</h2>
                    <p className="mt-4 max-w-lg text-lg">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* On court gallery */}
        <section className="overflow-hidden py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <h2 data-reveal className="font-display text-[13vw] font-semibold uppercase leading-[0.85] tracking-[-0.04em] text-paper md:text-[9vw] xl:text-[130px]">
              Made for <span className="font-serif font-normal normal-case italic text-sky">the</span> court
            </h2>
            <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-6">
              <figure className="col-span-1 md:col-span-4 md:mt-24" data-speed="1">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
                  <Image src="/photos/jump-indoor.jpg" alt="A player in red leaps for a smash on an indoor court" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="mt-3"><Mono className="text-fog">Jump smash</Mono></figcaption>
              </figure>
              <figure className="col-span-1 md:col-span-4" data-speed="2">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
                  <Image src="/photos/night-court.jpg" alt="A player lunging for a drive under court lights at night" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="mt-3"><Mono className="text-fog">Night session</Mono></figcaption>
              </figure>
              <figure className="col-span-2 md:col-span-4 md:mt-48" data-speed="0.5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[2/3]">
                  <Image src="/photos/match-jump.jpg" alt="A young player jumps to hit the shuttle during a match" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" />
                </div>
                <figcaption className="mt-3"><Mono className="text-fog">Match day</Mono></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Coaches */}
        <section id="coaches" className="relative scroll-mt-20 bg-mist text-navy">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-24 sm:px-8 md:grid-cols-12 md:py-32">
            <div className="md:col-span-6">
              <Mono>(04) For coaches</Mono>
              <h2 data-reveal className="mt-10 max-w-xl font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] md:text-7xl">
                Coach <span className="font-serif font-normal normal-case italic text-court">solo,</span> or run an academy.
              </h2>
              <div className="mt-12">
                <SoloSticker />
              </div>
            </div>
            <ul className="divide-y divide-navy/15 self-end border-y border-navy/15 text-lg md:col-span-6">
              {coachPoints.map((p, i) => (
                <li key={p} data-reveal className="flex gap-6 py-5">
                  <Mono className="pt-1.5 text-navy/60">0{i + 1}</Mono>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Players */}
        <section id="players" className="scroll-mt-20 bg-court text-paper">
          <div className="mx-auto max-w-[1440px] px-4 py-24 sm:px-8 md:py-32">
            <div className="grid gap-8 border-b border-white/25 pb-12 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <Mono>(05) For players &amp; guardians</Mono>
                <h2 data-reveal className="mt-10 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] md:text-7xl">
                  Find a coach. Show up. <span className="font-serif font-normal normal-case italic text-shuttle">Play.</span>
                </h2>
              </div>
              <p data-reveal className="text-lg text-paper/85 md:col-span-4 md:col-start-9">
                Everything a player or a parent does around a session, from finding a coach to paying the month, in
                one app.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-3xl bg-white/20 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              {playerPoints.map(({ Icon, title, body }, i) => (
                <li key={title} data-reveal className="flex flex-col bg-court p-8 transition-colors duration-300 hover:bg-court-deep">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-shuttle text-navy">
                      <Icon className="size-5" strokeWidth={2} aria-hidden />
                    </span>
                    <Mono className="text-sky">0{i + 1}</Mono>
                  </div>
                  <h3 className="mt-16 font-display text-2xl font-medium leading-tight">{title}</h3>
                  <p className="mt-3 text-paper/80">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Steps */}
        <section id="how" className="mx-auto max-w-[1440px] scroll-mt-20 px-4 py-32 sm:px-8">
          <Mono className="text-fog">(06) How it works</Mono>
          <h2 data-reveal className="mt-10 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-paper md:text-8xl">
            On court in <span className="font-serif font-normal normal-case italic text-shuttle">three</span> steps
          </h2>
          <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-6">
            {steps.map(([title, body], i) => (
              <li key={title} data-reveal className="border-t border-line pt-6">
                <span className="text-outline font-display text-[140px] font-semibold leading-none text-signal">{i + 1}</span>
                <h3 className="mt-6 font-display text-3xl font-medium text-paper">{title}</h3>
                <p className="mt-3 max-w-xs text-lg">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Download */}
        <section id="download" className="relative isolate scroll-mt-20 overflow-hidden">
          <div className="absolute inset-0 -z-10 scale-125" data-speed="-1">
            <Image src="/photos/shuttle-net.jpg" alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-ink/70" />
          <div className="mx-auto max-w-[1440px] px-4 py-32 sm:px-8 md:py-48">
            <Mono className="text-paper">(07) Coming soon</Mono>
            <h2 data-reveal className="mt-10 max-w-5xl font-display text-[15vw] font-semibold uppercase leading-[0.82] tracking-[-0.045em] text-paper md:text-[10vw] xl:text-[150px]">
              Ready to <span className="font-serif font-normal normal-case italic text-shuttle">smash</span> it?
            </h2>
            <p className="mt-8 max-w-md text-lg text-paper/90">
              O&apos;Smash is coming to iPhone and Android. Run your next session from the court.
            </p>
            <div className="mt-12">
              <StoreBadges size="lg" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Motion />
    </>
  );
}
