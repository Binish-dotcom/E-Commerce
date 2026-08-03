import { Icon } from "../../../shared/components";

const products = [
  {
    title: "Wireless Earbuds",
    category: "Noise cancelling",
    price: "$49.99",
    rating: "4.8",
    accent: "from-white to-[#edf6f6]",
    object: "earbuds",
  },
  {
    title: "Smart Watch",
    category: "Fitness tracking",
    price: "$79.99",
    rating: "4.7",
    accent: "from-[#151923] to-[#2e3a4f]",
    object: "watch",
  },
  {
    title: "Classic Backpack",
    category: "Water resistant",
    price: "$34.99",
    rating: "4.6",
    accent: "from-[#1f2937] to-[#111827]",
    object: "bag",
  },
  {
    title: "Aroma Diffuser",
    category: "7 color LED light",
    price: "$24.99",
    rating: "4.5",
    accent: "from-[#f8fafc] to-[#efd6bb]",
    object: "diffuser",
  },
  {
    title: "Hydrating Serum",
    category: "For all skin types",
    price: "$19.99",
    rating: "4.4",
    accent: "from-[#f8fff8] to-[#d7e8c9]",
    object: "serum",
  },
  {
    title: "Casual Sneakers",
    category: "Lightweight comfort",
    price: "$59.99",
    rating: "4.7",
    accent: "from-white to-[#f0f2f4]",
    object: "shoe",
  },
];

const ProductArt = ({ product }) => {
  const base = `relative flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${product.accent}`;

  if (product.object === "watch") {
    return (
      <div className={base}>
        <span className="absolute h-24 w-9 rounded-full bg-black/80" />
        <span className="z-10 flex h-16 w-14 items-center justify-center rounded-2xl border-4 border-black bg-[#101827] text-xs font-black text-[#80f4b5]">
          99
        </span>
      </div>
    );
  }

  if (product.object === "bag") {
    return (
      <div className={base}>
        <span className="h-20 w-16 rounded-lg bg-[#111827] shadow-lg" />
        <span className="absolute top-6 h-7 w-12 rounded-t-full border-4 border-[#374151] border-b-0" />
        <span className="absolute bottom-9 h-px w-16 bg-white/15" />
      </div>
    );
  }

  if (product.object === "diffuser") {
    return (
      <div className={base}>
        <span className="absolute top-4 h-14 w-10 rounded-t-full bg-white/80" />
        <span className="absolute bottom-5 h-14 w-20 rounded-b-full rounded-t-xl bg-[#bd8546]" />
      </div>
    );
  }

  if (product.object === "serum") {
    return (
      <div className={base}>
        <span className="h-20 w-9 rounded-md border border-[#c7d4bd] bg-white shadow-md" />
        <span className="absolute top-5 h-5 w-6 rounded-sm bg-slate-200" />
        <span className="absolute bottom-10 h-7 w-7 rounded-sm bg-[#91af72]" />
      </div>
    );
  }

  if (product.object === "shoe") {
    return (
      <div className={base}>
        <span className="h-10 w-24 -rotate-6 rounded-[40px_18px_18px_18px] bg-white shadow-lg" />
        <span className="absolute bottom-8 h-2 w-28 rounded-full bg-slate-300" />
      </div>
    );
  }

  return (
    <div className={base}>
      <span className="h-16 w-10 rounded-[50%_50%_42%_42%] bg-white shadow-lg" />
      <span className="ml-2 h-16 w-10 rounded-[50%_50%_42%_42%] bg-white shadow-lg" />
      <span className="absolute bottom-5 h-6 w-20 rounded-lg bg-white shadow-md" />
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section id="featured-products" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-normal text-[#17233f]">Featured Products</h2>
        <a
          href="#featured-products"
          className="hidden items-center gap-2 text-sm font-extrabold text-[#178f95] transition hover:text-[#12757a] sm:inline-flex"
        >
          View all products
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {products.map((product) => (
          <article
            key={product.title}
            className="group rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200"
          >
            <ProductArt product={product} />
            <div className="mt-4">
              <div className="flex items-start justify-between gap-2">
                <span>
                  <h3 className="text-sm font-black text-[#17233f]">{product.title}</h3>
                  <p className="mt-1 text-xs font-medium text-[#64748b]">{product.category}</p>
                </span>
                <button
                  type="button"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] text-[#64748b] transition hover:border-[#178f95] hover:text-[#178f95]"
                  aria-label={`Add ${product.title} to wishlist`}
                >
                  <Icon name="heart" className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-lg font-black text-[#178f95]">{product.price}</span>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95] transition hover:bg-[#178f95] hover:text-white"
                  aria-label={`Add ${product.title} to cart`}
                >
                  <Icon name="cart" className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[#f5b301]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon key={index} name="star" className="h-3.5 w-3.5" filled />
                ))}
                <span className="ml-1 text-xs font-semibold text-[#64748b]">({product.rating})</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
