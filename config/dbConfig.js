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
  enableKeepAlive: true, 
});

async function queryWithRetry(query, params = [], retries = 3) {
  let attempt = 0;
  while (attempt < retries) {
    let connection;
    try {
      connection = await pool.getConnection(); 
      const [rows] = await connection.query(query, params);
      connection.release(); 
      return rows;
    } catch (error) {
      if (connection) connection.release(); 
      
      // Handle connection loss error
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('MySQL connection was lost. Retrying...');
        continue;  
      }
      
      if (attempt < retries - 1) {
        console.log(`Retrying query... attempt ${attempt + 1}`);
        attempt++;
        await new Promise(res => setTimeout(res, 1000 * attempt)); 
      } else {
        throw error;
      }
    }
  }
}

setInterval(async () => {
  try {
    await pool.query('SELECT 1'); 
    console.log('Database connection is healthy');
  } catch (error) {
    console.error('Database connection is down', error);
  }
}, 60000); 

export { pool, queryWithRetry };
