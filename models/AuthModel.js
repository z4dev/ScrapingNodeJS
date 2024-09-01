import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig.js';

// Define the User model
class AuthModel {
    static async getUser(username = null) {
      const connection = await mysql.createConnection(dbConfig.newsTechDBConfig);
      try {
        const [rows, fields] = await connection.execute('SELECT * FROM users where username = ?', [username]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
      } catch (error) {
        console.error('Error executing query:', error);
      } finally {
        await connection.end();  // Ensure connection is closed
      }
  }
}
export default AuthModel;