import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "../schemas/reviewSchema";
import StarRating from "./StarRating";
import TagListInput from "./TagListInput";
import { Alert, Button, Input } from "../../../shared/components";
import uploadService from "../../seller/services/upload.service";
import { useCreateReviewMutation, useUpdateReviewMutation } from "../reviewApi";

const ReviewForm = ({ productId, existingReview, onDone, onCancel }) => {
  const [images, setImages] = useState(existingReview?.images || []);
  const [videos, setVideos] = useState(existingReview?.videos || []);
  const [pros, setPros] = useState(existingReview?.pros || []);
  const [cons, setCons] = useState(existingReview?.cons || []);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [createReview, { isLoading: creating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const isEditing = Boolean(existingReview);
  const submitting = creating || updating;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: existingReview?.rating || 0,
      title: existingReview?.title || "",
      description: existingReview?.description || "",
      isAnonymous: existingReview?.isAnonymous || false,
    },
  });

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > 5) {
      setServerError("You can upload a maximum of 5 images");
      return;
    }

    setUploading(true);
    setServerError("");

    try {
      const uploaded = await Promise.all(files.map((file) => uploadService.uploadImage(file)));
      setImages((prev) => [...prev, ...uploaded.map((r) => r.url)]);
    } catch (err) {
      setServerError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const onSubmit = async (data) => {
    setServerError("");

    const payload = { ...data, images, videos, pros, cons };

    try {
      if (isEditing) {
        await updateReview({ id: existingReview._id, productId, ...payload }).unwrap();
      } else {
        await createReview({ productId, ...payload }).unwrap();
      }
      onDone && onDone();
    } catch (err) {
      setServerError(err?.data?.message || "Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Alert variant="error">{serverError}</Alert>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#17233f] dark:text-slate-100">Your Rating</label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <StarRating value={field.value} onChange={field.onChange} size="text-3xl" />
          )}
        />
        {errors.rating && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.rating.message}</p>}
      </div>

      <Input
        id="title"
        label="Review Title"
        placeholder="Sum up your experience"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        as="textarea"
        id="description"
        label="Review Description"
        rows={4}
        placeholder="Tell other buyers what you liked or disliked..."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TagListInput label="Pros (optional)" placeholder="e.g. Great build quality" values={pros} onChange={setPros} max={10} />
        <TagListInput label="Cons (optional)" placeholder="e.g. Runs a bit small" values={cons} onChange={setCons} max={10} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#17233f] dark:text-slate-100">
          Photos <span className="font-normal text-slate-400">(optional, up to 5)</span>
        </label>

        <div className="flex flex-wrap gap-3">
          {images.map((img) => (
            <div key={img} className="relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200">
              <img src={img} alt="Review" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}

          {images.length < 5 && (
            <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-2xl text-slate-400 hover:border-[#178f95] hover:text-[#178f95]">
              {uploading ? "..." : "+"}
              <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" disabled={uploading} />
            </label>
          )}
        </div>
      </div>

      <TagListInput
        label="Video links (optional, up to 2)"
        placeholder="Paste a video URL"
        values={videos}
        onChange={setVideos}
        max={2}
        isUrl
      />

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <input type="checkbox" {...register("isAnonymous")} className="h-4 w-4 rounded border-slate-300" />
        Post this review anonymously
      </label>

      <div className="flex gap-3 pt-1">
        <Button type="submit" disabled={submitting || uploading}>
          {submitting ? "Submitting..." : isEditing ? "Update Review" : "Submit Review"}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
