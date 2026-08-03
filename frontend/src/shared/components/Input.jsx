import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      wrapperClassName = "",
      inputClassName = "",
      as = "input",
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;
    const isTextarea = as === "textarea";

    return (
      <div className={wrapperClassName}>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-2 block text-sm font-semibold text-[#17233f]"
          >
            {label}
          </label>
        )}
        <Component
          ref={ref}
          className={`${isTextarea ? "w-full px-4 py-3" : "h-[52px] w-full px-4"} rounded-xl border bg-white text-sm text-[#17233f] outline-none transition placeholder:text-slate-400 focus:border-[#178f95] focus:ring-4 focus:ring-[#178f95]/10 ${
            error ? "border-red-300 bg-red-50/40" : "border-slate-200"
          } ${inputClassName} ${className}`}
          {...props}
        >
          {children}
        </Component>
        {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
