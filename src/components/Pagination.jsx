import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  pages,
  className = "",
  ariaLabel = "Pagination",
}) {
  if (totalPages <= 1) return null;

  const getDefaultPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const s = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
    return [...s].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  };

  const btns = pages && pages.length ? pages : getDefaultPages();

  return (
    <nav className={`flex items-center justify-center gap-2 ${className}`} aria-label={ariaLabel}>
      {/* Prev */}
      <button
        className="pagination-arrow"
        onClick={() => onPageChange(p => Math.max(1, (typeof p === "number" ? p : page) - 1))}
        disabled={page === 1}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Numbers */}
      <div className="flex items-center gap-1">
        {btns.map((n, idx, arr) => {
          const prev = arr[idx - 1];
          const showEllipsis = prev && n - prev > 1;
          return (
            <span key={n} className="flex items-center">
              {showEllipsis && <span className="px-2 opacity-60">…</span>}
              <button
                onClick={() => onPageChange(n)}
                aria-current={page === n ? "page" : undefined}
                className={[
                  "pagination-num",
                  page === n ? "pagination-num-active" : "pagination-num-inactive",
                ].join(" ")}
              >
                {n}
              </button>
            </span>
          );
        })}
      </div>

      {/* Next */}
      <button
        className="pagination-arrow"
        onClick={() => onPageChange(p => Math.min(totalPages, (typeof p === "number" ? p : page) + 1))}
        disabled={page === totalPages}
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
