"use client";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", target: "home" },
  { name: "About", target: "about" },
  { name: "Skills", target: "skills" },
  { name: "Projects", target: "projects" },
  { name: "Contact", target: "contact" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = links
      .map(l => document.getElementById(l.target))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      {
        root: null,
        threshold: [0.3, 0.6, 0.9],
        rootMargin: "-64px 0px 0px 0px",
      }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex gap-8">
      {links.map(({ name, target }) => (
        <button
          key={target}
          onClick={() => handleScroll(target)}
          className={`capitalize font-medium hover:text-accent transition-all ${
            activeSection === target
              ? "font-bold text-accent border-b-2 border-accent"
              : ""
          }`}
        >
          {name}
        </button>
      ))}
    </nav>
  );
}
