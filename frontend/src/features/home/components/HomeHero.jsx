import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

const HomeHero = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-white via-[#f7fcfc] to-[#fff7f1]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:pb-8 lg:pt-12">
        <div className="max-w-xl">
          <span className="inline-flex rounded-xl bg-[#dff3f2] px-4 py-2 text-sm font-extrabold text-[#178f95]">
            Your one-stop marketplace
          </span>
          <h1 className="mt-5 text-5xl font-black leading-[1.08] tracking-normal text-[#17233f] sm:text-6xl lg:text-7xl">
            Shop smarter,
            <span className="block">every day.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-[#64748b]">
            Discover quality products, unbeatable deals, and a seamless shopping
            experience.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a
              href="#featured-products"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#178f95] px-8 text-sm font-extrabold text-white shadow-lg shadow-[#178f95]/20 transition hover:-translate-y-0.5 hover:bg-[#12757a]"
            >
              Shop Now
              <Icon name="arrowRight" className="h-5 w-5" />
            </a>
            <Link
              to="/marketplace"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#178f95]/45 bg-white px-8 text-sm font-extrabold text-[#178f95] transition hover:-translate-y-0.5 hover:bg-[#f6fbfb]"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] sm:min-h-[430px] lg:min-h-[460px]">
          <div className="absolute left-[20%] top-5 h-72 w-72 rounded-full bg-[#dff3f2] opacity-90 sm:left-[34%] sm:h-80 sm:w-80" />
          <div className="absolute bottom-4 left-[5%] h-16 w-[88%] rounded-[50%] bg-[#dbeceb] shadow-2xl shadow-[#178f95]/10" />

          <div className="absolute bottom-16 left-[5%] h-24 w-64 rounded-[50%] bg-[#d5ebe8] shadow-lg" />
          <div className="absolute bottom-12 left-[43%] h-32 w-72 rounded-[50%] bg-[#cfe8e4] shadow-lg" />
          <div className="absolute bottom-14 right-[2%] h-24 w-56 rounded-[50%] bg-[#e8f3f0] shadow-md" />

          <div className="absolute bottom-24 left-[8%] h-64 w-44 rounded-[4px_4px_18px_18px] bg-gradient-to-br from-[#dff3f2] to-[#b7ded9] shadow-2xl shadow-[#178f95]/15">
            <div className="absolute -top-10 left-10 h-14 w-24 rounded-t-full border-4 border-[#b59d82] border-b-0" />
            <div className="absolute left-8 top-28 flex items-center gap-2 text-[#178f95]">
              <Icon name="bag" className="h-6 w-6" />
              <span className="text-lg font-black">ShopEase</span>
            </div>
            <div className="absolute bottom-0 left-0 h-12 w-full bg-[#9ed3ce]/30" />
          </div>

          <div className="absolute bottom-28 left-[38%] flex h-48 w-48 items-center justify-center rounded-full bg-white/55">
            <div className="relative h-36 w-36">
              <div className="absolute left-4 top-5 h-24 w-24 rounded-t-full border-[10px] border-[#f5eee6] border-b-0 shadow-sm" />
              <div className="absolute bottom-5 left-0 h-20 w-12 rounded-full bg-[#fff8ef] shadow-lg" />
              <div className="absolute bottom-5 right-0 h-20 w-12 rounded-full bg-[#fff8ef] shadow-lg" />
            </div>
          </div>

          <div className="absolute bottom-28 right-[13%] h-36 w-40 rounded-lg bg-[#d6ad79] shadow-xl">
            <div className="absolute left-0 top-8 h-px w-full bg-[#c19762]" />
            <div className="absolute left-16 top-0 h-full w-4 bg-[#bd8f58]/35" />
            <Icon name="cart" className="absolute bottom-5 right-5 h-8 w-8 text-[#8a6235]" />
          </div>

          <div className="absolute bottom-28 left-[56%] h-16 w-28 rounded-full bg-[#178f95] shadow-lg shadow-[#178f95]/25">
            <div className="absolute left-6 top-4 h-2 w-14 rounded-full bg-white/20" />
          </div>

          <div className="absolute bottom-[6.25rem] right-0 flex h-36 w-28 items-end justify-center rounded-b-full bg-white/70">
            <div className="relative h-28 w-20">
              <span className="absolute bottom-0 left-9 h-24 w-2 rounded-full bg-[#5a8f54]" />
              <span className="absolute left-0 top-8 h-9 w-16 -rotate-12 rounded-full bg-[#6fad68]" />
              <span className="absolute right-0 top-3 h-10 w-16 rotate-12 rounded-full bg-[#75b36d]" />
              <span className="absolute left-5 top-0 h-9 w-14 -rotate-45 rounded-full bg-[#8bc780]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
