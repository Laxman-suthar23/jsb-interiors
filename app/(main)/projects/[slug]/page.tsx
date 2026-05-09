export const runtime = "nodejs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Building2,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/db";
import LightboxWrapper from "@/components/LightboxWrapper";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!project) notFound();

  // Fetch related projects
  const related = await prisma.project.findMany({
    where: {
      slug: { not: slug },
      type: project.type,
    },
    include: { images: true },
    take: 2,
    orderBy: { createdAt: "desc" },
  });

  const allImages = [project.coverImage, ...(project.images?.map((img: { url: any; }) => img.url) || [])];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden bg-forest-dark">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 max-w-7xl mx-auto">
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-cream/50 text-xs tracking-widest uppercase hover:text-cream transition-colors mb-6"
            >
              <ArrowLeft size={13} /> Back to Projects
            </Link>
            <p className="text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-3">
              {project.type} Design
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold text-cream mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {project.title}
            </h1>
            <p className="text-cream/55 text-lg">{project.location}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <p className="section-subtitle mb-4">Project Overview</p>
              <h2 className="section-title text-forest mb-8">
                About This Project
              </h2>
              <span className="line-accent block mb-8" />
              <p className="prose-custom">{project.description}</p>
            </AnimatedSection>
          </div>

          {/* Info card */}
          <AnimatedSection direction="left">
            <div className="bg-forest p-8 text-cream">
              <h3 className="text-xs tracking-[0.25em] uppercase text-gold mb-8">
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
                    <div className="w-8 h-8 bg-cream/8 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/40 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-cream/90 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream/10 mt-8 pt-8">
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

      {/* Gallery (Client Component for Lightbox) */}
      {allImages.length > 0 && (
        <LightboxWrapper images={allImages} title={project.title} />
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-28 px-6 bg-forest-dark">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="mb-14">
              <p className="section-subtitle text-gold/80 mb-3">
                More Work
              </p>
              <h2 className="section-title text-cream">Related Projects</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p:any, i:any) => (
                <AnimatedSection key={p.id} delay={i * 100}>
                  <ProjectCard {...p} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
