import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import StarRating from "@/components/StarRating";
import { projectsData, reviewsData, statsData } from "@/lib/data";

export const metadata = {
  title: "JSB Interiors | Premium Interior Design Studio",
  description:
    "35+ years crafting elegant, timeless spaces. Apartments, villas, cottages across South India.",
};

export default function HomePage() {
  const featured = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#1e3b22]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85"
            alt="JSB Interiors hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3b22]/95 via-[#1e3b22]/70 to-[#1e3b22]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Subtitle */}
              <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-5">
                Interior Design Studio
              </p>

              {/* Heading */}
              <h1 className="text-[#f5f0e8] text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-6">
                Interior <br />
                <span className="italic text-[#c9a84c]">Design</span> <br />
                Portfolio
              </h1>

              {/* Divider + Names */}
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#c9a84c]" />
                <p className="text-[#f5f0e8]/60 text-xs tracking-[0.25em] uppercase">
                  Jasraj C Jangid & Chandan P Suthar
                </p>
              </div>

              {/* Description */}
              <p className="text-[#f5f0e8]/70 text-base md:text-lg leading-relaxed max-w-md mb-10">
                Crafting elegant, timeless spaces that reflect the soul of those
                who inhabit them for over three decades.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-6 py-3 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-wide hover:bg-[#c9a84c] hover:text-[#1e3b22] transition"
                >
                  View Portfolio
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#1e3b22] text-sm tracking-wide hover:opacity-90 transition"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[#f5f0e8]/35 text-[0.65rem] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[#f5f0e8]/35 to-transparent" />
        </div>

        {/* Stats Bar */}
        {/* <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#162b18]/80 backdrop-blur-sm border-t border-[#f5f0e8]/10">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#f5f0e8]/10">
            {statsData.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p
                  className="text-2xl font-bold text-[#c9a84c]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.number}
                </p>
                <p className="text-[0.65rem] text-[#f5f0e8]/45 tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* ─── INTRO ────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection direction="right">
            {/* Subtitle */}
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              About JSB Interiors
            </p>

            {/* Title */}
            <h2 className="text-[#1e3b22] text-4xl md:text-5xl font-semibold leading-tight mb-6">
              A Legacy of Craft & <br />
              <span className="italic text-[#c9a84c]">Timeless Design</span>
            </h2>

            {/* Line */}
            <span className="block w-12 h-[1px] bg-[#c9a84c] mb-6" />

            {/* Paragraphs */}
            <p className="text-[#1e3b22]/80 text-base leading-relaxed mb-5">
              With over 35 years of experience, JSB Interiors is a father-son
              interior design studio known for creating elegant, timeless
              spaces. From expansive villas to charming cottages, our portfolio
              reflects a seamless blend of classic craftsmanship and modern
              design trends.
            </p>

            <p className="text-[#1e3b22]/70 text-base leading-relaxed mb-8">
              Always staying up-to-date with the latest styles and innovations,
              we are committed to quality, functionality, and aesthetic
              excellence. Our client-first approach has earned us a 100%
              satisfaction record across every project.
            </p>

            {/* Points */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                "100% client satisfaction across 70+ projects",
                "Collaborations with 15+ top architects",
                "On-time delivery, every single project",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={16}
                    className="text-[#c9a84c] mt-1 flex-shrink-0"
                  />
                  <span className="text-[#1e3b22]/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#1e3b22] text-[#f5f0e8] hover:bg-[#2d5230] transition"
            >
              Meet the Team
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection direction="left" delay={150}>
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85"
                  alt="JSB Interiors workshop"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-8 -left-8 bg-[#1e3b22] text-[#f5f0e8] p-6 w-44 shadow-lg">
                <p className="text-4xl font-bold text-[#c9a84c] mb-1">35</p>
                <p className="text-[0.7rem] tracking-widest uppercase opacity-70">
                  Years of <br /> Excellence
                </p>
              </div>

              {/* Border */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#c9a84c]/30 -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ─── FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#162b18]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            {/* Subtitle */}
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Our Work
            </p>

            {/* Title */}
            <h2 className="text-[#f5f0e8] text-4xl md:text-5xl font-semibold mb-5">
              Featured Projects
            </h2>

            {/* Line */}
            <span className="block w-12 h-[1px] bg-[#c9a84c] mx-auto mb-6" />

            {/* Description */}
            <p className="text-[#f5f0e8]/60 max-w-xl mx-auto text-base leading-relaxed">
              A curated selection of spaces where design meets craftsmanship —
              each project a unique story.
            </p>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {featured.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 100}>
                <ProjectCard {...project} index={i} />
              </AnimatedSection>
            ))}
          </div>

          {/* Button */}
          <AnimatedSection className="flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#162b18]"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>
      {/* ─── STATS FULL ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f5f0e8] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #1e3b22 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {statsData.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 80}>
                <div className="group">
                  <p className="stat-number text-[#1e3b22] mb-2 group-hover:text-[#c9a84c] transition-colors duration-500">
                    {stat.number}
                  </p>
                  <span className="line-accent mx-auto block mb-3" />
                  <p className="text-[0.7rem] tracking-[0.22em] text-[#1e3b22]/50 uppercase">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES STRIP ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#1e3b22]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle text-[#c9a84c]/80 mb-4">
              What We Do
            </p>
            <h2 className="section-title text-[#f5f0e8]">Our Expertise</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#f5f0e8]/10">
            {[
              {
                icon: "🏢",
                title: "Apartment Design",
                desc: "Modern, functional interiors that maximise space and comfort in urban apartments.",
              },
              {
                icon: "🏡",
                title: "Villa Design",
                desc: "Luxurious, expansive villa interiors that balance grandeur with warmth.",
              },
              {
                icon: "🌿",
                title: "Cottage Design",
                desc: "Cosy, character-filled retreats that celebrate natural materials and landscape.",
              },
              {
                icon: "💡",
                title: "Lighting Design",
                desc: "Layered ambient, task and accent lighting crafted to enhance every space.",
              },
              {
                icon: "🪑",
                title: "Furniture Curation",
                desc: "Carefully selected or bespoke furniture that anchors each room's design narrative.",
              },
              {
                icon: "📐",
                title: "Space Planning",
                desc: "Intelligent layouts that optimise flow, function and visual proportion.",
              },
            ].map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 70}>
                <div className="bg-[#1e3b22] p-8 group hover:bg-[#2d5230] transition-colors duration-400">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3
                    className="text-[#f5f0e8] text-lg mb-3 font-semibold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#f5f0e8]/45 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <span className="block w-0 h-px bg-[#c9a84c] mt-5 group-hover:w-10 transition-all duration-500" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle mb-4">Client Stories</p>
            <h2 className="section-title text-[#1e3b22] mb-5">
              What Our Clients Say
            </h2>
            <span className="line-accent mx-auto block" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewsData.map((review, i) => (
              <AnimatedSection key={review.id} delay={i * 90}>
                <div className="p-8 border border-[#1e3b22]/10 bg-white relative group hover:border-[#c9a84c]/40 transition-colors duration-400">
                  {/* Quote mark */}
                  <span
                    className="absolute top-6 right-8 text-7xl text-[#1e3b22]/6 leading-none select-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    aria-hidden
                  >
                    ❝
                  </span>
                  <div className="mb-5">
                    <StarRating rating={review.rating ?? 5} />
                  </div>
                  <p className="text-[#1e3b22]/70 leading-relaxed mb-6 text-[0.9375rem] italic">
                    "{review.message}"
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-[#1e3b22]/8">
                    <div
                      className="w-9 h-9 bg-[#1e3b22] flex items-center justify-center text-[#f5f0e8] text-sm font-bold flex-shrink-0"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-[#1e3b22] text-sm font-semibold">
                        {review.name}
                      </p>
                      {review.project && (
                        <p className="text-[0.7rem] text-[#c9a84c] tracking-wide">
                          {review.project}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden bg-[#1e3b22]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600&q=80"
            alt="CTA background"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[#1e3b22]/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            {/* Icon */}
            <Award size={36} className="text-[#c9a84c] mx-auto mb-6" />

            {/* Subtitle */}
            <p className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">
              Begin Your Journey
            </p>

            {/* Title */}
            <h2 className="text-[#f5f0e8] text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Ready to Transform <br />
              <span className="italic text-[#c9a84c]">Your Space?</span>
            </h2>

            {/* Line */}
            <span className="block w-12 h-[1px] bg-[#c9a84c] mx-auto mb-8" />

            {/* Description */}
            <p className="text-[#f5f0e8]/70 mb-10 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Book a free consultation with our team and take the first step
              toward creating the space of your dreams.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Primary */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#1e3b22] text-sm tracking-wide hover:opacity-90 transition"
              >
                Get Free Consultation
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary */}
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-wide hover:bg-[#c9a84c] hover:text-[#1e3b22] transition"
              >
                Explore Projects
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
