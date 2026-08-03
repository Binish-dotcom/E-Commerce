import StarRating from "./StarRating";

const AverageRatingCard = ({ averageRating = 0, totalReviews = 0 }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/70 bg-white p-6 text-center">
      <p className="text-5xl font-black text-[#17233f]">{averageRating.toFixed(1)}</p>
      <div className="mt-2">
        <StarRating value={Math.round(averageRating)} readOnly />
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-500">
        Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
      </p>
    </div>
  );
};

export default AverageRatingCard;
