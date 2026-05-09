import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { projectUpdateSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // ── Validate with Zod ──
    const parsed = projectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // ── Check project exists ──
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // ── If slug is changing, check for duplicates ──
    const { images, ...fields } = parsed.data;
    if (fields.slug && fields.slug !== existing.slug) {
      const slugTaken = await prisma.project.findUnique({
        where: { slug: fields.slug },
      });
      if (slugTaken) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // ── Build explicit update data (whitelisted fields only) ──
    const updateData: Record<string, unknown> = {};
    const allowedFields = [
      "title",
      "slug",
      "clientName",
      "architect",
      "type",
      "location",
      "duration",
      "description",
      "coverImage",
      "featured",
    ] as const;

    for (const key of allowedFields) {
      if (fields[key] !== undefined) {
        updateData[key] = fields[key];
      }
    }

    // ── Update gallery if images array is provided ──
    if (images !== undefined) {
      // Delete old images and create new ones in a transaction
      await prisma.$transaction([
        prisma.image.deleteMany({ where: { projectId: id } }),
        ...images.map((url: string) =>
          prisma.image.create({ data: { url, projectId: id } })
        ),
      ]);
    }

    // ── Update project fields ──
    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: { images: true },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("PATCH /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ── Check project exists ──
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // ── Delete (cascade handles images) ──
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
