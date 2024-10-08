import { queryWithRetry } from '../config/dbConfig.js';  // Import queryWithRetry function

class NewsModel {

    static async getNews(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        
        try {
            // Query the database using the retry logic
            const rows = await queryWithRetry(`SELECT * FROM news_vw LIMIT ? OFFSET ?`, [limit, offset]);
            
            let news = [];
            if (rows.length > 0) {
                const columnMapping = {
                    'id': 'news_id',
                    'title': 'news_title',
                    'date': 'news_date',
                    'image': 'news_image',
                    'url': 'news_url',
                    'source_id': 'source_id',
                    'name': 'source_name',
                    'is_published': 'is_published'  // Ensure this is mapped correctly
                };
                news = rows.map(row => {
                    const mappedRow = {};
                    for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                        mappedRow[mappedColumn] = row[dbColumn];
                    }
                    return mappedRow;
                });
            }

            // Query the total count using the retry logic
            const [{ totalCount }] = await queryWithRetry(`SELECT count(1) as totalCount FROM news_vw`);
            const totalPages = Math.ceil(totalCount / limit);
            return {
                news,
                totalPages
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return { news: [], totalPages: 0 };
        }
    }

    static async getNewsById(id) {
        try {
            // Query the database using the retry logic
            const rows = await queryWithRetry(`SELECT * FROM news_vw WHERE news_id = ?`, [id]);
            
            if (rows.length > 0) {
                const columnMapping = {
                    'id': 'news_id',
                    'title': 'news_title',
                    'date': 'news_date',
                    'image': 'news_image',
                    'url': 'news_url',
                    'source_id': 'source_id',
                    'name': 'source_name',
                    'is_published': 'is_published'  // Ensure this is mapped correctly
                };
                const row = rows[0];
                const news = {};
                for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                    news[mappedColumn] = row[dbColumn];
                }
                return news;
            }
            return null;
        } catch (error) {
            console.error('Error executing query:', error);
            return null;
        }
    }

    static async getAllNews() {
        try {
            // Query the database using the retry logic
            const rows = await queryWithRetry(`SELECT * FROM news_vw`);
            
            let news = [];
            if (rows.length > 0) {
                const columnMapping = {
                    'id': 'news_id',
                    'title': 'news_title',
                    'date': 'news_date',
                    'image': 'news_image',
                    'url': 'news_url',
                    'source_id': 'source_id',
                    'name': 'source_name',
                    'is_published': 'is_published'  // Ensure this is mapped correctly
                };
                news = rows.map(row => {
                    const mappedRow = {};
                    for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                        mappedRow[mappedColumn] = row[dbColumn];
                    }
                    return mappedRow;
                });
            }
            return news;
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        }
    }
}

export default NewsModel;
