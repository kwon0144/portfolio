import { ExternalLink, Filter, Github, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { projects } from "../data/projects";
import { usePageSize, usePagination } from "../hooks/usePagination";
import { useScrollToSection } from "../hooks/useScrollToSection";
import Pagination from "./Pagination";
import { useSearch } from "../hooks/useSearch";
import { useFilter } from "../hooks/useFilter";

const ProjectsSection = () => {
  // Constants for Search
  const { query, setQuery, onSubmitSearch, applySearch, resetSearch } =
    useSearch("", ["title", "description"]);

  // Constants for Filter
  const { selected, toggleCheck, clearFilters, categories, options, applyTagFilters } =
    useFilter(projects, (p) => p.tag ?? {});
  const [filterOpen, setFilterOpen] = useState(false);

  // Search + Filter result
  const filteredProjects = useMemo(() => {
    const byTags = applyTagFilters(projects);
    return applySearch(byTags);
  }, [applyTagFilters, applySearch]);

  // Constants for Pagination
  const pageSize = usePageSize({ lg: 6, md: 4, sm: 3 });
  const { page, setPage, totalPages, current, getPageButtons } =
    usePagination(filteredProjects, pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, selected, pageSize, setPage]);

  // Constants for Scroll Effect
  const scrollToSectionTop = useScrollToSection("projects-top", 80);

  useEffect(() => {
    scrollToSectionTop();
  }, [page, scrollToSectionTop]);

  return (
    <section id="projects" className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header row: Title + Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">
            <span className="text-primary">Project</span> Gallery
          </h2>

          <form onSubmit={onSubmitSearch} className="flex flex-col md:flex-row w-full md:w-auto gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or description…"
              className="w-full md:min-w-68 px-3 py-2 rounded-lg bg-foreground/5 text-foreground placeholder:text-foreground/60 outline-none focus:ring-2 ring-primary/40"
            />
            <div className="flex flex-row gap-6 md:gap-2 justify-center">
              <button 
                type="submit" 
                className="cosmic-button px-4 py-2 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Enter
              </button>
              <button 
                type="submit" 
                className="cosmic-button px-4 py-2 flex items-center gap-2"
                onClick={() => setFilterOpen((prev) => !prev)}
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </form>
        </div>

        {/* Filter */}
        <div
          id="filters-panel"
          className={`accordion p-4 rounded-xl bg-foreground/5 ${filterOpen ? "accordion-open my-6" : ""}`}
        >
            <div className={`${filterOpen ? "flex items-center justify-end mb-3" : "hidden"}`}>
              <div className="flex gap-2">
                <button
                  onClick={() => { clearFilters(); resetSearch(); }}
                  className="text-xs px-3 py-1 rounded-md bg-foreground/10 hover:bg-foreground/20"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-ro"> */}
            <div className={`${filterOpen ? "flex flex-col gap-4" : "hidden"}`}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-start gap-6 text-sm"
                >
                  {/* label column (fixed width, left-aligned) */}
                  <span className="shrink-0 font-semibold capitalize">
                    {cat}:
                  </span>

                  {/* tags */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {(options[cat] ?? []).map((opt) => {
                      const checked = Boolean(selected[cat]?.has(opt));
                      return (
                        <label key={opt} className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="accent-primary"
                            checked={checked}
                            onChange={() => toggleCheck(cat, opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>




            {/* </div> */}
        </div>

        {/* Projects Grid */}
        <div id="projects-top" aria-hidden="true" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          {current.map((project, index) => (
            <div 
              key={project.id ?? index} 
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Content */}
              <div className="p-6 text-left flex flex-col flex-1">
                <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                <p className="text-sm mb-4 text-muted-foreground">{project.description}</p>

                {/* Tags */}
                <div className="mb-4 space-y-2">
                  {Object.entries(project.tag).map(([category, items]) => (
                    <div key={category} className="flex flex-row gap-2 text-xs">
                      <p className="capitalize">{category}:</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span 
                            key={item} 
                            className="px-2 text-xs border rounded-full bg-secondary text-secondary-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons pushed to bottom */}
                <div className="mt-auto flex justify-end items-center">
                  <div className="flex gap-3">
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cosmic-outline-button flex items-center gap-2 px-4 py-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                    <a 
                      href={project.githubUrl || project.githubURl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cosmic-outline-button flex items-center gap-2 px-4 py-1"
                    >
                      <Github className="w-4 h-4" />
                      Git
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {current.length === 0 && (
            <div className="col-span-full text-center py-12 opacity-75">
              No projects match your search/filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          pages={getPageButtons()}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
