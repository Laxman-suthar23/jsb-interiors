import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.image.deleteMany();
  await prisma.project.deleteMany();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();

  // Projects
  const projects = [
    {
      title: "Eta Mall Apartment",
      slug: "eta-mall-apartment",
      clientName: "Mr. Mukesh Jain",
      architect: "Deepak & Vikram Architects",
      type: "Apartment",
      location: "Eta Mall, Bangalore",
      duration: "35 days",
      description:
        "A sophisticated apartment design featuring rich teak wood paneling, dramatic cross-beam ceiling with warm ambient lighting, and a carefully curated mix of contemporary and classic furnishings.",
      coverImage:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      ],
    },
    {
      title: "Coimbatore Villa",
      slug: "coimbatore-villa",
      clientName: "Mr. Kamal Hasan",
      architect: "Cuboid Architects",
      type: "Villa",
      location: "Coimbatore, Tamil Nadu",
      duration: "50 days",
      description:
        "An expansive villa design featuring a refined neutral palette, teal leather seating, and sculptural metal wall art with a show-stopping spiral staircase.",
      coverImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80",
      ],
    },
    {
      title: "Karur Villa",
      slug: "karur-villa",
      clientName: "Mr. Prabaharan",
      architect: "Cuboid Architects",
      type: "Villa",
      location: "Karur, Tamil Nadu",
      duration: "50 days",
      description:
        "A minimalist modern villa maximising natural light through floor-to-ceiling glazing, celebrating honest materials and generous outdoor views.",
      coverImage:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      ],
    },
    {
      title: "Ooty Cottage",
      slug: "ooty-cottage",
      clientName: "Mr. Ramesh",
      architect: "Cuboid Architects",
      type: "Cottage",
      location: "Ooty, Tamil Nadu",
      duration: "75 days",
      description:
        "A hillside cottage retreat in the Nilgiris with soaring pine-clad vaulted ceilings, glass-railed spiral staircase, and warm timber tones that connect interior warmth with the misty mountain setting.",
      coverImage:
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
        "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1200&q=80",
      ],
    },
  ];

  for (const { images, ...projectData } of projects) {
    const project = await prisma.project.create({ data: projectData });
    await prisma.image.createMany({
      data: images.map((url) => ({ url, projectId: project.id })),
    });
    console.log(`  ✓ Created project: ${project.title}`);
  }

  // Reviews
  const reviews = [
    {
      name: "Ananya Sharma",
      message:
        "JSB Interiors transformed our apartment beyond our expectations. The attention to detail and dedication to understanding our vision made the entire process seamless.",
      rating: 5,
      project: "Apartment, Bangalore",
    },
    {
      name: "Rajiv Menon",
      message:
        "Working with Jasraj and Chandan was an absolute pleasure. They brought incredible expertise and creativity to our villa.",
      rating: 5,
      project: "Villa, Coimbatore",
    },
    {
      name: "Priya Nair",
      message:
        "Their 35 years of experience truly shows. From concept to completion, every decision was thoughtful and purposeful.",
      rating: 5,
      project: "Cottage, Ooty",
    },
    {
      name: "Suresh Krishnan",
      message:
        "Professional, punctual, and passionate about design. The team delivered within the agreed timeline without compromising on a single detail.",
      rating: 5,
      project: "Villa, Tamil Nadu",
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
    console.log(`  ✓ Created review by: ${review.name}`);
  }

  // Admin user (change password before production!)
  await prisma.user.create({
    data: {
      name: "JSB Admin",
      email: "admin@jsbinteriors.com",
      password: "changeme123", // Hash this with bcrypt in production
      role: "admin",
    },
  });
  console.log("  ✓ Created admin user: admin@jsbinteriors.com");

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
