"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/lib/data";
import Image from "next/image";
const TYPES = ["All", "Apartment", "Villa", "Cottage"];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projectsData
      : projectsData.filter((p) => p.type === active);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 bg-[#1e3b22] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
            alt="Interior project"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e3b22]/70 via-[#1e3b22]/50 to-[#1e3b22]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Portfolio
            </p>

            <h1 className="text-[#f5f0e8] text-4xl md:text-5xl font-semibold mb-6">
              Our Projects
            </h1>

            <span className="block w-12 h-[1px] bg-[#c9a84c] mb-6" />

            <p className="text-[#f5f0e8]/70 max-w-xl text-lg leading-relaxed">
              Every project is a collaboration — a dialogue between our craft
              and your vision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <AnimatedSection className="flex flex-wrap gap-3 mb-14">
            {TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActive(type)}
                className={`px-6 py-2.5 text-[0.75rem] tracking-[0.18em] uppercase font-medium border transition-all duration-300 ${
                  active === type
                    ? "bg-[#1e3b22] text-[#f5f0e8] border-[#1e3b22]"
                    : "bg-transparent text-[#1e3b22]/60 border-[#1e3b22]/20 hover:border-[#1e3b22]/60 hover:text-[#1e3b22]"
                }`}
              >
                {type}
                {type !== "All" && (
                  <span
                    className={`ml-2 text-[0.6rem] ${active === type ? "text-[#c9a84c]" : "text-[#1e3b22]/35"}`}
                  >
                    ({projectsData.filter((p) => p.type === type).length})
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
              <p className="text-[#1e3b22]/35 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
