import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const statuses = [
  { name: "New" },
  { name: "Contacted" },
  { name: "In Progress" },
  { name: "Completed" },
  { name: "Cancelled" },
];

const offices = [
  {
    name: "Main Office",
    address: "123 Therapy Lane, Istanbul, Turkey",
    mapsLink: "https://maps.google.com/?q=123+Therapy+Lane+Istanbul",
  },
  {
    name: "Downtown Branch",
    address: "456 Wellness Blvd, Istanbul, Turkey",
  },
];

async function main(): Promise<void> {
  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  for (const office of offices) {
    await prisma.office.upsert({
      where: { name: office.name },
      update: {},
      create: office,
    });
  }

  console.log("Seed complete: 5 statuses, 2 offices");
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
