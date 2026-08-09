import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

// Function to do a quick query to remote DB
async function main() {
  try {
    const stmt = "ALTER TABLE Task ADD COLUMN titolo TEXT NOT NULL DEFAULT ''" ;
    await db.execute(stmt)
  } catch (error) {
    console.log("Errore: ", error.message)
  }
}

main();
