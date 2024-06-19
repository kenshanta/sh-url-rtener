const { Pool } = require("pg"); // Import PostgreSQL client library
const shortId = require("shortid");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function createUrlTable() {
  try {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        full_url TEXT NOT NULL,
        short_url TEXT NOT NULL UNIQUE,
        clicks INTEGER DEFAULT 0
      );
    `;
    await pool.query(createTableSql);
    console.log("URL table created or already exists.");
  } catch (error) {
    console.error("Error creating URL table:", error);
  }
}

async function createUrl(fullUrl) {
  try {
    const shortUrl = generateShortUrl();
    const insertSql = `
      INSERT INTO urls (full_url, short_url) VALUES ($1, $2)
      RETURNING id;
    `;
    const result = await pool.query(insertSql, [fullUrl, shortUrl]);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error creating URL:", error);
    throw error;
  }
}

// Function to get a URL by its short URL
async function getUrlByShortUrl(shortUrl) {
  try {
    const selectSql = `
      SELECT * FROM urls WHERE short_url = $1;
    `;
    const result = await pool.query(selectSql, [shortUrl]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting URL by short URL:", error);
    throw error;
  }
}

async function incrementClickCount(shortUrl) {
  try {
    const updateSql = `
      UPDATE urls SET clicks = clicks + 1 WHERE short_url = $1;
    `;
    await pool.query(updateSql, [shortUrl]);
  } catch (error) {
    console.error("Error incrementing click count:", error);
    throw error;
  }
}

function generateShortUrl() {
  return shortId.generate();
}

createUrlTable();

module.exports = {
  createUrl,
  getUrlByShortUrl,
  incrementClickCount,
};
