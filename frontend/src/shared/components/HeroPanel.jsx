const HeroPanel = ({ eyebrow, title, description, children, className = "" }) => {
  return (
    <div
      className={`rounded-[30px] bg-gradient-to-br from-[#178f95] to-[#12757a] p-8 text-white shadow-xl shadow-[#178f95]/15 ${className}`}
    >
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/70">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight">{title}</h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{description}</p>
      )}
      {children}
    </div>
  );
};

export default HeroPanel;
