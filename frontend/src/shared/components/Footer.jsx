const year = new Date().getFullYear();

const Footer = ({ className = "" }) => {
  return (
    <footer className={`mt-8 border-t border-slate-200 pt-6 pb-6 ${className}`}>
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#178f95] text-sm font-black text-white">
            M
          </span>
          <span className="text-lg font-extrabold text-[#17233f]">MarketPlace</span>
        </span>

        <p className="max-w-xs text-sm leading-6 text-slate-500">
          A simple, trusted marketplace to buy and sell products online.
        </p>

        <p className="mt-2 text-xs font-semibold text-slate-400">
          &copy; {year} MarketPlace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;