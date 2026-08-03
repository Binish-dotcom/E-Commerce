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
    icon: "headphones",
    title: "24/7 Support",
    description: "We're here to help you anytime, anywhere.",
  },
];

const BenefitsRow = () => {
  return (
    <section className="mx-auto -mt-3 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-xl shadow-slate-200/70 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.title}
            className={`flex items-center gap-5 p-6 ${
              index !== benefits.length - 1 ? "lg:border-r lg:border-[#e5e7eb]" : ""
            } ${index < 2 ? "sm:border-b sm:border-[#e5e7eb] lg:border-b-0" : ""}`}
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
              <Icon name={benefit.icon} className="h-8 w-8" />
            </span>
            <span>
              <h3 className="text-base font-black text-[#17233f]">{benefit.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#64748b]">{benefit.description}</p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsRow;
