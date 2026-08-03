import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Input } from "../../../shared/components";
import { loginSchema } from "../schemas/loginSchema";
import authService from "../services/auth.service";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const result = await authService.login(data);

      if (!result.token || !result.role) {
        throw new Error("Login failed: invalid server response");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      if (result.user?._id) {
        localStorage.setItem("userId", result.user._id);
      }

      if (result.role === "seller") {
        navigate("/seller-dashboard", { replace: true });
      } else if (result.role === "buyer") {
        navigate("/buyer-dashboard", { replace: true });
      } else {
        throw new Error("Unknown user role");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Alert variant="error">{error}</Alert>

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#17233f]">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            inputClassName="h-12 pr-14"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-6 h-auto border-0 px-2 py-1 text-xs text-[#178f95] shadow-none hover:bg-[#dff3f2]"
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={loading} fullWidth size="lg" className="group">
        {loading ? "Logging in..." : "Login"}
        <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
      </Button>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-bold text-[#178f95] hover:underline">
          Create account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
