export const runtime = "nodejs";
import AnimatedSection from "@/components/AnimatedSection";
import Image from "next/image";
import { prisma } from "@/lib/db";
import ProjectsList from "@/components/ProjectsList";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 bg-forest overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
            alt="Interior project"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/50 to-forest" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-gold text-sm tracking-widest uppercase mb-4">
              Portfolio
            </p>

            <h1 className="text-cream text-4xl md:text-5xl font-semibold mb-6">
              Our Projects
            </h1>

            <span className="block w-12 h-[1px] bg-gold mb-6" />

            <p className="text-cream/70 max-w-xl text-lg leading-relaxed">
              Every project is a collaboration — a dialogue between our craft
              and your vision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter + Grid (Client Component) */}
      <ProjectsList initialProjects={projects} />
    </>
  );
}
