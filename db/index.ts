import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env.test" })
  dotenv.config({ path: ".env.local" })
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres"

export const db = connectionString.includes("neon.tech")
  ? drizzleNeon(connectionString, { schema })
  : drizzlePg(postgres(connectionString), { schema })
