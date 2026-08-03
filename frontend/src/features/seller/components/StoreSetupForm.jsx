import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Card, HeroPanel, Input } from "../../../shared/components";
import { storeSchema } from "../schemas/storeSchema";
import sellerService from "../services/seller.service";

const StoreSetupForm = ({ onStoreCreated }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      storeCategory: "",
      businessType: "",
      storeAddress: "",
      storeCity: "",
      ntnNumber: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const result = await sellerService.setupStoreProfile(data);
      onStoreCreated(result.user);
    } catch (err) {
      setError(err.message || "Failed to save store profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-8 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <HeroPanel
          eyebrow="Seller onboarding"
          title="Set Up Your Store"
          description="Tell buyers what you sell, where your store is located, and why they should trust your brand."
          className="mb-6"
        />

        <Card className="bg-white/92 p-6 backdrop-blur sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Alert variant="error">{error}</Alert>

            <Input id="storeName" label="Store Name" placeholder="e.g. Mujtaba Marketplace Store" error={errors.storeName?.message} {...register("storeName")} />

            <Input
              as="textarea"
              id="storeDescription"
              label="Store Description"
              rows={4}
              placeholder="Briefly describe what you sell..."
              error={errors.storeDescription?.message}
              {...register("storeDescription")}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Input as="select" id="storeCategory" label="Store Category" error={errors.storeCategory?.message} {...register("storeCategory")}>
                <option value="">Select Category</option>
                <option value="fashion">Fashion & Clothing</option>
                <option value="electronics">Electronics</option>
                <option value="grocery">Grocery & Food</option>
                <option value="beauty">Beauty & Personal Care</option>
                <option value="home">Home & Living</option>
                <option value="other">Other</option>
              </Input>

              <Input as="select" id="businessType" label="Business Type" error={errors.businessType?.message} {...register("businessType")}>
                <option value="">Select Business Type</option>
                <option value="individual">Individual</option>
                <option value="partnership">Partnership</option>
                <option value="company">Company</option>
              </Input>
            </div>

            <Input id="storeAddress" label="Store Address" placeholder="Shop 12, Main Boulevard" error={errors.storeAddress?.message} {...register("storeAddress")} />

            <div className="grid gap-4 md:grid-cols-2">
              <Input id="storeCity" label="City" placeholder="Lahore" error={errors.storeCity?.message} {...register("storeCity")} />
              <Input id="ntnNumber" label="NTN / Tax Number" placeholder="Optional" error={errors.ntnNumber?.message} {...register("ntnNumber")} />
            </div>

            <Button type="submit" disabled={loading} size="xl" fullWidth>
              {loading ? "Saving..." : "Save & Continue to Dashboard"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default StoreSetupForm;
