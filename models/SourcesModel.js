import mysql from 'mysql2/promise';
import dbConfig from '../config/dbConfig.js';

// Define the User model
class SourcesModel {
    
    static async getSources() {
      const connection = await mysql.createConnection(dbConfig.newsTechDBConfig);
      try {
          // Retrieve all rows from the sources_tbl
          const [rows] = await connection.execute('SELECT * FROM sources_vw');
          
          if (rows.length > 0) {
              // Define your column mapping here
              const columnMapping = {
                  'id': 'source_id',
                  'name': 'source_name',
                  'url' : 'source_url',
                  'news_count' : 'news_count'
              };
  
              // Iterate over each row and apply the column mapping
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
          await connection.end();
      }
    }
}
export default SourcesModel;