import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function resetSequences() {
  const tables = await prisma.$queryRawUnsafe(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename NOT IN ('_prisma_migrations') -- on évite de supprimer les migrations Prisma
  `);

  const tableNames = tables.map((t) => `"${t.tablename}"`).join(", ");
  const truncateQuery = `TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE`;

  await prisma.$executeRawUnsafe(truncateQuery);
}

resetSequences()
  .then(() => {
    console.log("Séquences réinitialisées !");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
