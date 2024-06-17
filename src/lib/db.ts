import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { envServer } from "@/utils/helpers/env";

const connectionString = envServer.DATABASE_URL;

console.log(connectionString);

const client = postgres(connectionString);
const db = drizzle(client);

export { db };
