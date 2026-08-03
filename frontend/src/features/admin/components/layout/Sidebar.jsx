const LINKS = [
  { to: "/admin/dashboard", label: "Overview", icon: "📊" },
  { to: "/admin/dashboard#sellers", label: "Sellers", icon: "🏪" },
  { to: "/admin/dashboard#products", label: "Products", icon: "📦" },
  { to: "/admin/dashboard#orders", label: "Orders", icon: "🧾" },
  { to: "/admin/dashboard#buyers", label: "Buyers", icon: "👥" },
  { to: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { to: "/admin/dashboard#activity", label: "Activity Log", icon: "🕒" },
];

// Static dashboard sidebar. Links point at in-page sections (this admin
// module lives on a single dashboard page), keeping routing untouched.
const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200/70 bg-white p-5 transition-transform dark:border-slate-700/60 dark:bg-slate-900 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#178f95] text-lg font-black text-white">A</span>
          <div>
            <p className="text-xs font-bold text-[#178f95]">Admin Panel</p>
            <p className="text-sm font-black text-[#17233f] dark:text-slate-100">Marketplace</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-[#f6fbfb] hover:text-[#178f95] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
