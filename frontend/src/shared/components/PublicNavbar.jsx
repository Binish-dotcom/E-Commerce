// import { Link } from "react-router-dom";
// import Icon from "./Icon";

// const navLinks = [
//   { label: "Home", to: "/" },
//   { label: "About", to: "/about" },
//   { label: "Contact Us", to: "/contact" },
//   { label: "Marketplace", to: "/marketplace" },
// ];

// const PublicNavbar = ({ activePage = "Home" }) => {
//   return (
//     <header className="sticky top-0 z-30 border-b border-[#e5e7eb]/80 bg-white/95 backdrop-blur">
//       <div className="mx-auto flex min-h-[72px] w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
//         <Link to="/" className="flex items-center gap-3">
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#178f95] text-white shadow-sm shadow-[#178f95]/25">
//             <Icon name="bag" className="h-6 w-6" />
//           </span>
//           <span className="text-2xl font-black tracking-tight text-[#17233f]">
//             ShopEase
//           </span>
//         </Link>

//         <nav className="order-3 flex w-full items-center justify-center gap-2 text-sm font-semibold text-[#64748b] sm:order-2 sm:w-auto sm:gap-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.label}
//               to={link.to}
//               className={`relative whitespace-nowrap px-1 py-3 transition hover:text-[#178f95] ${
//                 link.label === activePage ? "text-[#178f95]" : ""
//               }`}
//             >
//               {link.label}
//               {link.label === activePage && (
//                 <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#178f95]" />
//               )}
//             </Link>
//           ))}
//         </nav>

//         <div className="order-2 flex items-center gap-3 sm:order-3">
//           <Link
//             to="/buyer/cart"
//             className="relative flex h-11 w-11 items-center justify-center rounded-xl text-[#17233f] transition hover:bg-[#dff3f2]"
//             aria-label="Cart"
//           >
//             <Icon name="cart" className="h-6 w-6" />
//             <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#178f95] px-1 text-[11px] font-bold text-white">
//               2
//             </span>
//           </Link>
//           <Link
//             to="/login"
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#178f95] px-4 text-sm font-bold text-white shadow-md shadow-[#178f95]/20 transition hover:bg-[#12757a]"
//           >
//             <Icon name="user" className="h-5 w-5" />
//             Login
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;




import { Link } from "react-router-dom";
import Icon from "./Icon";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Marketplace", to: "/marketplace" },
];

const PublicNavbar = ({ activePage = "Home" }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5e7eb]/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#178f95] text-white shadow-sm shadow-[#178f95]/25">
            <Icon name="bag" className="h-6 w-6" />
          </span>
          <span className="text-2xl font-black tracking-tight text-[#17233f]">
            ShopEase
          </span>
        </Link>

        <nav className="order-3 flex w-full items-center justify-center gap-2 text-sm font-semibold text-[#64748b] sm:order-2 sm:w-auto sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`relative whitespace-nowrap px-1 py-3 transition hover:text-[#178f95] ${
                link.label === activePage ? "text-[#178f95]" : ""
              }`}
            >
              {link.label}
              {link.label === activePage && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#178f95]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="order-2 flex items-center gap-3 sm:order-3">
          <Link
            to="/buyer/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl text-[#17233f] transition hover:bg-[#dff3f2]"
            aria-label="Cart"
          >
            <Icon name="cart" className="h-6 w-6" />
          </Link>
          <Link
            to="/login"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#178f95]/25 bg-white px-4 text-sm font-bold text-[#178f95] transition hover:bg-[#f6fbfb]"
          >
            <Icon name="user" className="h-5 w-5" />
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#178f95] px-4 text-sm font-bold text-white shadow-md shadow-[#178f95]/20 transition hover:bg-[#12757a]"
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;