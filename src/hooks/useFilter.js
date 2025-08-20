import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useFilter(items, getTags = (x) => x?.tag ?? {}) {
  const [selected, setSelected] = useState({});

  const getTagsRef = useRef(getTags);
  useEffect(() => {
    getTagsRef.current = getTags;
  }, [getTags]);

  const tagsOf = useCallback((it) => getTagsRef.current(it), []);

  // Build category list
  const categories = useMemo(() => {
    const all = new Set();
    for (const it of items) {
      Object.keys(tagsOf(it) || {}).forEach((k) => all.add(k));
    }
    return Array.from(all);
  }, [items, tagsOf]);

  // Build options per category
  const options = useMemo(() => {
    const sets = {};
    for (const cat of categories) sets[cat] = new Set();
    for (const it of items) {
      const t = tagsOf(it);
      for (const cat of categories) {
        (t?.[cat] || []).forEach((v) => sets[cat].add(v));
      }
    }
    const out = {};
    for (const cat of categories) out[cat] = Array.from(sets[cat]).sort();
    return out;
  }, [items, categories, tagsOf]);

  // Prune selections when options change — avoid no-op updates
  useEffect(() => {
    setSelected((prev) => {
      const next = {};
      for (const cat of categories) {
        const allowed = new Set(options[cat] || []);
        const keep = new Set([...(prev[cat] || [])].filter((v) => allowed.has(v)));
        if (keep.size) next[cat] = keep;
      }

      // shallow + content equality check
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      if (prevKeys.length !== nextKeys.length) return next;

      for (const k of nextKeys) {
        const a = prev[k];
        const b = next[k];
        if (!a || !b || a.size !== b.size) return next;
        for (const v of a) if (!b.has(v)) return next;
      }
      return prev; // no change
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

  const applyTagFilters = useCallback(
    (itemsToFilter) => {
      return itemsToFilter.filter((it) => {
        const t = tagsOf(it);
        for (const cat of categories) {
          const wanted = selected[cat];
          if (wanted && wanted.size > 0) {
            const itemTags = t?.[cat] || [];
            let anyMatch = false;
            for (const w of wanted) {
              if (itemTags.includes(w)) {
                anyMatch = true;
                break;
              }
            }
            if (!anyMatch) return false;
          }
        }
        return true;
      });
    },
    [categories, selected, tagsOf]
  );

  return { selected, toggleCheck, clearFilters, categories, options, applyTagFilters };
}
