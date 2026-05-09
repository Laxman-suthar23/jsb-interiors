"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

const TYPES = ["All", "Apartment", "Villa", "Cottage"];

export default function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.type === active);

  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs */}
        <AnimatedSection className="flex flex-wrap gap-3 mb-14">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActive(type)}
              className={`px-6 py-2.5 text-[0.75rem] tracking-[0.18em] uppercase font-medium border transition-all duration-300 ${
                active === type
                  ? "bg-forest text-cream border-forest"
                  : "bg-transparent text-forest/60 border-forest/20 hover:border-forest/60 hover:text-forest"
              }`}
            >
              {type}
              {type !== "All" && (
                <span
                  className={`ml-2 text-[0.6rem] ${active === type ? "text-gold" : "text-forest/35"}`}
                >
                  ({initialProjects.filter((p) => p.type === type).length})
                </span>
              )}
            </button>
          ))}
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 80}>
              <ProjectCard {...project} index={i} />
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-forest/35 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
