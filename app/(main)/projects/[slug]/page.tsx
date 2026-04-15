"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/lib/data";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projectsData.find((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) notFound();

  const related = projectsData
    .filter((p) => p.slug !== slug && p.type === project.type)
    .slice(0, 2);
  const allImages = [project.coverImage, ...project.images.slice(1)];

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + allImages.length) % allImages.length : 0,
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % allImages.length : 0));

  return (
    <>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden bg-[#162b18]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#162b18] via-[#162b18]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 max-w-7xl mx-auto">
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#f5f0e8]/50 text-xs tracking-widest uppercase hover:text-[#f5f0e8] transition-colors mb-6"
            >
              <ArrowLeft size={13} /> Back to Projects
            </Link>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-[#c9a84c] mb-3">
              {project.type} Design
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold text-[#f5f0e8] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {project.title}
            </h1>
            <p className="text-[#f5f0e8]/55 text-lg">{project.location}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <p className="section-subtitle mb-4">Project Overview</p>
              <h2 className="section-title text-[#1e3b22] mb-8">
                About This Project
              </h2>
              <span className="line-accent block mb-8" />
              <p className="prose-custom">{project.description}</p>
            </AnimatedSection>
          </div>

          {/* Info card */}
          <AnimatedSection direction="left">
            <div className="bg-[#1e3b22] p-8 text-[#f5f0e8]">
              <h3 className="text-xs tracking-[0.25em] uppercase text-[#c9a84c] mb-8">
                Project Details
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <User size={15} />,
                    label: "Client",
                    value: project.clientName,
                  },
                  {
                    icon: <Building2 size={15} />,
                    label: "Architect",
                    value: project.architect,
                  },
                  {
                    icon: <MapPin size={15} />,
                    label: "Location",
                    value: project.location,
                  },
                  {
                    icon: <Clock size={15} />,
                    label: "Duration",
                    value: project.duration,
                  },
                  {
                    icon: <Building2 size={15} />,
                    label: "Type",
                    value: `${project.type} Design`,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#f5f0e8]/8 flex items-center justify-center text-[#c9a84c] flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f5f0e8]/40 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[#f5f0e8]/90 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#f5f0e8]/10 mt-8 pt-8">
                <Link
                  href="/contact"
                  className="btn-outline w-full justify-center"
                >
                  Similar Project? <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12">
            <h2 className="section-title text-[#1e3b22] mb-4">
              Project Gallery
            </h2>
            <span className="line-accent block" />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allImages.map((img, i) => (
              <AnimatedSection
                key={i}
                delay={i * 50}
                className={i === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""}
              >
                <button
                  onClick={() => openLightbox(i)}
                  className={`relative overflow-hidden group w-full block ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[#1e3b22]/0 group-hover:bg-[#1e3b22]/30 transition-colors duration-400 flex items-center justify-center">
                    <span className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1e3b22]/60 px-4 py-2">
                      View
                    </span>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-28 px-6 bg-[#162b18]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="mb-14">
              <p className="section-subtitle text-[#c9a84c]/80 mb-3">
                More Work
              </p>
              <h2 className="section-title text-[#f5f0e8]">Related Projects</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 100}>
                  <ProjectCard {...p} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#0e1c10]/96 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[#f5f0e8]/70 hover:text-[#f5f0e8] border border-[#f5f0e8]/20 hover:border-[#f5f0e8]/50 transition-colors"
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-[#f5f0e8]/70 hover:text-[#f5f0e8] border border-[#f5f0e8]/20 hover:border-[#f5f0e8]/50 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-[#f5f0e8]/70 hover:text-[#f5f0e8] border border-[#f5f0e8]/20 hover:border-[#f5f0e8]/50 transition-colors"
          >
            <ChevronRight size={22} />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[lightboxIndex]}
              alt={`${project.title} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#f5f0e8]/40 text-xs tracking-widest">
            {lightboxIndex + 1} / {allImages.length}
          </p>
        </div>
      )}
    </>
  );
}
