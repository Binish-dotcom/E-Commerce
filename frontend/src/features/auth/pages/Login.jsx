import LoginForm from "../components/LoginForm";
import { BrandBadge, Card } from "../../../shared/components";

const Login = () => {
  return (
    <main className="relative h-screen overflow-hidden bg-[#fbfdfc] px-5 py-5 text-[#17233f]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#dff3f2]/90 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F9C5A8]/50 blur-3xl" />

      <section className="relative z-10 mx-auto grid h-full w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_440px]">
        <aside className="hidden lg:block">
          <div className="inline-flex rounded-full bg-[#dff3f2] px-4 py-2 text-sm font-bold text-[#178f95]">
            Secure marketplace access
          </div>
          <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-[#17233f]">
            Welcome back to your marketplace dashboard.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
            Login to continue buying products, managing your store, and tracking account activity from one clean dashboard.
          </p>

          <div className="mt-7 grid max-w-lg gap-4 sm:grid-cols-2">
            <Card className="bg-white/80 p-5">
              <p className="text-3xl font-black text-[#178f95]">24/7</p>
              <p className="mt-1 text-sm text-slate-500">Account access</p>
            </Card>
            <Card className="bg-white/80 p-5">
              <p className="text-3xl font-black text-[#178f95]">OTP</p>
              <p className="mt-1 text-sm text-slate-500">Verified security</p>
            </Card>
          </div>
        </aside>

        <Card className="w-full bg-white/92 p-5 shadow-[0_24px_80px_rgba(23,35,63,0.13)] ring-slate-200/70 backdrop-blur sm:p-7">
          <BrandBadge />
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#17233f]">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Login to your Buyer or Seller account
            </p>
          </div>

          <div className="mt-6">
            <LoginForm />
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Login;
