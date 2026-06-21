import { Reveal, SectionHeading } from "@/components/shared/Reveal";
import { optionalAddons } from "@/data/website-pricing";

export function OptionalAddons() {
  return (
    <section className="mt-20 sm:mt-24">
      <SectionHeading title="Optional Add-Ons" className="mb-4 sm:mb-6" />
      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-nx-grey">
        Optional add-ons are available for the <span className="text-white">Pro</span> package only.
        All add-ons listed below are included as standard in the{" "}
        <span className="text-white">Enterprise</span> package.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {optionalAddons.map((addon, i) => (
          <Reveal key={addon.name} delay={i * 0.05}>
            <div className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-nx-cyan/25 hover:shadow-[0_0_25px_rgba(0,229,255,0.08)] sm:p-6">
              <h3 className="font-display text-base font-bold text-white">{addon.name}</h3>
              <p className="mt-2 font-display text-xl font-bold text-nx-cyan">{addon.price}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
