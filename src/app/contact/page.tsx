import type { Metadata } from "next";
import { Mail, Phone, Clock, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { Reveal, GlassCard } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  contactFaqs,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  CONTACT_HOURS,
  CONTACT_OFFICE,
} from "@/data/content";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a free consultation with NexDesk to discuss custom CRM, HR, portals, automation, and enterprise website projects.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Let's Build Something Powerful"
        description="Tell us about your business and what you need. We respond within one business day."
        video="hero"
      />

      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex justify-center">
              <a
                href="#faqs"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-nx-navy/40 px-5 py-2.5 text-sm text-nx-grey transition hover:border-nx-cyan/30 hover:text-nx-cyan"
              >
                Have questions before booking? View our FAQs below
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <div className="space-y-4 lg:col-span-2">
              {[
                { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                { icon: Phone, label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}` },
                { icon: MapPin, label: "Office", value: CONTACT_OFFICE },
                { icon: Clock, label: "Hours", value: CONTACT_HOURS },
              ].map(({ icon: Icon, label, value, href }) => (
                <Reveal key={label}>
                  <GlassCard className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-nx-cyan/10 text-nx-cyan">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-nx-grey">
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="mt-1 block text-sm text-white hover:text-nx-cyan">
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-white">{value}</p>
                      )}
                    </div>
                  </GlassCard>
                </Reveal>
              ))}

              <Reveal delay={0.1}>
                <ButtonLink
                  href={`https://wa.me/${CONTACT_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-semibold"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message on WhatsApp
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div id="faqs" className="mt-12 scroll-mt-28 sm:mt-20">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Common Questions</h2>
            <p className="mt-2 mb-8 text-nx-grey">Quick answers before you reach out.</p>
            <div className="max-w-3xl space-y-3">
              {contactFaqs.map((faq) => (
                <details
                  key={faq.q}
                  className="glass group rounded-xl border border-white/5 px-5 py-1 open:border-nx-cyan/20"
                >
                  <summary className="cursor-pointer list-none py-4 font-medium text-white marker:content-none group-open:text-nx-cyan">
                    {faq.q}
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-nx-grey">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
