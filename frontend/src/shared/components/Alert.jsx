const variants = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-transparent bg-[#f6fbfb] text-slate-500",
};

const Alert = ({ children, variant = "info", className = "" }) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
        variants[variant] || variants.info
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Alert;
