import mysql from 'mysql2/promise';

// Create a MySQL pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'news',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
