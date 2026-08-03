import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Input } from "../../../shared/components";
import { signupSchema } from "../schemas/signupSchema";
import authService from "../services/auth.service";

const roleOptions = [
  { value: "buyer", label: "Buyer", description: "Browse products and place orders" },
  { value: "seller", label: "Seller", description: "Sell products and manage orders" },
];

const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "buyer",
      storeName: "",
      address: "",
      city: "",
    },
  });

  const selectedRole = useWatch({ control, name: "role" }) || "buyer";

  const handleRoleChange = (role) => {
    setValue("role", role, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const { storeName, ...signupData } = data;
      delete signupData.confirmPassword;
      const payload = {
        ...signupData,
        ...(data.role === "seller" && storeName
          ? { storeName, storeProfile: { storeName } }
          : {}),
      };

      await authService.signup(payload);
      navigate("/otp-verification", { state: { email: data.email } });
    } catch (err) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const compactInputClass = "h-9 rounded-lg px-3 focus:ring-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Alert variant="error" className="rounded-xl px-3 py-2 text-xs">
        {error}
      </Alert>

      <div>
        <p className="mb-1 text-xs font-semibold text-[#17233f]">Choose account type</p>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          {roleOptions.map((option) => {
            const isActive = selectedRole === option.value;
            return (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRoleChange(option.value)}
                className={`h-auto justify-start rounded-lg px-3 py-1 text-left shadow-none ${
                  isActive
                    ? "bg-white text-[#178f95] ring-1 ring-[#178f95]/20"
                    : "border-transparent bg-transparent text-slate-500 hover:bg-white/70 hover:text-[#17233f]"
                }`}
              >
                <span>
                  <span className="block text-xs font-bold">{option.label}</span>
                  <span className="mt-0.5 block text-[10px] font-medium leading-3">
                    {option.description}
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
        <input type="hidden" {...register("role")} />
        {errors.role?.message && (
          <p className="mt-0.5 text-[11px] font-medium leading-4 text-red-600">
            {errors.role.message}
          </p>
        )}
      </div>

      <Alert className="rounded-xl border-0 px-3 py-1 text-center text-xs leading-5">
        {selectedRole === "seller"
          ? "Seller accounts can manage products, listings, orders, and store profile after signup."
          : "Create your buyer account to browse products, save listings, and place orders."}
      </Alert>

      <div className="grid gap-2 sm:grid-cols-2">
        <Input id="firstName" label="First Name" placeholder="Enter First Name" inputClassName={compactInputClass} error={errors.firstName?.message} {...register("firstName")} />
        <Input id="lastName" label="Last Name" placeholder="Enter Last Name" inputClassName={compactInputClass} error={errors.lastName?.message} {...register("lastName")} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Input id="email" label="Email Address" type="email" placeholder="you@example.com" inputClassName={compactInputClass} error={errors.email?.message} {...register("email")} />
        <Input id="phone" label="Phone Number" placeholder="03001234567" inputClassName={compactInputClass} error={errors.phone?.message} {...register("phone")} />
      </div>

      {selectedRole === "seller" && (
        <Input id="storeName" label="Shop / Business Name" placeholder="Enter Shop Name" inputClassName={compactInputClass} error={errors.storeName?.message} {...register("storeName")} />
      )}

      <Input id="city" label="City" placeholder="Lahore" inputClassName={compactInputClass} error={errors.city?.message} {...register("city")} />
      <Input id="address" label="Address" placeholder="House 12, Main Road" inputClassName={compactInputClass} error={errors.address?.message} {...register("address")} />

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            inputClassName={`${compactInputClass} pr-11`}
            error={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-7 h-auto border-0 px-2 py-1 text-[11px] text-[#178f95] shadow-none hover:bg-[#dff3f2]"
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>

        <div className="relative">
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            inputClassName={`${compactInputClass} pr-11`}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-2 top-7 h-auto border-0 px-2 py-1 text-[11px] text-[#178f95] shadow-none hover:bg-[#dff3f2]"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={loading} fullWidth size="sm" className="group">
        {loading ? "Creating Account..." : "Create Account"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
      </Button>

      <p className="text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-[#178f95] hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
