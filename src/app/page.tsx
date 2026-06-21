import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { HeroDashboard } from "@/components/home/HeroDashboard";
import { Reveal, SectionHeading, GlassCard } from "@/components/shared/Reveal";
import { VideoBackground } from "@/components/shared/VideoBackground";
import { homeMetrics, homeServices, homeProcessSteps } from "@/data/home";
import { BOOK_CONSULTATION_URL } from "@/data/navigation";
import { testimonials } from "@/data/testimonials";

export default function HomePage() {
  const recentTestimonials = testimonials.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-0 overflow-hidden sm:min-h-[85vh]">
        <VideoBackground video="hero" overlay="hero" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
        <div className="pointer-events-none absolute -right-32 top-0 hidden h-96 w-96 rounded-full bg-nx-cyan/10 blur-[100px] sm:block" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16 lg:min-h-[85vh] lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-nx-cyan sm:text-xs sm:tracking-[0.25em]">
              Enterprise Software Consultancy
            </p>
            <h1 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.12] tracking-tight sm:mt-4 sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.25rem]">
              Business Systems, Websites,{" "}
              <span className="text-gradient">AI & Automation</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-nx-grey sm:mt-6 sm:text-base md:text-lg">
              We create custom business systems, websites and AI automation solutions, along with a
              range of prebuilt platforms developed by the NexDesk team and industry-leading
              experts, ready for your business to use today.
            </p>
            <div className="mt-6 sm:mt-8">
              <ButtonLink
                size="lg"
                href={BOOK_CONSULTATION_URL}
                className="w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold sm:w-auto"
              >
                Book a Free Consultation
              </ButtonLink>
            </div>
          </Reveal>
          <div className="hidden sm:block">
            <HeroDashboard />
          </div>
        </div>
      </section>

      {/* Metrics banner */}
      <section className="border-y border-white/5 bg-nx-navy/40 py-8 sm:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {homeMetrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.06}>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-nx-cyan sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-nx-grey sm:text-xs">
                  {metric.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Three Ways We Help Your Business"
            description="From fully bespoke builds to ready-made platforms — choose the path that fits your team."
            align="center"
            className="mb-10 sm:mb-14"
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {homeServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={i * 0.08}>
                  <GlassCard hover className="flex h-full flex-col">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-nx-cyan/10 text-nx-cyan">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-nx-grey">
                      {service.description}
                    </p>
                    <ButtonLink
                      href={service.href}
                      variant="outline"
                      className="mt-6 w-full justify-center sm:w-auto"
                    >
                      Explore {service.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </ButtonLink>
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-white/5 bg-nx-navy/20 py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Client Feedback"
            title="What Our Clients Say"
            description="Recent feedback from businesses we've helped transform."
            align="center"
            className="mb-10 sm:mb-14"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentTestimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <GlassCard hover className="flex h-full flex-col">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-nx-cyan text-nx-cyan" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-nx-grey">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 border-t border-white/5 pt-4">
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-nx-grey">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-sm font-semibold text-nx-cyan hover:underline"
            >
              View all testimonials <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Simple, Transparent, Step By Step"
            description="From first call to launch and beyond — here's how we work with you."
            align="center"
            className="mb-10 sm:mb-14"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {homeProcessSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <div className="relative h-full rounded-xl border border-white/5 bg-nx-black/40 p-5">
                  <span className="font-display text-3xl font-bold text-nx-cyan/25">
                    {step.step}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-nx-grey">{step.detail}</p>
                  {i < homeProcessSteps.length - 1 && (
                    <span className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-nx-cyan/30 xl:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/5 py-14 sm:py-20">
        <VideoBackground video="grid" overlay="cta" opacity={0.22} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Ready to replace chaos with clarity?
          </h2>
          <p className="mt-3 text-sm text-nx-grey sm:mt-4 sm:text-base">
            Book a free consultation. We will map your workflows and show you what a custom NexDesk
            system could look like for your business.
          </p>
          <ButtonLink
            size="lg"
            href={BOOK_CONSULTATION_URL}
            className="mt-6 w-full bg-nx-cyan text-nx-black hover:bg-nx-aqua font-semibold sm:mt-8 sm:w-auto"
          >
            Book a Free Consultation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
