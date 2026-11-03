import Motion from "./motion";
import { Footer, Header, Mono } from "./site";

// Shell for the legal pages. Their wording is a draft until legal review, as in osmash-api.
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-32 pt-40 sm:px-8">
        <Mono className="rounded-full border border-shuttle/40 px-3 py-1.5 text-shuttle">
          Draft, pending legal review
        </Mono>
        <h1 data-split className="mt-8 font-display text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-paper sm:text-5xl md:text-7xl">
          {title}
        </h1>
        <Mono className="mt-6 block text-fog">Last updated 3 November 2026</Mono>
        <div className="legal mt-12 text-lg">{children}</div>
      </main>
      <Footer />
      <Motion />
    </>
  );
}
