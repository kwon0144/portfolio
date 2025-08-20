import { ExternalLink, Github, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { projects } from "../data/projects";

const ProjectsSection = () => {
  // Search
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const onSubmitSearch = (e) => {
    e?.preventDefault?.();
    setSubmittedQuery(query.trim().toLowerCase());
  };

  // Filters (use Sets)
  const [selected, setSelected] = useState({});
  const toggleCheck = (cat, value) => {
    setSelected((prev) => {
      const nextSet = new Set(prev[cat] || []);
      nextSet.has(value) ? nextSet.delete(value) : nextSet.add(value);
      return { ...prev, [cat]: nextSet };
    });
  };
  const clearFilters = () => setSelected({});

  // Categories from data (memoized)
  const categories = useMemo(() => {
    return Array.from(
      new Set(projects.flatMap((p) => Object.keys(p.tag ?? {})))
    );
  }, []);

  // Filter options per category (memoized)
  const filterOptions = useMemo(() => {
    const sets = categories.reduce((acc, cat) => {
      acc[cat] = new Set();
      return acc;
    }, {});
    projects.forEach((project) => {
      categories.forEach((cat) => {
        (project.tag?.[cat] || []).forEach((t) => sets[cat].add(t));
      });
    });
    return categories.reduce((acc, cat) => {
      acc[cat] = Array.from(sets[cat]).sort();
      return acc;
    }, {});
  }, [categories]);

  // Apply search + tag filters (memoized)
  const filteredProjects = useMemo(() => {
    const q = submittedQuery;
    return projects.filter((p) => {
      // text search
      if (q) {
        const hay = `${p.title ?? ""} ${p.description ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      // tag match: OR within a category, AND across categories
      for (const cat of categories) {
        const wanted = selected[cat]; // Set | undefined
        if (wanted && wanted.size > 0) {
          const projectTags = p.tag?.[cat] || [];
          const anyMatch = [...wanted].some((t) => projectTags.includes(t));
          if (!anyMatch) return false;
        }
      }
      return true;
    });
  }, [submittedQuery, selected, categories]);

  return (
    <section id="projects" className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header row: Title + Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">
            <span className="text-primary">Project</span> Gallery
          </h2>

          <form onSubmit={onSubmitSearch} className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or description…"
              className="w-full md:w-72 px-3 py-2 rounded-lg bg-foreground/5 text-foreground placeholder:text-foreground/60 outline-none focus:ring-2 ring-primary/40"
            />
            <button type="submit" className="cosmic-button px-4 py-2 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Enter
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="rounded-xl bg-foreground/5 p-4 mb-8">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm opacity-80">
                Filter by tech stack (OR within a group, AND across groups)
                </p>
                <button
                onClick={clearFilters}
                className="text-xs px-3 py-1 rounded-md bg-foreground/10 hover:bg-foreground/20"
                >
                Clear filters
                </button>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
            <fieldset key={cat}>
                <legend className="font-semibold mb-2 capitalize">{cat}</legend>
                <div className="grid grid-cols-2 gap-2">
                {(filterOptions[cat] ?? []).map((opt) => {
                    const checked = Boolean(selected[cat]?.has(opt));
                    return (
                    <label key={opt} className="flex items-center gap-2 text-sm">
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
            </fieldset>
            ))}
        </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-3 opacity-75">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id ?? index}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 text-left">
                <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                <p className="text-sm mb-4 text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-4 space-y-2">
                  {Object.entries(project.tag).map(([category, items]) => (
                    <div key={category} className="flex flex-row gap-2 text-xs">
                      <p className="capitalize min-w-20">{category}:</p>
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

                <div className="flex justify-end items-center">
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

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 opacity-75">
              No projects match your search/filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
