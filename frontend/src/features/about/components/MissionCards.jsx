import { Icon } from "../../../shared/components";

const cards = [
  {
    icon: "target",
    title: "Our Mission",
    description:
      "To make everyday online shopping easier by offering quality products, secure payments, and fast delivery.",
  },
  {
    icon: "eye",
    title: "Our Vision",
    description:
      "To become the most trusted and customer-loved marketplace for smart and seamless shopping.",
  },
  {
    icon: "shieldCheck",
    title: "Why Customers Trust Us",
    description:
      "We prioritize security, transparency, and reliable service to ensure every shopping experience is worry-free.",
  },
];

const MissionCards = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-7 shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
              <Icon name={card.icon} className="h-8 w-8" />
            </span>
            <h3 className="mt-6 text-xl font-black tracking-normal text-[#17233f]">
              {card.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-[#64748b]">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MissionCards;
