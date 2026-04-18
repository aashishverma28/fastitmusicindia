require('dotenv').config();
const { Pool } = require('pg');

async function run() {
  console.log("Using DB URL:", process.env.DATABASE_URL);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT 1 as result');
    console.log("SUCCESS! DB connected via aws-1. Result:", result.rows);
    client.release();
  } catch (err) {
    console.error("FAILED. DB Error:", err.message);
  } finally {
    await pool.end();
  }
}

run();
