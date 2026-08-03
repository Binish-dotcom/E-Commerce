import { Link } from "react-router-dom";
import Icon from "./Icon";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Marketplace", to: "/marketplace" },
];
const socials = ["facebook", "instagram", "twitter", "pinterest"];

const PublicFooter = () => {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-7 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#178f95] text-white">
              <Icon name="bag" className="h-5 w-5" />
            </span>
            <span className="text-xl font-black text-[#17233f]">ShopEase</span>
          </Link>
          <p className="mt-2 text-sm text-[#64748b]">Shop smarter, every day.</p>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm font-semibold text-[#475569]">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="transition hover:text-[#178f95]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social}
                href="#social"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#17233f] transition hover:border-[#178f95] hover:text-[#178f95]"
                aria-label={social}
              >
                <Icon name={social} className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-sm leading-6 text-[#64748b]">
            &copy; 2026 ShopEase.
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
