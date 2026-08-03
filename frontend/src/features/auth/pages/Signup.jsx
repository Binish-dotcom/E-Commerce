import SignupForm from "../components/SignupForm";
import { BrandBadge, Button, Card } from "../../../shared/components";

const featureItems = [
  {
    title: "Wide Selection",
    description: "Browse quality marketplace products from trusted sellers.",
  },
  {
    title: "Trusted & Secure",
    description: "Verified accounts, OTP protection, and safe role-based access.",
  },
  {
    title: "Grow Your Business",
    description: "Create your store, list products, and manage everything in one dashboard.",
  },
];

const Signup = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fbfdfc] px-5 py-3 text-[#17233f]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#dff3f2]/90 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F9C5A8]/50 blur-3xl" />

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-start gap-6 py-2 xl:grid-cols-[290px_minmax(520px,620px)_1fr]">
        <aside className="hidden pt-24 xl:block">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#17233f]">
            Buy. Sell.
            <br />
            Grow <span className="font-serif italic text-[#178f95]">together.</span>
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
            Join a modern marketplace experience built for buyers, sellers, and growing brands.
          </p>

          <div className="mt-5 space-y-4">
            {featureItems.map((item, index) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dff3f2] text-sm font-black text-[#178f95]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#17233f]">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <Card className="mx-auto w-full max-w-[620px] bg-white/92 p-3.5 shadow-[0_18px_60px_rgba(23,35,63,0.12)] ring-slate-200/70 backdrop-blur">
          <BrandBadge size="sm" />
          <div className="mt-1.5 text-center">
            <h2 className="text-xl font-extrabold tracking-tight text-[#17233f]">
              Create Your Account
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Join as a Buyer or Seller and get started
            </p>
          </div>

          <div className="mt-2">
            <SignupForm />
          </div>
        </Card>

        <aside className="relative hidden min-h-[460px] items-center justify-center pt-24 xl:flex">
          <div className="absolute right-8 top-20 h-64 w-64 rounded-full bg-[#dff3f2] blur-3xl" />
          <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-[#178f95]/10 blur-2xl" />
          <div className="absolute bottom-16 left-8 h-16 w-16 rounded-full bg-[#F9C5A8]" />

          <div className="relative h-[360px] w-[310px]">
            <div className="absolute left-5 top-16 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-100">
              <div className="h-24 w-40 rounded-2xl bg-gradient-to-br from-[#dff3f2] to-[#178f95]" />
              <div className="mt-3 h-2.5 w-28 rounded-full bg-slate-200" />
              <div className="mt-2 h-2.5 w-20 rounded-full bg-slate-100" />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-black text-[#17233f]">Rs. 2,499</span>
                <span className="rounded-full bg-[#F9C5A8]/80 px-2.5 py-1 text-[11px] font-bold text-[#17233f]">
                  New
                </span>
              </div>
            </div>

            <div className="absolute bottom-3 right-3 h-52 w-32 rounded-[28px] bg-[#17233f] p-2 shadow-2xl">
              <div className="h-full rounded-3xl bg-white p-3">
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-300" />
                <div className="h-20 rounded-2xl bg-[#dff3f2]" />
                <p className="mt-3 text-[11px] font-bold text-slate-400">Marketplace</p>
                <p className="mt-0.5 text-base font-black text-[#17233f]">Cart</p>
                <Button size="sm" className="mt-3 h-8 w-full rounded-lg text-[11px]">
                  Checkout
                </Button>
              </div>
            </div>

            <div className="absolute bottom-4 left-10 h-20 w-24 rotate-[-7deg] rounded-2xl bg-[#c99b63] shadow-xl">
              <div className="absolute left-0 top-6 h-4 w-full bg-[#a9783f]/40" />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Signup;
