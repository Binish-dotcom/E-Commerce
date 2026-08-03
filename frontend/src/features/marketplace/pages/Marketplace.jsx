import { Link } from "react-router-dom";
import { Icon, PublicFooter, PublicNavbar } from "../../../shared/components";

const categories = ["All", "Electronics", "Fashion", "Home & Kitchen", "Beauty"];

const products = [
  {
    title: "Wireless Earbuds",
    category: "Electronics",
    description: "Noise cancelling audio with compact charging case.",
    price: "$49.99",
    icon: "headphones",
    color: "from-[#edfafa] to-white text-[#178f95]",
  },
  {
    title: "Classic Backpack",
    category: "Fashion",
    description: "Water resistant daily carry for work and travel.",
    price: "$34.99",
    icon: "bag",
    color: "from-[#f1f5f9] to-white text-[#17233f]",
  },
  {
    title: "Home Comfort Sofa",
    category: "Home & Kitchen",
    description: "Soft accent seating for calm, cozy spaces.",
    price: "$129.99",
    icon: "sofa",
    color: "from-[#edf7f4] to-white text-[#178f95]",
  },
  {
    title: "Hydrating Serum",
    category: "Beauty",
    description: "Lightweight skin care for a fresh daily routine.",
    price: "$19.99",
    icon: "beauty",
    color: "from-[#fff1ed] to-white text-[#bd5555]",
  },
  {
    title: "Smart Watch",
    category: "Electronics",
    description: "Fitness tracking, notifications, and all-day battery.",
    price: "$79.99",
    icon: "clock",
    color: "from-[#eefafa] to-white text-[#178f95]",
  },
  {
    title: "Everyday Shirt",
    category: "Fashion",
    description: "Soft cotton fit designed for everyday comfort.",
    price: "$24.99",
    icon: "shirt",
    color: "from-[#fde8df] to-white text-[#c65e45]",
  },
];

const Marketplace = () => {
  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="Marketplace" />

      <section className="bg-gradient-to-br from-white via-[#f7fcfc] to-[#fff7f1]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <span className="inline-flex rounded-xl bg-[#dff3f2] px-4 py-2 text-sm font-extrabold text-[#178f95]">
              ShopEase Marketplace
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-[#17233f] sm:text-5xl lg:text-6xl">
              Explore quality products without signing in.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#64748b]">
              Browse trusted sellers, popular categories, and featured finds.
              Login is only needed when you want to buy, save, or manage orders.
            </p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <a
                href="#products"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#178f95] px-8 text-sm font-extrabold text-white shadow-lg shadow-[#178f95]/20 transition hover:-translate-y-0.5 hover:bg-[#12757a]"
              >
                Browse Products
                <Icon name="arrowRight" className="h-5 w-5" />
              </a>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#178f95]/45 bg-white px-8 text-sm font-extrabold text-[#178f95] transition hover:-translate-y-0.5 hover:bg-[#f6fbfb]"
              >
                Need Help?
                <Icon name="arrowRight" className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories.slice(1).map((category, index) => (
              <div
                key={category}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-lg shadow-slate-200/55"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
                  <Icon
                    name={["headphones", "shirt", "sofa", "beauty"][index]}
                    className="h-7 w-7"
                  />
                </span>
                <h2 className="mt-5 text-xl font-black text-[#17233f]">{category}</h2>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  Discover curated picks from trusted ShopEase sellers.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto w-full max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black text-[#178f95]">Public Marketplace</p>
            <h2 className="mt-1 text-3xl font-black tracking-normal text-[#17233f]">
              Featured Products
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`rounded-xl border px-4 py-2 text-sm font-extrabold transition ${
                  category === "All"
                    ? "border-[#178f95] bg-[#178f95] text-white"
                    : "border-[#e5e7eb] bg-white text-[#64748b] hover:border-[#178f95] hover:text-[#178f95]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.title}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-lg shadow-slate-200/55 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
            >
              <div
                className={`flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color}`}
              >
                <Icon name={product.icon} className="h-16 w-16" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <span>
                  <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-black text-[#178f95]">
                    {product.category}
                  </span>
                  <h3 className="mt-3 text-xl font-black text-[#17233f]">{product.title}</h3>
                </span>
                <span className="text-xl font-black text-[#178f95]">{product.price}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">{product.description}</p>
              <Link
                to="/login"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#178f95] text-sm font-extrabold text-white transition hover:bg-[#12757a]"
              >
                Login to Buy
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <PublicFooter />
    </main>
  );
};

export default Marketplace;
