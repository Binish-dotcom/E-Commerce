import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

const AboutHero = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-white via-[#f7fcfc] to-[#fff7f1]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-xl bg-[#dff3f2] px-4 py-2 text-sm font-extrabold text-[#178f95]">
            About ShopEase
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-[#17233f] sm:text-5xl lg:text-6xl">
            We make online shopping simple, smart, and reliable.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#64748b]">
            ShopEase helps you discover quality products from trusted sellers
            with secure payments and fast delivery, every time.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/marketplace"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#178f95] px-8 text-sm font-extrabold text-white shadow-lg shadow-[#178f95]/20 transition hover:-translate-y-0.5 hover:bg-[#12757a]"
            >
              Explore Marketplace
              <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
            <a
              href="#contact-us"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#178f95]/45 bg-white px-8 text-sm font-extrabold text-[#178f95] transition hover:-translate-y-0.5 hover:bg-[#f6fbfb]"
            >
              Contact Us
              <Icon name="arrowRight" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative min-h-[350px] sm:min-h-[430px]">
          <div className="absolute left-[26%] top-4 h-72 w-72 rounded-full bg-[#dff3f2] opacity-90 sm:h-80 sm:w-80" />
          <div className="absolute bottom-5 left-[7%] h-16 w-[86%] rounded-[50%] bg-[#dbeceb] shadow-2xl shadow-[#178f95]/10" />
          <div className="absolute bottom-16 left-[8%] h-24 w-64 rounded-[50%] bg-[#d5ebe8]" />
          <div className="absolute bottom-14 left-[42%] h-32 w-72 rounded-[50%] bg-[#cfe8e4]" />
          <div className="absolute bottom-16 right-[5%] h-24 w-52 rounded-[50%] bg-[#e8f3f0]" />

          <div className="absolute bottom-[6.25rem] left-[10%] h-60 w-40 rounded-[4px_4px_18px_18px] bg-gradient-to-br from-[#dff3f2] to-[#acd9d4] shadow-2xl shadow-[#178f95]/15 sm:w-44">
            <div className="absolute -top-9 left-9 h-14 w-24 rounded-t-full border-4 border-[#b59d82] border-b-0" />
            <div className="absolute left-7 top-24 flex items-center gap-2 text-[#178f95]">
              <Icon name="bag" className="h-6 w-6" />
              <span className="text-lg font-black">ShopEase</span>
            </div>
          </div>

          <div className="absolute bottom-28 left-[42%] flex h-44 w-44 items-center justify-center rounded-full bg-white/60">
            <div className="relative h-[8.5rem] w-[8.5rem]">
              <div className="absolute left-4 top-5 h-[5.5rem] w-[5.5rem] rounded-t-full border-[10px] border-[#f5eee6] border-b-0" />
              <div className="absolute bottom-5 left-0 h-[4.5rem] w-11 rounded-full bg-[#fff8ef] shadow-lg" />
              <div className="absolute bottom-5 right-0 h-[4.5rem] w-11 rounded-full bg-[#fff8ef] shadow-lg" />
            </div>
          </div>

          <div className="absolute bottom-28 right-[12%] h-[8.5rem] w-40 rounded-lg bg-[#d6ad79] shadow-xl">
            <div className="absolute left-0 top-8 h-px w-full bg-[#c19762]" />
            <div className="absolute left-16 top-0 h-full w-4 bg-[#bd8f58]/35" />
            <Icon name="package" className="absolute bottom-5 right-5 h-8 w-8 text-[#8a6235]" />
          </div>

          <div className="absolute bottom-[6.3rem] right-1 flex h-[8.5rem] w-24 items-end justify-center rounded-b-full bg-white/70">
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

export default AboutHero;
