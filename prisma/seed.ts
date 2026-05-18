import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { ADMIN_SEED_PLAIN_PASSWORD } from "../lib/admin-bootstrap-password";
import { hashPassword } from "../lib/server/admin-password";

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

  const passwordHash = await hashPassword(ADMIN_SEED_PLAIN_PASSWORD);
  const adminCount = await prisma.admin.count();

  if (adminCount === 0) {
    await prisma.admin.create({ data: { passwordHash } });
    console.log(
      "Seed: created default Admin (set ADMIN_BOOTSTRAP_PASSWORD to override). Change password in Admin → Ayarlar after login."
    );
  } else if (process.env.RESET_ADMIN_PASSWORD === "1") {
    const admin = await prisma.admin.findFirst();
    if (admin) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: { passwordHash },
      });
      console.log(
        "Seed: Admin password reset to bootstrap value. Unset RESET_ADMIN_PASSWORD and change password in Admin → Ayarlar."
      );
    } else {
      await prisma.admin.create({ data: { passwordHash } });
      console.log("Seed: no Admin row found; created one with bootstrap password.");
    }
  }

  console.log("Seed complete: 5 statuses, 2 offices, admin bootstrap if needed");
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
