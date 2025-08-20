import { useCallback, useState } from "react";

export function useSearch(initialQuery = "", searchKeys = ["title", "description"]) {
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState("");

  const onSubmitSearch = useCallback((e) => {
    e?.preventDefault?.();
    setSubmittedQuery(query.trim().toLowerCase());
  }, [query]);

  const applySearch = useCallback((items) => {
    const q = submittedQuery;
    if (!q) return items;
    return items.filter((item) => {
      const hay = searchKeys.map((k) => (item?.[k] ?? "")).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [submittedQuery, searchKeys]);

  const resetSearch = useCallback(() => {
    setQuery("");
    setSubmittedQuery("");
  }, []);

  return { query, setQuery, submittedQuery, onSubmitSearch, applySearch, resetSearch };
}
