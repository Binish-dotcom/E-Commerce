const Card = ({ children, className = "", as: Component = "div", ...props }) => {
  return (
    <Component
      className={`rounded-[28px] border border-slate-200 bg-white/90 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
