export const runtime = "nodejs";
import Link from "next/link";
import { FolderOpen, Star, ExternalLink, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projectCount, featuredCount, reviewCount, recentProjects, recentReviews] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { featured: true } }),
    prisma.review.count(),
    prisma.project.findMany({ include: { images: true }, take: 4, orderBy: { createdAt: "desc" } }),
    prisma.review.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-forest mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Dashboard</h2>
        <p className="text-forest/45 text-sm">Welcome back. Here's an overview of JSB Interiors.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { label: "Total Projects", value: projectCount, icon: <FolderOpen size={18} />, color: "var(--forest)" },
          { label: "Featured Projects", value: featuredCount, icon: <TrendingUp size={18} />, color: "var(--forest-mid)" },
          { label: "Reviews", value: reviewCount, icon: <Star size={18} />, color: "var(--gold)" },
          { label: "Years Experience", value: 35, icon: <TrendingUp size={18} />, color: "var(--forest-dark)" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-forest/8 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 flex items-center justify-center text-white" style={{ backgroundColor: stat.color }}>{stat.icon}</div>
            </div>
            <p className="text-3xl font-bold text-forest mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</p>
            <p className="text-[0.7rem] tracking-widest uppercase text-forest/40">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-forest/8 p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-forest" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Projects</h3>
            <Link href="/admin/projects" className="text-xs text-gold hover:underline tracking-wide">View all</Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-forest/6 last:border-0">
                <div>
                  <p className="text-sm font-medium text-forest">{p.title}</p>
                  <p className="text-xs text-forest/40 mt-0.5">{p.type} · {p.location}</p>
                </div>
                <Link href={`/projects/${p.slug}`} className="text-forest/30 hover:text-forest transition-colors">
                  <ExternalLink size={13} />
                </Link>
              </div>
            ))}
            {recentProjects.length === 0 && (
              <p className="text-xs text-forest/30 py-4">No projects found.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-forest/8 p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-forest" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Reviews</h3>
            <Link href="/admin/reviews" className="text-xs text-gold hover:underline tracking-wide">View all</Link>
          </div>
          <div className="space-y-4">
            {recentReviews.map((r) => (
              <div key={r.id} className="py-3 border-b border-forest/6 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-forest">{r.name}</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-xs ${s <= (r.rating ?? 5) ? "text-gold" : "text-gold/20"}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-forest/45 leading-relaxed line-clamp-1">{r.message}</p>
              </div>
            ))}
            {recentReviews.length === 0 && (
              <p className="text-xs text-forest/30 py-4">No reviews found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/admin/projects", label: "Add New Project", desc: "Upload images & fill details", color: "var(--forest)" },
          { href: "/admin/reviews", label: "Add New Review", desc: "Add a client testimonial", color: "var(--forest-mid)" },
          { href: "/", label: "View Live Site", desc: "See the public-facing website", color: "var(--gold)" },
        ].map((action) => (
          <Link key={action.href} href={action.href}
            className="p-6 text-white group hover:opacity-90 transition-opacity"
            style={{ backgroundColor: action.color }}
          >
            <p className="text-sm font-semibold mb-1">{action.label}</p>
            <p className="text-[0.72rem] opacity-60">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
