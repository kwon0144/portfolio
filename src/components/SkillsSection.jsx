import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories, skills } from "../data/skills";
import { cn } from "../lib/utils";
import { useEffect, useState, useMemo } from "react";


function usePageSize() {
    const getSize = () => {
        const w = window.innerWidth;
        if (w >= 1024) return 18; // lg+
        if (w >= 768) return 12;  // md
        return 8;                 // mobile
    };
    const [size, setSize] = useState(() => (typeof window !== "undefined" ? getSize() : 12));
    useEffect(() => {
        const onResize = () => setSize(getSize());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return size;
}


const SkillsSection = () => {
    // Constances for filtering skills by category
    const [activeCategory, setActiveCategory] = useState("all");
    const filteredSkills = skills.filter(skill =>
        activeCategory === "all" || skill.category === activeCategory
    );

    // Conastants for pagination
    const pageSize = usePageSize();
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filteredSkills.length / pageSize));
    const pageStart = (page - 1) * pageSize;
    const pageEnd = pageStart + pageSize;
    const current = useMemo(
        () => filteredSkills.slice(pageStart, pageEnd),
        [filteredSkills, pageStart, pageEnd]
    );

    const getPageButtons = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages = new Set([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);
        return [...pages]
        .filter(n => n >= 1 && n <= totalPages)
        .sort((a, b) => a - b);
    };

    useEffect(() => {
        setPage(1); // Reset page when category changes
    }, [activeCategory]);

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <div className="grid-cols-1 md:grid-cols-2 flex flex-col md:flex-row gap-6 md:gap-12 justify-between mb-6">
                    {/* Header */}
                    <h2 className="text-2xl font-semibold text-left">
                        My <span className="text-primary">Skills</span>
                    </h2>

                    {/* Category Buttons */}
                    <div className="grid grid-cols-2 gap-3 md:flex md:flex-row md:gap-4 md:w-auto items-center md:justify-end">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "text-sm px-5 py-2 md:py-1 rounded-full transition-colors duration-300 capitalize",
                                    activeCategory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-foreground/10 text-foreground hover:bg-primary/50"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
                    {current.map((skill, i) => {
                        const Icon = skill.Icon;
                        return (
                            <div
                            key={i}
                            className="bg-card rounded-xl p-5 flex flex-col items-center justify-center text-center"
                            >
                                <Icon className="text-3xl" />
                                <div className="mt-3 text-sm opacity-80">{skill.name}</div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                    <button
                        className="px-3 py-1.5 rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 disabled:opacity-40"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        aria-label="Previous Page"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Numbered buttons */}
                    <div className="flex items-center gap-1">
                        {getPageButtons().map((n, idx, arr) => {
                        const prev = arr[idx - 1];
                        const showEllipsis = prev && n - prev > 1;
                        return (
                            <span key={n} className="flex items-center">
                            {showEllipsis && <span className="px-2 opacity-60">…</span>}
                            <button
                                onClick={() => setPage(n)}
                                aria-current={page === n ? "page" : undefined}
                                className={[
                                "px-3 py-1.5 rounded-md text-sm",
                                page === n
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-foreground/10 text-foreground hover:bg-foreground/20",
                                ].join(" ")}
                            >
                                {n}
                            </button>
                            </span>
                        );
                        })}
                    </div>

                    <button
                        className="px-3 py-1.5 rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 disabled:opacity-40"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        aria-label="Next Page"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </nav>
                )}
            </div>
        </section>
    );
};

export default SkillsSection;
