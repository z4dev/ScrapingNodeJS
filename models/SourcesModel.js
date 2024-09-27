import { queryWithRetry } from '../config/dbConfig.js';  // Import the queryWithRetry function

class SourcesModel {

    static async getSources() {
        try {
            // Use the queryWithRetry function with the updated SQL query
            const rows = await queryWithRetry(`
                SELECT sources_tbl.*, Bot_tbl.bot_name, Bot_tbl.channel_name, COUNT(news_tbl.id) AS news_count 
                FROM sources_tbl 
                JOIN Bot_tbl ON sources_tbl.bot_id = Bot_tbl.bot_id
                LEFT JOIN news_tbl ON news_tbl.source_id = sources_tbl.id
                GROUP BY sources_tbl.id
            `);
            
            if (rows.length > 0) {
                const columnMapping = {
                    'id': 'source_id',
                    'name': 'source_name',
                    'url': 'source_url',
                    'news_count': 'news_count',
                    'bot_name': 'bot_name',
                    'channel_name': 'channel_name'
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
        }
    }
}

export default SourcesModel;
