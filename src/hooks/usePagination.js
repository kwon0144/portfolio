import { useEffect, useMemo, useState, useCallback } from "react";

export function usePageSize(pageConfig) {
  const getSize = useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1024;
    if (w >= 1024) return pageConfig.lg; // lg+
    if (w >= 768) return pageConfig.md;  // md
    return pageConfig.sm;                 // mobile
  }, [pageConfig]);

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const onResize = () => setSize(getSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getSize]);

  return size;
}

export function usePagination(items, pageSize) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  const start = (page - 1) * pageSize;
  const current = useMemo(() => items.slice(start, start + pageSize), [items, start, pageSize]);

  const getPageButtons = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
    return [...pages].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  };

  return { page, setPage, totalPages, current, getPageButtons };
}
