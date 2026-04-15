import { NextRequest, NextResponse } from "next/server";
import { reviewsData } from "@/lib/data";

export async function GET() {
  try {
    // Production: const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ reviews: reviewsData });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, message, rating, project } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    // Production: const review = await prisma.review.create({ data: { name, message, rating, project } });
    const review = { id: Date.now().toString(), name, message, rating: rating ?? 5, project: project ?? null, createdAt: new Date().toISOString() };

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
