import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig.js';

// Define the User model
class NewsModel {
    
    static async getNews(page = 1, limit = 10) {     
        const offset = (page - 1) * limit;   
        const connection = await mysql.createConnection(dbConfig.newsTechDBConfig);
        
        try {
            // Retrieve all rows from the sources_tbl
            const [rows] = await connection.execute(`SELECT * FROM news_vw LIMIT ? OFFSET ?`, [limit, offset]);
            let news = [];
            if (rows.length > 0) {
                // Define your column mapping here
                const columnMapping = {
                    'id': 'news_id',
                    'title': 'news_title',
                    'date' : 'news_date',
                    'image': 'news_image',
                    'url': 'news_url',
                    'source_id' : 'source_id',
                    'name' : 'source_name',
                };
                // Iterate over each row and apply the column mapping
                news = rows.map(row => {
                    const mappedRow = {};
                    for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                        mappedRow[mappedColumn] = row[dbColumn];
                    }
                    return mappedRow;
                });
            }
            const [[{ totalCount }]] = await connection.execute(`SELECT count(1) as totalCount FROM news_vw`,);
            const totalPages = Math.ceil(totalCount / limit);
            return {
                news,
                totalPages
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        } finally {
            await connection.end();
        }
    }
}
export default NewsModel;