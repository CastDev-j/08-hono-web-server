import type { Context, Next } from "hono";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

function withPrisma(c: Context, next: Next) {
  if (!c.get("prisma")) {
    const databaseUrl = (c.env as { DATABASE_URL: string }).DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not set");
    }
    const adapter = new PrismaPg({ connectionString: databaseUrl });
    const prisma = new PrismaClient({ adapter });
    c.set("prisma", prisma);
  }
  return next();
}

export default withPrisma;
