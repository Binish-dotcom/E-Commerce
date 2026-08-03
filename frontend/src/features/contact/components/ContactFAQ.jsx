import { useState } from "react";
import { Icon } from "../../../shared/components";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "Log in to your account and open your order details to view the latest delivery status.",
  },
  {
    question: "What is your return policy?",
    answer: "Most eligible products can be returned within 30 days if they are unused and in original packaging.",
  },
  {
    question: "How do I start a return?",
    answer: "Contact support with your order number and reason for return, and we will guide you through the steps.",
  },
  {
    question: "How can I contact a seller?",
    answer: "Open the product or order details page and use the seller contact option when available.",
  },
];

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-7 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-xl font-black tracking-normal text-[#17233f]">
        Frequently Asked Questions
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={faq.question}
              className="rounded-xl border border-[#e5e7eb] bg-white shadow-md shadow-slate-200/45 transition hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black text-[#17233f]"
              >
                {faq.question}
                <Icon
                  name="arrowRight"
                  className={`h-4 w-4 shrink-0 text-[#64748b] transition ${
                    isOpen ? "rotate-90 text-[#178f95]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="border-t border-[#e5e7eb] px-5 py-4 text-sm leading-6 text-[#64748b]">
                  {faq.answer}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ContactFAQ;
