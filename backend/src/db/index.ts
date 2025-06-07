import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "url_shortener",
  password: "postgres",
  port: 5432,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
