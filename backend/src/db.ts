import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Thêm logic kiểm tra và retry kết nối
const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      const client = await pool.connect();
      console.log("Connected to PostgreSQL successfully!");
      const res = await pool.query("SELECT NOW()");
      console.log("Current time from PostgreSQL:", res.rows[0].now);
      client.release();
      return true;
    } catch (err) {
      console.error("Failed to connect to PostgreSQL, retrying...");
      retries -= 1;
      if (retries === 0) {
        console.error("Max retries reached. Could not connect to PostgreSQL.");
        throw err;
      }
      await new Promise((res) => setTimeout(res, 5000)); 
    }
  }
};

const keepAlive = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Keep-alive query executed successfully");
  } catch (err) {
    console.error("Keep-alive query failed",);
  }
};

setInterval(keepAlive, 300000);

pool.on("error", (err: Error, client: any) => {
  console.error("Unexpected error on idle client:", err.message);
});

export default pool;
export { connectWithRetry };