import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import buyerUserService from "../services/user.service";
import { profileSchema } from "../../../shared/schemas/profileSchema";
import { Alert, Card, Button, Input, Navbar } from "../../../shared/components";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setPageError("");
      try {
        const result = await buyerUserService.getMe();
        setUser(result.user);
        reset(result.user);
      } catch (err) {
        setPageError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    setPageError("");
    setSuccess("");
    setSaving(true);
    try {
      const result = await buyerUserService.updateProfile(data);
      setUser(result.user);
      reset(result.user);
      setSuccess(result.message || "Profile updated successfully");
    } catch (err) {
      setPageError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-4 py-5 text-[#17233f] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-3xl">
        <Navbar badge="B" panel="Buyer Panel" title="My Profile" />
        {loading ? <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">Loading your profile...</Card> : pageError && !user ? <Alert variant="error" className="mt-6">{pageError}</Alert> : (
          <>
            <Card className="mt-6 p-5 sm:p-6">
              <div className="mb-5"><h3 className="text-xl font-extrabold">Personal Information</h3><p className="mt-1 text-sm text-slate-500">Keep your contact and delivery details up to date.</p></div>
              {pageError && <Alert variant="error" className="mb-4">{pageError}</Alert>}
              {success && <Alert variant="success" className="mb-4">{success}</Alert>}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input id="firstName" label="First Name" error={errors.firstName?.message} {...register("firstName")} />
                  <Input id="lastName" label="Last Name" error={errors.lastName?.message} {...register("lastName")} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input id="email" label="Email Address" type="email" value={user?.email || ""} disabled inputClassName="cursor-not-allowed bg-slate-100 text-slate-500" />
                  <Input id="phone" label="Phone Number" error={errors.phone?.message} {...register("phone")} />
                </div>
                <p className="-mt-2 text-xs text-slate-500">Email address cannot be changed.</p>
                <Input id="address" label="Address" error={errors.address?.message} {...register("address")} />
                <Input id="city" label="City" error={errors.city?.message} {...register("city")} />
                <Button type="submit" size="lg" fullWidth disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
              </form>
            </Card>
            <Card className="mt-6 p-5 sm:p-6"><Button onClick={handleLogout} variant="secondary" size="lg" fullWidth>Log Out</Button></Card>
          </>
        )}
      </div>
    </main>
  );
};

export default BuyerProfile;
