const StarRating = ({ value = 0, onChange, readOnly = false, size = "text-xl" }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          className={`${size} leading-none ${readOnly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110"} ${
            star <= value ? "text-amber-400" : "text-slate-200"
          }`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
