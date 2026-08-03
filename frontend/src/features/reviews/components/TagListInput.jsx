import { useState } from "react";

// Small reusable "add on Enter, remove with x" tag list — used for
// Pros, Cons, and optional video links on the review form.
const TagListInput = ({ label, placeholder, values = [], onChange, max = 10, isUrl = false }) => {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (values.length >= max) {
      setError(`Maximum ${max} allowed`);
      return;
    }
    if (isUrl) {
      try {
        new URL(trimmed);
      } catch {
        setError("Enter a valid URL");
        return;
      }
    }
    onChange([...values, trimmed]);
    setDraft("");
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag) => onChange(values.filter((v) => v !== tag));

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#17233f] dark:text-slate-100">{label}</label>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#178f95] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <button
          type="button"
          onClick={addTag}
          className="h-10 shrink-0 rounded-xl bg-[#178f95]/10 px-3 text-sm font-bold text-[#178f95]"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-200"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500">
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagListInput;
