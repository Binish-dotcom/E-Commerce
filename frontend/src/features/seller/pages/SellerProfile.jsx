import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import sellerService from "../services/seller.service";
import { profileSchema } from "../../../shared/schemas/profileSchema";
import { storeSchema } from "../schemas/storeSchema";
import { Alert, Card, Button, Input, Navbar } from "../../../shared/components";

const SellerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [message, setMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingStore, setSavingStore] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const profileForm = useForm({ resolver: zodResolver(profileSchema) });
  const storeForm = useForm({ resolver: zodResolver(storeSchema) });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  const syncUser = (nextUser) => {
    setUser(nextUser);
    profileForm.reset(nextUser);
    storeForm.reset(nextUser.storeProfile || {});
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); setPageError("");
      try {
        const result = await sellerService.getMe();
        setUser(result.user);
        profileForm.reset(result.user);
        storeForm.reset(result.user.storeProfile || {});
      }
      catch (err) { setPageError(err.message || "Failed to load profile"); }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, [profileForm, storeForm]);

  const saveProfile = async (data) => {
    setPageError(""); setMessage(""); setSavingProfile(true);
    try { const result = await sellerService.updateProfile(data); syncUser(result.user); setMessage(result.message || "Profile updated successfully"); }
    catch (err) { setPageError(err.message || "Failed to update profile"); }
    finally { setSavingProfile(false); }
  };

  const saveStore = async (data) => {
    setPageError(""); setMessage(""); setSavingStore(true);
    try { const result = await sellerService.setupStoreProfile(data); syncUser(result.user); setMessage(result.message || "Store profile updated successfully"); }
    catch (err) { setPageError(err.message || "Failed to update store profile"); }
    finally { setSavingStore(false); }
  };

  const handleDeleteAccount = async () => {
    setDeleteError(""); setDeleting(true);
    try { await sellerService.deleteAccount(); localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/", { replace: true }); }
    catch (err) { setDeleteError(err.message || "Failed to delete account"); setDeleting(false); }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-4 py-5 text-[#17233f] sm:px-5 sm:py-6">
      <div className="mx-auto max-w-3xl">
        <Navbar badge="S" panel="Seller Panel" title="My Profile" />
        {loading ? <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">Loading your profile...</Card> : pageError && !user ? <Alert variant="error" className="mt-6">{pageError}</Alert> : (
          <>
            <Card className="mt-6 p-5 sm:p-6">
              <div className="mb-5"><h3 className="text-xl font-extrabold">Personal Information</h3><p className="mt-1 text-sm text-slate-500">Update your contact and business address details.</p></div>
              {pageError && <Alert variant="error" className="mb-4">{pageError}</Alert>}
              {message && <Alert variant="success" className="mb-4">{message}</Alert>}
              <form onSubmit={profileForm.handleSubmit(saveProfile)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2"><Input id="firstName" label="First Name" error={profileForm.formState.errors.firstName?.message} {...profileForm.register("firstName")} /><Input id="lastName" label="Last Name" error={profileForm.formState.errors.lastName?.message} {...profileForm.register("lastName")} /></div>
                <div className="grid gap-4 sm:grid-cols-2"><Input id="email" label="Email Address" type="email" value={user?.email || ""} disabled inputClassName="cursor-not-allowed bg-slate-100 text-slate-500" /><Input id="phone" label="Phone Number" error={profileForm.formState.errors.phone?.message} {...profileForm.register("phone")} /></div>
                <p className="-mt-2 text-xs text-slate-500">Email address cannot be changed.</p>
                <Input id="address" label="Address" error={profileForm.formState.errors.address?.message} {...profileForm.register("address")} />
                <Input id="city" label="City" error={profileForm.formState.errors.city?.message} {...profileForm.register("city")} />
                <Button type="submit" size="lg" fullWidth disabled={savingProfile}>{savingProfile ? "Saving..." : "Save Personal Changes"}</Button>
              </form>
            </Card>

            {user?.isStoreSetup && <Card className="mt-6 p-5 sm:p-6">
              <div className="mb-5"><h3 className="text-xl font-extrabold">Store Information</h3><p className="mt-1 text-sm text-slate-500">Keep your public store details current for buyers.</p></div>
              <form onSubmit={storeForm.handleSubmit(saveStore)} className="space-y-4">
                <Input id="storeName" label="Store Name" error={storeForm.formState.errors.storeName?.message} {...storeForm.register("storeName")} />
                <Input as="textarea" id="storeDescription" label="Store Description" rows={4} error={storeForm.formState.errors.storeDescription?.message} {...storeForm.register("storeDescription")} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input as="select" id="storeCategory" label="Store Category" error={storeForm.formState.errors.storeCategory?.message} {...storeForm.register("storeCategory")}><option value="">Select Category</option><option value="fashion">Fashion & Clothing</option><option value="electronics">Electronics</option><option value="grocery">Grocery & Food</option><option value="beauty">Beauty & Personal Care</option><option value="home">Home & Living</option><option value="other">Other</option></Input>
                  <Input as="select" id="businessType" label="Business Type" error={storeForm.formState.errors.businessType?.message} {...storeForm.register("businessType")}><option value="">Select Business Type</option><option value="individual">Individual</option><option value="partnership">Partnership</option><option value="company">Company</option></Input>
                </div>
                <Input id="storeAddress" label="Store Address" error={storeForm.formState.errors.storeAddress?.message} {...storeForm.register("storeAddress")} />
                <div className="grid gap-4 sm:grid-cols-2"><Input id="storeCity" label="Store City" error={storeForm.formState.errors.storeCity?.message} {...storeForm.register("storeCity")} /><Input id="ntnNumber" label="NTN / Tax Number" error={storeForm.formState.errors.ntnNumber?.message} {...storeForm.register("ntnNumber")} /></div>
                <Button type="submit" size="lg" fullWidth disabled={savingStore}>{savingStore ? "Saving..." : "Save Store Changes"}</Button>
              </form>
            </Card>}

            <Card className="mt-6 p-5 sm:p-6">
              {deleteError && <Alert variant="error" className="mb-4">{deleteError}</Alert>}
              {!confirmingDelete ? <div className="flex flex-col gap-3 sm:flex-row"><Button onClick={handleLogout} variant="secondary" size="lg" fullWidth>Log Out</Button><Button onClick={() => setConfirmingDelete(true)} variant="danger" size="lg" fullWidth>Delete Account</Button></div> : <div className="rounded-2xl border border-red-200 bg-red-50 p-5"><p className="text-sm font-bold text-red-700">Are you sure? This will permanently delete your account and every product you've listed. This cannot be undone.</p><div className="mt-4 flex flex-col gap-3 sm:flex-row"><Button onClick={handleDeleteAccount} variant="danger" size="lg" fullWidth disabled={deleting}>{deleting ? "Deleting..." : "Yes, Delete My Account"}</Button><Button onClick={() => setConfirmingDelete(false)} variant="ghost" size="lg" fullWidth disabled={deleting}>Cancel</Button></div></div>}
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default SellerProfile;
