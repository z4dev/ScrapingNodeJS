import { queryWithRetry } from '../config/dbConfig.js';  // Import queryWithRetry function

class BotsModel {

    static async getBots(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        try {
            const rows = await queryWithRetry(`SELECT * FROM Bot_tbl LIMIT ? OFFSET ?`, [limit, offset]);
            
            let bots = [];
            if (rows.length > 0) {
                const columnMapping = {
                    'bot_id': 'bot_id',
                    'bot_token': 'bot_token',
                    'bot_username': 'bot_username',
                    'bot_name': 'bot_name',
                    'channel_Id': 'channel_Id',
                    'channel_name': 'channel_name',
                    "source_website" : "source_website",
                };
                bots = rows.map(row => {
                    const mappedRow = {};
                    for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                        mappedRow[mappedColumn] = row[dbColumn];
                    }
                    return mappedRow;
                });
            }

            // Query the total count using the retry logic
            const [{ totalCount }] = await queryWithRetry(`SELECT count(1) as totalCount FROM Bot_tbl`);
            const totalPages = Math.ceil(totalCount / limit);
            return {
                bots,
                totalPages
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return { news: [], totalPages: 0 };
        }
    }


    static async getAllBots() {
        try {
            const rows = await queryWithRetry(`SELECT * FROM Bot_tbl`);
            
            let bots = [];
            if (rows.length > 0) {
                const columnMapping = {
                    'bot_id': 'bot_id',
                    'bot_token': 'bot_token',
                    'bot_username': 'bot_username',
                    'bot_name': 'bot_name',
                    'channel_Id': 'channel_Id',
                    'channel_name': 'channel_name',
                };
                bots = rows.map(row => {
                    const mappedRow = {};
                    for (const [dbColumn, mappedColumn] of Object.entries(columnMapping)) {
                        mappedRow[mappedColumn] = row[dbColumn];
                    }
                    return mappedRow;
                });
            }
            return bots;
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        }
    }
}

export default BotsModel;
