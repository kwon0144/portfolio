import { categories, skills } from "../data/skills";
import { cn } from "../lib/utils";
import { useState } from "react";

const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredSkills = skills.filter(skill =>
        activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-left">
            My <span className="text-primary">Skills</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                            activeCategory === category 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-foreground/10 text-foreground hover:bg-primary/50"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredSkills.map((skill, i) => {
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
        </div>
        </section>
    );
};

export default SkillsSection;
