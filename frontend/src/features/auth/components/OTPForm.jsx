import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Input } from "../../../shared/components";
import { otpSchema } from "../schemas/otpSchema";
import authService from "../services/auth.service";

const OTP_VALIDITY_SECONDS = 120;

const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Countdown (in seconds) until the current OTP expires
  const [secondsLeft, setSecondsLeft] = useState(OTP_VALIDITY_SECONDS);

  const emailFromState = location.state?.email || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: emailFromState,
      otp: "",
    },
  });

  useEffect(() => {
    if (emailFromState) {
      setValue("email", emailFromState);
    }
  }, [emailFromState, setValue]);

  // Tick the countdown down every second. Stops automatically at 0.
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    if (secondsLeft <= 0) {
      setError("Your OTP has expired. Please request a new one.");
      return;
    }

    setLoading(true);

    try {
      await authService.verifyOTP(data);
      setSuccess("Account verified successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message || "Invalid OTP or verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      await authService.resendOTP({ email: emailFromState });
      setSuccess("OTP resent successfully. Please check your email.");
      setSecondsLeft(OTP_VALIDITY_SECONDS); // restart the countdown
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const isExpired = secondsLeft <= 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Alert variant="error">{error}</Alert>
      <Alert variant="success">{success}</Alert>

      <Alert className="leading-6">
        We sent a 6-character OTP (letters and numbers) to your email address. Enter it below to
        verify your account.
      </Alert>

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="otp"
        label="One-Time Password"
        type="text"
        maxLength={6}
        placeholder="A1B2C3"
        inputClassName="h-14 text-center text-xl font-black uppercase tracking-[0.35em] placeholder:text-slate-300"
        error={errors.otp?.message}
        {...register("otp")}
      />

      {/* Live expiry countdown, shown right below the OTP field */}
      <p
        className={`-mt-2 text-center text-sm font-semibold ${
          isExpired ? "text-red-600" : "text-slate-500"
        }`}
      >
        {isExpired
          ? "Your OTP has expired. Please tap \"Resend OTP\" to get a new one."
          : `OTP expires in ${formatTime(secondsLeft)}`}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button type="submit" disabled={loading || isExpired} size="xl" fullWidth>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <Button
          type="button"
          onClick={handleResend}
          disabled={resendLoading || !isExpired}
          variant="secondary"
          size="xl"
          fullWidth
        >
          {resendLoading
            ? "Resending..."
            : isExpired
            ? "Resend OTP"
            : `Resend in ${formatTime(secondsLeft)}`}
        </Button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Back to{" "}
        <Link to="/signup" className="font-bold text-[#178f95] hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default OTPForm;