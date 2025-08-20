import { ChevronLeft, ChevronRight } from "lucide-react"; 
import { categories, skills } from "../data/skills"; 
import { cn } from "../lib/utils"; 
import { useEffect, useState } from "react"; 
import { usePageSize, usePagination } from "../hooks/usePagination"; 
import { useScrollToSection } from "../hooks/useScrollToSection";

const SkillsSection = () => { 
  
  // Constants for filtering skills by category 
  const [activeCategory, setActiveCategory] = useState("all"); 

  const filteredSkills = activeCategory === "all" 
    ? (Object.values(skills).flat()) 
    : skills[activeCategory]; 

  // Constants for scrolling effect 
  const scrollToSectionTop = useScrollToSection("skills-top", 80);

  // Conastants for pagination 
  const pageSize = usePageSize({lg: 18, md:12, sm:8}); 
  const { page, setPage, totalPages, current, getPageButtons } = usePagination(filteredSkills, pageSize); 

  // UseEffect for pagination 
  useEffect(() => { 
    setPage(1); 
  }, [activeCategory, setPage]); 
  
  // UseEffect for scrolling effect 
  useEffect(() => {
    scrollToSectionTop();
  }, [page, scrollToSectionTop]);
  
  return ( 
    <section id="skills" className="py-24 px-4 relative bg-secondary/30"> 
      <div id="skills-top" aria-hidden="true"/> 
      <div className="container mx-auto max-w-5xl"> 
        <div className="grid-cols-1 md:grid-cols-2 flex flex-col md:flex-row gap-6 md:gap-12 justify-between mb-6"> 
          {/* Header */} 
          <h2 className="text-2xl font-semibold text-left"> 
            My <span className="text-primary">Skills</span> 
          </h2> 
          
          {/* Category Buttons */} 
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:w-auto"> 
            {categories.map((category, index) => ( 
              <button 
                key={index} 
                onClick={() => setActiveCategory(category)} 
                className={cn( 
                  "text-sm px-5 py-2 md:py-1 rounded-full transition-colors duration-300 capitalize w-full md:w-auto", 
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
                <div className="mt-3 text-sm opacity-80">
                  {skill.name}
                </div> 
              </div> 
            ); 
          })} 
        </div> 
        
        {/* Pagination */} 
        {totalPages > 1 && ( 
          <nav className="flex items-center justify-center gap-2" aria-label="Pagination"> 
            <button 
              className="pagination-arrow"
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
                    {showEllipsis && 
                      <span className="px-2 opacity-60">…</span>
                    } 
                    <button
                      className={`pagination-num ${page === n ? "pagination-num-active" : "pagination-num-inactive"}`}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button> 
                  </span> 
                ); 
              })} 
            </div> 
            <button
              className="pagination-arrow"
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