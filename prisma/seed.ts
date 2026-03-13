import { PrismaClient, Prisma } from "../src/generated/prisma-node/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const todoData: Prisma.TodoCreateInput[] = [
  { id: crypto.randomUUID(), title: "Learn Hono", completed: false },
  { id: crypto.randomUUID(), title: "Build a web server", completed: false },
  { id: crypto.randomUUID(), title: "Use Prisma with Hono", completed: false },
];

export async function main() {
  for (const t of todoData) {
    await prisma.todo.create({ data: t });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
