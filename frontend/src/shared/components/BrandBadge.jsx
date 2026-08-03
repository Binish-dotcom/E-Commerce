const sizes = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-xl",
  lg: "h-14 w-14 text-2xl",
};

const BrandBadge = ({ label = "M", size = "md", className = "" }) => {
  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-full bg-[#dff3f2] font-black text-[#178f95] ring-1 ring-[#178f95]/20 ${
        sizes[size] || sizes.md
      } ${className}`}
    >
      {label}
    </div>
  );
};

export default BrandBadge;
