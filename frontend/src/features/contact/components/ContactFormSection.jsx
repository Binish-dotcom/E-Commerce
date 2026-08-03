import { Icon } from "../../../shared/components";

const supportReasons = [
  {
    icon: "package",
    title: "Order Support",
    description: "Get help with tracking, delivery, and order issues.",
  },
  {
    icon: "refresh",
    title: "Return & Refund Help",
    description: "Easy returns and refund guidance from our team.",
  },
  {
    icon: "users",
    title: "Seller Assistance",
    description: "Support for both buyers and trusted sellers.",
  },
  {
    icon: "mail",
    title: "Quick & Friendly Responses",
    description: "We're committed to resolving your concerns fast.",
  },
];

const fieldClass =
  "h-11 w-full rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#17233f] outline-none transition placeholder:text-[#8a97aa] focus:border-[#178f95] focus:ring-4 focus:ring-[#178f95]/10";

const ContactFormSection = () => {
  return (
    <section id="contact-form" className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:px-8">
      <form className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-lg shadow-slate-200/60">
        <h2 className="text-2xl font-black tracking-normal text-[#17233f]">
          Send Us a Message
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-[#17233f]">Full Name</span>
            <input className={`${fieldClass} mt-2`} placeholder="Enter your full name" />
          </label>
          <label className="block">
            <span className="text-sm font-black text-[#17233f]">Email Address</span>
            <input className={`${fieldClass} mt-2`} placeholder="Enter your email address" type="email" />
          </label>
          <label className="block">
            <span className="text-sm font-black text-[#17233f]">Phone Number</span>
            <input className={`${fieldClass} mt-2`} placeholder="Enter your phone number" />
          </label>
          <label className="block">
            <span className="text-sm font-black text-[#17233f]">Subject</span>
            <select className={`${fieldClass} mt-2 appearance-none`}>
              <option>Select a subject</option>
              <option>Order support</option>
              <option>Returns and refunds</option>
              <option>Seller assistance</option>
              <option>General question</option>
            </select>
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-black text-[#17233f]">Message</span>
          <textarea
            className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-medium text-[#17233f] outline-none transition placeholder:text-[#8a97aa] focus:border-[#178f95] focus:ring-4 focus:ring-[#178f95]/10"
            placeholder="Tell us how we can help you..."
          />
        </label>

        <button
          type="button"
          className="mt-5 inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#178f95] px-7 text-sm font-extrabold text-white shadow-lg shadow-[#178f95]/20 transition hover:-translate-y-0.5 hover:bg-[#12757a]"
        >
          Submit Message
          <Icon name="arrowRight" className="h-5 w-5" />
        </button>
      </form>

      <div className="grid gap-5">
        <article className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-lg shadow-slate-200/60">
          <h2 className="text-2xl font-black tracking-normal text-[#17233f]">
            Why Contact ShopEase?
          </h2>
          <div className="mt-5 grid gap-4">
            {supportReasons.map((reason) => (
              <div key={reason.title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
                  <Icon name={reason.icon} className="h-6 w-6" />
                </span>
                <span>
                  <h3 className="text-sm font-black text-[#17233f]">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">{reason.description}</p>
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-lg shadow-slate-200/60 sm:flex-row sm:items-center">
          <span>
            <h2 className="text-xl font-black tracking-normal text-[#17233f]">Quick Help</h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Find instant answers to common questions.
            </p>
          </span>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-3 rounded-xl border border-[#178f95]/45 bg-white px-5 text-sm font-extrabold text-[#178f95] transition hover:bg-[#f6fbfb]"
          >
            View Help Center
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </article>
      </div>
    </section>
  );
};

export default ContactFormSection;
