import { useState } from "react";
import { useLazyGlobalSearchQuery } from "../../adminApi";

// Global Search — hits buyers, sellers, products, and orders at once
// and shows a small grouped results dropdown.
const GlobalSearchBar = () => {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [trigger, { data, isFetching }] = useLazyGlobalSearchQuery();

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    if (value.trim().length >= 2) {
      trigger(value);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const hasResults =
    data && (data.buyers?.length || data.sellers?.length || data.products?.length || data.orders?.length);

  return (
    <div className="relative w-full max-w-md">
      <input
        value={term}
        onChange={handleChange}
        onFocus={() => term.trim().length >= 2 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search buyers, sellers, products, orders..."
        className="h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-[#17233f] outline-none transition focus:border-[#178f95] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />

      {open && (
        <div className="absolute z-20 mt-2 max-h-96 w-full overflow-y-auto rounded-2xl border border-slate-200/70 bg-white p-3 shadow-lg dark:border-slate-700/60 dark:bg-slate-800">
          {isFetching && <p className="px-2 py-1 text-xs text-slate-400">Searching...</p>}

          {!isFetching && !hasResults && (
            <p className="px-2 py-1 text-xs text-slate-400">No matches for "{term}"</p>
          )}

          {["buyers", "sellers", "products", "orders"].map((group) =>
            data?.[group]?.length ? (
              <div key={group} className="mb-2">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">{group}</p>
                {data[group].map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl px-2 py-1.5 text-sm text-[#17233f] hover:bg-[#f6fbfb] dark:text-slate-100 dark:hover:bg-slate-700/50"
                  >
                    {item.title || item.productTitle || `${item.firstName || ""} ${item.lastName || ""}`.trim() || item.email}
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
