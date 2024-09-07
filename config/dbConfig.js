import mysql from 'mysql2/promise'

// Create a MySQL pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'news',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 10000, // Time to wait before throwing an error for acquiring connection
});

// Function to query the database with retry logic
async function queryWithRetry(query, params = [], retries = 3) {
  let attempt = 0;
  while (attempt < retries) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(query, params);
      connection.release(); // Release the connection
      return rows;
    } catch (error) {
      if (connection) connection.release(); // Ensure connection is released on error
      if (attempt < retries - 1) {
        console.log(`Retrying query... attempt ${attempt + 1}`);
        attempt++;
        await new Promise(res => setTimeout(res, 1000 * attempt)); // Exponential backoff
      } else {
        throw error; // Throw error after all retries fail
      }
    }
  }
}

// Periodic database health check
setInterval(async () => {
  try {
    await pool.query('SELECT 1'); // Simple query to check if the connection is alive
    console.log('Database connection is healthy');
  } catch (error) {
    console.error('Database connection is down', error);
  }
}, 60000); // Run every 1 minute

export { pool, queryWithRetry };
