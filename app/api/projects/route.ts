import { NextRequest, NextResponse } from "next/server";
import { projectsData } from "@/lib/data";

// In production, replace with: import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Production: const projects = await prisma.project.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ projects: projectsData });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, clientName, architect, type, location, duration, description, coverImage, featured } = body;

    if (!title || !slug || !clientName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Production with Prisma:
    // const project = await prisma.project.create({
    //   data: { title, slug, clientName, architect, type, location, duration, description, coverImage, featured: featured ?? false }
    // });

    const project = { id: Date.now().toString(), title, slug, clientName, architect, type, location, duration, description, coverImage, featured: featured ?? false, images: [], createdAt: new Date().toISOString() };

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
