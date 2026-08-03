import GlobalSearchBar from "../common/GlobalSearchBar";
import NotificationBell from "../common/NotificationBell";

// Dashboard top bar — hamburger (mobile), global search, dark-mode
// toggle, notification bell, and log out.
const Topbar = ({ onMenuClick, isDark, onToggleTheme, onLogout }) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-700/60 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg dark:border-slate-700 dark:bg-slate-800 lg:hidden"
        >
          ☰
        </button>
        <div>
          <p className="text-sm font-bold text-[#178f95]">Admin Panel</p>
          <h1 className="text-2xl font-extrabold text-[#17233f] dark:text-slate-100">Dashboard Overview</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GlobalSearchBar />
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg dark:border-slate-700 dark:bg-slate-800"
          title="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <NotificationBell />
        <button
          onClick={onLogout}
          className="h-11 rounded-full bg-red-50 px-5 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Topbar;
