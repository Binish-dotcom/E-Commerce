import { Icon } from "../../../shared/components";

const contactInfo = [
  {
    icon: "mail",
    title: "Email Us",
    text: "support@shopease.com",
    subtext: "We reply within 24 hours.",
  },
  {
    icon: "phone",
    title: "Call Us",
    text: "+1 (555) 123-4567",
    subtext: "Mon-Fri, 9AM - 6PM (EST)",
  },
  {
    icon: "mapPin",
    title: "Visit Us",
    text: "123 Commerce Way",
    subtext: "New York, NY 10001, USA",
  },
  {
    icon: "clock",
    title: "Support Hours",
    text: "Mon - Sun",
    subtext: "9:00 AM - 9:00 PM (EST)",
  },
];

const ContactInfoRow = () => {
  return (
    <section className="mx-auto -mt-2 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-xl shadow-slate-200/70 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((item, index) => (
          <div
            key={item.title}
            className={`flex items-center gap-5 p-6 ${
              index !== contactInfo.length - 1 ? "lg:border-r lg:border-[#e5e7eb]" : ""
            } ${index < 2 ? "sm:border-b sm:border-[#e5e7eb] lg:border-b-0" : ""}`}
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
              <Icon name={item.icon} className="h-8 w-8" />
            </span>
            <span>
              <h3 className="text-base font-black text-[#17233f]">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold text-[#64748b]">{item.text}</p>
              <p className="mt-0.5 text-sm text-[#64748b]">{item.subtext}</p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoRow;
