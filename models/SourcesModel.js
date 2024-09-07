import { queryWithRetry } from '../config/dbConfig.js';  // Import the queryWithRetry function

class SourcesModel {

    static async getSources() {
        try {
            // Use the queryWithRetry function with the appropriate SQL query
            const rows = await queryWithRetry('SELECT * FROM sources_vw');
            
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
        }
    }
}

export default SourcesModel;
