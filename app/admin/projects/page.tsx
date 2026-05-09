export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import AdminProjectsList from "@/components/AdminProjectsList";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminProjectsList initialProjects={projects} />
  );
}
