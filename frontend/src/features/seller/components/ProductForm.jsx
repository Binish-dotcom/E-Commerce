import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Card, Input } from "../../../shared/components";
import { productSchema } from "../schemas/productSchema";
import productService from "../services/product.service";
import uploadService from "../services/upload.service";

// If `initialData` (an existing product) is passed, the form runs in EDIT mode:
// it pre-fills every field and calls updateProduct instead of createProduct.
const ProductForm = ({ onProductAdded, onCancel, initialData }) => {
  const isEditMode = Boolean(initialData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      price: initialData?.price ?? "",
      discountPrice: initialData?.discountPrice ?? "",
      stock: initialData?.stock ?? "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const imageUrl = useWatch({ control, name: "imageUrl" });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError("");
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const result = await uploadService.uploadImage(file);
      setValue("imageUrl", result.url, { shouldValidate: true });
    } catch (err) {
      setImageError(err.message || "Failed to upload image");
      setImagePreview("");
      setValue("imageUrl", "");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...data,
        discountPrice: data.discountPrice === "" ? null : data.discountPrice,
      };

      const result = isEditMode
        ? await productService.updateProduct(initialData._id, payload)
        : await productService.createProduct(payload);

      if (!isEditMode) {
        reset();
        setImagePreview("");
      }

      onProductAdded(result.product);
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? "update" : "add"} product`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#178f95]">
            {isEditMode ? "Edit listing" : "New listing"}
          </p>
          <h3 className="text-2xl font-extrabold text-[#17233f]">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h3>
        </div>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Alert variant="error">{error}</Alert>

        <Input id="title" label="Product Title" placeholder="e.g. Premium pet food" error={errors.title?.message} {...register("title")} />

        <Input
          as="textarea"
          id="description"
          label="Description"
          rows={4}
          placeholder="Describe your product..."
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input as="select" id="category" label="Category" error={errors.category?.message} {...register("category")}>
            <option value="">Select Category</option>
            <option value="fashion">Fashion & Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="grocery">Grocery & Food</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="home">Home & Living</option>
            <option value="jewellery">Jewellery</option>
            <option value="other">Other</option>
          </Input>

          <Input id="stock" label="Stock Quantity" type="number" placeholder="e.g. 50" error={errors.stock?.message} {...register("stock")} />
          <Input id="price" label="Price (Rs.)" type="number" step="0.01" placeholder="e.g. 1500" error={errors.price?.message} {...register("price")} />
          <Input id="discountPrice" label="Discount Price" type="number" step="0.01" placeholder="Optional" error={errors.discountPrice?.message} {...register("discountPrice")} />
        </div>

        {/* ===== Product Image Upload ===== */}
        <div>
          <label htmlFor="imageFile" className="mb-2 block text-sm font-semibold text-[#17233f]">
            Product Image
          </label>

          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-[#178f95] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#12757a]"
          />

          <input type="hidden" {...register("imageUrl")} />

          {uploadingImage && (
            <p className="mt-2 text-sm font-semibold text-[#178f95]">Uploading image...</p>
          )}

          {imageError && <p className="mt-2 text-xs font-medium text-red-600">{imageError}</p>}
          {errors.imageUrl && !imageError && (
            <p className="mt-2 text-xs font-medium text-red-600">{errors.imageUrl.message}</p>
          )}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product preview"
              className="mt-3 h-32 w-32 rounded-xl border border-slate-200 object-cover"
            />
          )}

          {!imagePreview && imageUrl && (
            <img
              src={imageUrl}
              alt="Product preview"
              className="mt-3 h-32 w-32 rounded-xl border border-slate-200 object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={loading || uploadingImage} size="lg" fullWidth className="flex-1">
            {loading
              ? isEditMode
                ? "Saving..."
                : "Adding..."
              : uploadingImage
              ? "Waiting for image..."
              : isEditMode
              ? "Save Changes"
              : "Add Product"}
          </Button>
          <Button type="button" onClick={onCancel} disabled={loading} variant="secondary" size="lg">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;
