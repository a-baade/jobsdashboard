import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
  const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof PrismaClientSingleton>;
}

const prisma = globalThis.prisma ?? PrismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
