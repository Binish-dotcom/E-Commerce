import { Icon } from "../../../shared/components";

const categories = [
  {
    icon: "headphones",
    title: "Electronics",
    description: "Smartphones, laptops, accessories & more",
    color: "bg-[#dff3f2] text-[#178f95]",
  },
  {
    icon: "shirt",
    title: "Fashion",
    description: "Clothing, shoes, bags & accessories",
    color: "bg-[#fde8df] text-[#c65e45]",
  },
  {
    icon: "sofa",
    title: "Home & Kitchen",
    description: "Appliances, decor, furniture & more",
    color: "bg-[#e9f4f1] text-[#178f95]",
  },
  {
    icon: "beauty",
    title: "Beauty",
    description: "Skincare, makeup, fragrances & more",
    color: "bg-[#fdecef] text-[#bd5555]",
  },
];

const CategorySection = () => {
  return (
    <section id="categories" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-normal text-[#17233f]">Shop by Category</h2>
        <a
          href="#categories"
          className="hidden items-center gap-2 text-sm font-extrabold text-[#178f95] transition hover:text-[#12757a] sm:inline-flex"
        >
          View all categories
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            href="#featured-products"
            key={category.title}
            className="group flex min-h-28 items-center gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
          >
            <span
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${category.color}`}
            >
              <Icon name={category.icon} className="h-8 w-8" />
            </span>
            <span className="min-w-0 flex-1">
              <h3 className="font-black text-[#17233f]">{category.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#64748b]">{category.description}</p>
            </span>
            <Icon
              name="arrowRight"
              className="h-5 w-5 shrink-0 text-[#64748b] transition group-hover:translate-x-1 group-hover:text-[#178f95]"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
