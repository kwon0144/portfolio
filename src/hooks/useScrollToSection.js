import { useCallback } from "react";

export function useScrollToSection(targetId, offset = 0) {
  const scroll = useCallback(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [targetId, offset]);

  return scroll;
}
