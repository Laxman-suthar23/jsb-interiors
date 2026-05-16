export const runtime = "nodejs";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import ReviewsSection from "@/components/ReviewsSection";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "JSB Interiors | Premium Interior Design Studio",
  description:
    "35+ years crafting elegant, timeless spaces. Apartments, villas, cottages across South India.",
};

export default async function HomePage() {
  const featured = await prisma.project.findMany({
    where: { featured: true },
    include: { images: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const [reviews, reviewCount] = await Promise.all([
    prisma.review.findMany({
      where: { approved: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.count({ where: { approved: true } }),
  ]);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-forest">
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
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/70 to-forest/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Subtitle */}
              <p className="text-gold text-sm tracking-widest uppercase mb-5">
                Interior Design Studio
              </p>

              {/* Heading */}
              <h1 className="text-cream text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-6">
                Interior <br />
                <span className="italic text-gold">Design</span> <br />
                Portfolio
              </h1>

              {/* Divider + Names */}
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-gold" />
                <p className="text-cream/60 text-xs tracking-[0.25em] uppercase">
                  Jasraj C Jangid & Chandan P Suthar
                </p>
              </div>

              {/* Description */}
              <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-md mb-10">
                Crafting elegant, timeless spaces that reflect the soul of those
                who inhabit them for over three decades.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-6 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-forest transition"
                >
                  View Portfolio
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-gold text-forest text-sm tracking-wide hover:opacity-90 transition"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-cream/35 text-[0.65rem] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-linear-to-b from-cream/35 to-transparent" />
        </div>
      </section>

      {/* ─── INTRO ────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection direction="right">
            {/* Subtitle */}
            <p className="text-gold text-sm tracking-widest uppercase mb-4">
              About JSB Interiors
            </p>

            {/* Title */}
            <h2 className="text-forest text-4xl md:text-5xl font-semibold leading-tight mb-6">
              A Legacy of Craft & <br />
              <span className="italic text-gold">Timeless Design</span>
            </h2>

            {/* Line */}
            <span className="block w-12 h-[px] bg-gold mb-6" />

            {/* Paragraphs */}
            <p className="text-forest/80 text-base leading-relaxed mb-5">
              With over 35 years of experience, JSB Interiors is a father-son
              interior design studio known for creating elegant, timeless
              spaces. From expansive villas to charming cottages, our portfolio
              reflects a seamless blend of classic craftsmanship and modern
              design trends.
            </p>

            <p className="text-forest/70 text-base leading-relaxed mb-8">
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
                    className="text-gold mt-1 flex-shrink-0"
                  />
                  <span className="text-forest/80 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2 bg-forest text-cream hover:bg-forest-mid transition"
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
              <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-forest text-cream p-6 w-44 shadow-lg">
                <p className="text-4xl font-bold text-gold mb-1">35</p>
                <p className="text-[0.7rem] tracking-widest uppercase opacity-70">
                  Years of <br /> Excellence
                </p>
              </div>

              {/* Border */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ─── FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="py-28 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            {/* Subtitle */}
            <p className="text-gold text-sm tracking-widest uppercase mb-4">
              Our Work
            </p>

            {/* Title */}
            <h2 className="text-cream text-4xl md:text-5xl font-semibold mb-5">
              Featured Projects
            </h2>

            {/* Line */}
            <span className="block w-12 h-[px] bg-gold mx-auto mb-6" />

            {/* Description */}
            <p className="text-cream/60 max-w-xl mx-auto text-base leading-relaxed">
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
              className="group inline-flex items-center gap-2 px-7 py-3 border border-gold text-gold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gold hover:text-forest-dark"
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
      {/* ... (rest of sections) */}
      {/* Testimonials */}
      <ReviewsSection initialReviews={reviews} totalCount={reviewCount} />

      {/* CTA */}
      <section className="relative py-32 px-6 overflow-hidden bg-forest">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600&q=80"
            alt="CTA background"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            {/* Icon */}
            <Award size={36} className="text-gold mx-auto mb-6" />

            {/* Subtitle */}
            <p className="text-gold text-sm tracking-widest uppercase mb-4">
              Begin Your Journey
            </p>

            {/* Title */}
            <h2 className="text-cream text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Ready to Transform <br />
              <span className="italic text-gold">Your Space?</span>
            </h2>

            {/* Line */}
            <span className="block w-12 h-[1px] bg-gold mx-auto mb-8" />

            {/* Description */}
            <p className="text-cream/70 mb-10 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Book a free consultation with our team and take the first step
              toward creating the space of your dreams.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Primary */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gold text-forest text-sm tracking-wide hover:opacity-90 transition"
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
                className="group inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold text-sm tracking-wide hover:bg-gold hover:text-forest transition"
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
