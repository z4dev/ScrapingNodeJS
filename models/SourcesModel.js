import pool from '../config/dbConfig.js';

class SourcesModel {

    static async getSources() {
        let connection;
        try {
            connection = await pool.getConnection();  // Get a connection from the pool
            const [rows] = await connection.query('SELECT * FROM sources_vw');

            if (rows.length > 0) {
                const columnMapping = {
                    'id': 'source_id',
                    'name': 'source_name',
                    'url': 'source_url',
                    'news_count': 'news_count'
                };

                const mappedSources = rows.map(row => {
                    const mappedRow = {};
                    for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                        mappedRow[mappedColumn] = row[dbColumn];
                    }
                    return mappedRow;
                });

                return mappedSources;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        } finally {
            if (connection) connection.release();  // Release the connection back to the pool
        }
    }
}

export default SourcesModel;
