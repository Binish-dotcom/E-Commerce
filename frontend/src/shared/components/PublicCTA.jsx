import { Link } from "react-router-dom";
import Icon from "./Icon";

const PublicCTA = ({ heading, subtitle, buttonLabel = "Visit Marketplace" }) => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#dff3f2] bg-gradient-to-r from-[#ecfbfa] via-white to-[#f1fbfa] p-6 shadow-lg shadow-slate-200/55 sm:flex-row sm:items-center lg:px-16">
        <div className="flex items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#dff3f2] text-[#178f95]">
            <Icon name="bag" className="h-10 w-10" />
          </span>
          <span>
            <h2 className="text-2xl font-black tracking-normal text-[#17233f]">
              {heading}
            </h2>
            <p className="mt-2 text-base text-[#64748b]">{subtitle}</p>
          </span>
        </div>
        <Link
          to="/marketplace"
          className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#178f95] px-8 text-sm font-extrabold text-white shadow-lg shadow-[#178f95]/20 transition hover:-translate-y-0.5 hover:bg-[#12757a] sm:w-auto"
        >
          {buttonLabel}
          <Icon name="arrowRight" className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default PublicCTA;
