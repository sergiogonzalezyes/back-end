import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', async (client) => {
    await client.query(`SET search_path TO ${process.env.DB_SCHEMA || 'tcg'}, public`);
});