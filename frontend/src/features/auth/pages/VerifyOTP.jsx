import OTPForm from "../components/OTPForm";
import { BrandBadge, Card, Navbar } from "../../../shared/components";

const VerifyOTP = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#dff3f2]/90 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F9C5A8]/50 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <Navbar badge="M" panel="MarketPlace" title="Verify Account" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-5xl items-center justify-center py-10">
        <Card className="w-full max-w-[500px] bg-white/92 p-6 shadow-[0_24px_80px_rgba(23,35,63,0.13)] ring-slate-200/70 backdrop-blur sm:p-8">
          <BrandBadge size="lg" />
          <div className="mt-5 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#17233f] sm:text-4xl">
              Verify Account
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Confirm the OTP sent to your email
            </p>
          </div>

          <div className="mt-8">
            <OTPForm />
          </div>
        </Card>
      </section>
    </main>
  );
};

export default VerifyOTP;
