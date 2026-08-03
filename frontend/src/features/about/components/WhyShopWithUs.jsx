import { Icon } from "../../../shared/components";

const benefits = [
  {
    icon: "truck",
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep.",
  },
  {
    icon: "shield",
    title: "Secure Payments",
    description: "100% secure transactions with trusted methods.",
  },
  {
    icon: "refresh",
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days.",
  },
  {
    icon: "badgeCheck",
    title: "Quality Products",
    description: "Curated products from trusted sellers.",
  },
];

const WhyShopWithUs = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-3xl font-black tracking-normal text-[#17233f]">
          Why Shop With Us
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
              <Icon name={benefit.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-black text-[#17233f]">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhyShopWithUs;
