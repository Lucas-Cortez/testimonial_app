import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

import { envServerSchema } from "@/utils/schemas/envSchema";

const main = async () => {
  const env = envServerSchema.parse(process.env);

  const client = postgres(env.DATABASE_URL);

  const db = drizzle(client, { logger: true });

  await migrate(db, { migrationsFolder: "./drizzle/migrations" });

  await client.end();
};

main();
