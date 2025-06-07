import pool from ".";

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;

const createUrlsTable = `
CREATE TABLE IF NOT EXISTS urls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    longUrl TEXT NOT NULL,
    shortUrl VARCHAR(100) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    clicks INTEGER DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    userId UUID REFERENCES users(id) ON DELETE CASCADE
);
`;

const initDb = async () => {
  try {
    await pool.query(createUsersTable);
    await pool.query(createUrlsTable);
    console.log("Tables created or already exist");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

if (require.main === module) {
  initDb();
}

export default initDb;
