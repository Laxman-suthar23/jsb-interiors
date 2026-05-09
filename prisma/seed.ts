import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Creating admin user...");

  const hashedPassword = await bcrypt.hash("Jasraj@JSB#", 12);

  await prisma.user.upsert({
    where: { email: "admin@jsbinteriors.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      name: "JSB Admin",
      email: "admin@jsbinteriors.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user created");
}

main()
  .catch(console.error)
  .finally(async () => {
    prisma.$disconnect();
  });