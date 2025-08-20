import { useCallback, useEffect, useMemo, useState } from "react";

export function useFilter(items, getTags = (x) => x.tag ?? {}) {
  const [selected, setSelected] = useState({}); // { [cat]: Set<string> }

  const categories = useMemo(() => {
    return Array.from(new Set(items.flatMap((it) => Object.keys(getTags(it)))));
  }, [items, getTags]);

  const options = useMemo(() => {
    const sets = categories.reduce((acc, cat) => ((acc[cat] = new Set()), acc), {});
    items.forEach((it) => {
      const tags = getTags(it);
      categories.forEach((cat) => (tags?.[cat] || []).forEach((t) => sets[cat].add(t)));
    });
    return categories.reduce((acc, cat) => ((acc[cat] = Array.from(sets[cat]).sort()), acc), {});
  }, [items, categories, getTags]);

  // prune selections if options change
  useEffect(() => {
    setSelected((prev) => {
      const next = {};
      categories.forEach((cat) => {
        const allowed = new Set(options[cat] || []);
        const keep = new Set([...(prev[cat] || [])].filter((v) => allowed.has(v)));
        if (keep.size) next[cat] = keep;
      });
      return next;
    });
  }, [categories, options]);

  const toggleCheck = useCallback((cat, value) => {
    setSelected((prev) => {
      const nextSet = new Set(prev[cat] || []);
      nextSet.has(value) ? nextSet.delete(value) : nextSet.add(value);
      return { ...prev, [cat]: nextSet };
    });
  }, []);

  const clearFilters = useCallback(() => setSelected({}), []);

  const applyTagFilters = useCallback((itemsToFilter) => {
    return itemsToFilter.filter((it) => {
      const tags = getTags(it);
      for (const cat of categories) {
        const wanted = selected[cat];
        if (wanted && wanted.size > 0) {
          const itemTags = tags?.[cat] || [];
          const anyMatch = [...wanted].some((t) => itemTags.includes(t));
          if (!anyMatch) return false;
        }
      }
      return true;
    });
  }, [categories, selected, getTags]);

  return { selected, toggleCheck, clearFilters, categories, options, applyTagFilters };
}
