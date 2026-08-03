import { Link } from "react-router-dom";
import { Icon } from "../../../shared/components";

const ContactHero = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-white via-[#f7fcfc] to-[#fff7f1]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-xl bg-[#dff3f2] px-4 py-2 text-sm font-extrabold text-[#178f95]">
            Contact ShopEase
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-[#17233f] sm:text-5xl lg:text-6xl">
            We&apos;re here to help you shop with confidence.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#64748b]">
            Our friendly support team is ready to assist you with orders,
            returns, products, and any questions you have.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact-form"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#178f95] px-8 text-sm font-extrabold text-white shadow-lg shadow-[#178f95]/20 transition hover:-translate-y-0.5 hover:bg-[#12757a]"
            >
              Send Message
              <Icon name="arrowRight" className="h-5 w-5" />
            </a>
            <Link
              to="/marketplace"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#178f95]/45 bg-white px-8 text-sm font-extrabold text-[#178f95] transition hover:-translate-y-0.5 hover:bg-[#f6fbfb]"
            >
              Visit Marketplace
              <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[340px] sm:min-h-[420px]">
          <div className="absolute left-[33%] top-3 h-72 w-72 rounded-full bg-[#dff3f2] opacity-90 sm:h-80 sm:w-80" />
          <div className="absolute bottom-6 left-[6%] h-16 w-[88%] rounded-[50%] bg-[#dbeceb] shadow-2xl shadow-[#178f95]/10" />
          <div className="absolute bottom-16 left-[7%] h-24 w-64 rounded-[50%] bg-[#d5ebe8]" />
          <div className="absolute bottom-14 left-[40%] h-32 w-80 rounded-[50%] bg-[#cfe8e4]" />
          <div className="absolute bottom-16 right-[4%] h-24 w-52 rounded-[50%] bg-[#e8f3f0]" />

          <div className="absolute bottom-[6.5rem] left-[9%] h-56 w-40 rounded-[4px_4px_18px_18px] bg-gradient-to-br from-[#dff3f2] to-[#acd9d4] shadow-2xl shadow-[#178f95]/15 sm:w-44">
            <div className="absolute -top-9 left-9 h-14 w-24 rounded-t-full border-4 border-[#b59d82] border-b-0" />
            <div className="absolute left-7 top-24 flex items-center gap-2 text-[#178f95]">
              <Icon name="bag" className="h-6 w-6" />
              <span className="text-lg font-black">ShopEase</span>
            </div>
          </div>

          <div className="absolute bottom-[7.5rem] left-[38%] h-32 w-44 rounded-lg bg-[#d6ad79] shadow-xl">
            <div className="absolute left-0 top-8 h-px w-full bg-[#c19762]" />
            <div className="absolute left-16 top-0 h-full w-4 bg-[#bd8f58]/35" />
            <Icon name="cart" className="absolute bottom-5 right-5 h-8 w-8 text-[#8a6235]" />
          </div>

          <div className="absolute bottom-28 right-[17%] flex h-44 w-44 items-center justify-center rounded-full bg-white/55">
            <div className="relative h-[8.5rem] w-[8.5rem]">
              <div className="absolute left-3 top-4 h-24 w-24 rounded-t-full border-[10px] border-[#f5eee6] border-b-0" />
              <div className="absolute bottom-5 left-0 h-[4.5rem] w-11 rounded-full bg-[#fff8ef] shadow-lg" />
              <div className="absolute bottom-5 right-0 h-[4.5rem] w-11 rounded-full bg-[#fff8ef] shadow-lg" />
              <div className="absolute bottom-7 right-2 h-12 w-6 rounded-full bg-[#178f95]" />
            </div>
          </div>

          <div className="absolute bottom-20 left-[51%] rounded-2xl bg-[#178f95] px-5 py-4 text-white shadow-lg shadow-[#178f95]/25">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>
            <span className="absolute -bottom-2 left-5 h-5 w-5 rotate-45 bg-[#178f95]" />
          </div>

          <div className="absolute bottom-[6.2rem] right-1 flex h-[8.5rem] w-24 items-end justify-center rounded-b-full bg-white/70">
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

export default ContactHero;
