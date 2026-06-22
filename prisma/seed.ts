import { PrismaClient } from "@prisma/client";
import { createSeedStore } from "../src/lib/os-api/seed";
import { syncPortalCredentialsFromStore } from "../src/lib/db/portal-auth";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.storeSnapshot.findUnique({ where: { id: "main" } });
  if (existing) {
    console.log("Store already seeded — skipping.");
    return;
  }

  const store = createSeedStore();
  await prisma.storeSnapshot.create({
    data: {
      id: "main",
      version: store.version,
      payload: store as object,
    },
  });
  await syncPortalCredentialsFromStore(store);
  console.log("Database seeded with NexDesk OS store v" + store.version);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
