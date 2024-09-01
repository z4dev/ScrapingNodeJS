import mysql from 'mysql';
import { Telegraf } from 'telegraf';

// Configuration
const TELEGRAM_BOT_TOKEN = '7358343640:AAHYDLwlEpPRPS3fQX1poSmG27S-M4NMwV8'; // Replace with your bot token
const TELEGRAM_CHANNEL_ID = '@ziad_tech_news'; // Replace with your channel ID or username (with @)
const DB_HOST = 'localhost'; // Database host
const DB_USER = 'root'; // Database user
const DB_PASSWORD = ''; // Database password
const DB_NAME = 'news'; // Database name

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

// Function to fetch specific news from the database by ID
 const fetchNewsById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM news_tbl WHERE id = ?`;
    connection.query(sql, [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]); // Assuming 'id' is unique, we return the first result
    });
  });
};

const updateNewsToPublished = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE news_tbl SET is_published = 1 WHERE id = ?`;
    connection.query(sql, [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.affectedRows > 0);
    });
  });
};

// Function to send the post to the Telegram channel
export default async (id) => {
    try {
        // Fetch the news by ID
        const news = await fetchNewsById(id);
        if (!news) {
        throw new Error(`News with ID ${id} not found.`);
        }
    
        // Initialize the Telegram bot
        const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    
        // Send the post to the Telegram channel
        const message = `
        *${news.title}*
        ${news.date}
        ![Image](${news.image})
        Read more: ${news.url}
        `;
        await bot.telegram.sendMessage(TELEGRAM_CHANNEL_ID, message, { parse_mode: 'Markdown' });
        await updateNewsToPublished(id);
        console.log("message", message);
        console.log(`Post with ID ${id} sent to Telegram.`);
        
        return true;
    } catch (error) {
        console.error('Error sending post to Telegram:', error);
        return false;
    }
};




