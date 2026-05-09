export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import AdminReviewsList from "@/components/AdminReviewsList";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminReviewsList initialReviews={reviews} />
  );
}
