// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
// import { envServer } from "@/utils/helpers/env";

// const connectionString = envServer.DATABASE_URL;

// console.log(connectionString);

// const client = postgres(connectionString);
// const db = drizzle(client);

// export { db };

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({ log: ["query", "info", "warn", "error"] });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export { db };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
