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



export default async (id) => {
    try {
        // Fetch the news by ID
        const news = await fetchNewsById(id);
        if (!news) {
            throw new Error(`News with ID ${id} not found.`);
        }

        // Initialize the Telegram bot
        const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

        // Send the image to the Telegram channel
        if (news.image) {
            await bot.telegram.sendPhoto(TELEGRAM_CHANNEL_ID, news.image, {
                caption: `*${news.title}*\n\n\n${news.date}\n[Read more](${news.url})`,
                parse_mode: 'Markdown',
            });
        } else {
            // If there's no image, send just the message
            const message = `
            *${news.title}*
            ${news.date}
            Read more: ${news.url}
            `;
            await bot.telegram.sendMessage(TELEGRAM_CHANNEL_ID, message, { parse_mode: 'Markdown' });
        }

        await updateNewsToPublished(id);
        console.log(`Post with ID ${id} sent to Telegram.`);
        
        return true;
    } catch (error) {
        console.error('Error sending post to Telegram:', error);
        return false;
    }
};




