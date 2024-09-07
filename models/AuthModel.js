
import { queryWithRetry } from '../config/dbConfig.js';
class AuthModel {
    static async getUser(username = null) {
        try {
            // Use the queryWithRetry function with the appropriate SQL query
            const rows = await queryWithRetry('SELECT * FROM users WHERE username = ?', [username]);
            
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;  // Rethrow the error if needed
        }
    }
}

export default AuthModel;
