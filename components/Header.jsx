"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import { Button } from "./ui/button";

export default function Header() {
  const [scrolledPastHome, setScrolledPastHome] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");

    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPastHome(!entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(home);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolledPastHome
        ? "bg-background"
        : "bg-[linear-gradient(90deg,var(--color-background-start)_0%,var(--color-background-mid)_50%,var(--color-background-end)_80%)]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-5 xl:py-12">
        <Link href="/"><h1 className="text-2xl font-extrabold">Kinsey</h1></Link>
        <div className="hidden md:flex items-center gap-8">
          <Nav />
          <Button className="ml-auto">Contact</Button>
        </div>
        <div className="md:hidden">mobile nav</div>
      </div>
    </header>
  );
}
