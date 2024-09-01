import pool from '../config/dbConfig.js';

class AuthModel {
    static async getUser(username = null) {
        let connection;
        try {
            connection = await pool.getConnection();  // Get a connection from the pool
            const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error executing query:', error);
        } finally {
            if (connection) connection.release();  // Release the connection back to the pool
        }
    }
}

export default AuthModel;
