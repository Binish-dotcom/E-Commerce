const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#178f95] transition hover:bg-[#f6fbfb] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
            page === currentPage
              ? "bg-[#178f95] text-white shadow-lg shadow-[#178f95]/20"
              : "border border-slate-200 bg-white text-[#17233f] hover:bg-[#f6fbfb]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#178f95] transition hover:bg-[#f6fbfb] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;