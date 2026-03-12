import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import "dotenv/config"

const client = postgres(process.env.DATABASE_URL!, {
  password: process.env.DATABASE_PASSWORD!
})

export const db = drizzle({ client });