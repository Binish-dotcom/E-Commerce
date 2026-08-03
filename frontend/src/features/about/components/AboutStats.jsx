import { Icon } from "../../../shared/components";

const stats = [
  { icon: "users", value: "10K+", label: "Happy Customers" },
  { icon: "shieldCheck", value: "500+", label: "Trusted Sellers" },
  { icon: "package", value: "50K+", label: "Orders Delivered" },
  { icon: "headphones", value: "24/7", label: "Customer Support" },
];

const AboutStats = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-xl shadow-slate-200/65 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex items-center gap-5 p-6 ${
              index !== stats.length - 1 ? "lg:border-r lg:border-[#e5e7eb]" : ""
            } ${index < 2 ? "sm:border-b sm:border-[#e5e7eb] lg:border-b-0" : ""}`}
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
              <Icon name={stat.icon} className="h-8 w-8" />
            </span>
            <span>
              <strong className="block text-3xl font-black tracking-normal text-[#17233f]">
                {stat.value}
              </strong>
              <span className="mt-1 block text-sm font-semibold text-[#64748b]">
                {stat.label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
