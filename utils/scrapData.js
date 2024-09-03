import axios from 'axios';
import * as cheerio from 'cheerio';
import pool from '../config/dbConfig.js';
import { SOURCES } from '../helpers/constants.js'; 

const scrapeAndInsert = async (url) => {
    let connection;
    try {
        const sourceConfig = SOURCES.find(source => source.url === url);
        if (!sourceConfig) {
            throw new Error('No source configuration found for the provided URL');
        }

        connection = await pool.getConnection(); 

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const newsArray = [];

        // Function to process each element
        const processElement = async (element) => {
            let title;
            if (url === SOURCES[0].url) {
                title = $(element).find(sourceConfig.title).attr('aria-label').trim();
            } else {
                title = $(element).find(sourceConfig.title).text().trim();
            }

            const articleUrl = $(element).find(sourceConfig.articleUrl).attr('href');

            // Attempt to retrieve the date, if not found, set it to the current date
            let date = $(element).find(sourceConfig.date).text().trim();
            if (!date) {
                date = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });  // Default to current date
            }

            let image = $(element).find(sourceConfig.image).attr('src') || $(element).find(sourceConfig.image).attr('data-src');
            console.log(`Processing article: ${title}`);

            if (!image && sourceConfig.imageStyle) {
                const divStyle = $(element).find(sourceConfig.imageStyle).attr('style');
                const urlRegex = /url\(["']?(.*?)["']?\)/;
                const match = divStyle ? divStyle.match(urlRegex) : null;
                image = match ? match[1] : null;
            }

            const [rows] = await connection.query('SELECT * FROM news_tbl WHERE url = ?', [articleUrl]);
            if (rows.length > 0) {
                console.log(`Article with URL ${articleUrl} already exists in the database.`);
            } else {
                // Add the new article to the newsArray
                newsArray.push({
                    title: title || "No title",
                    date: date,  // Use either the scraped date or the default date
                    image: image || "No image",
                    url: articleUrl,
                    keywords: '',  
                    source_id: sourceConfig.source_id  
                });
            }
        };
        
        

        const elements = $(sourceConfig.selector).toArray();

        for (const element of elements) {
            await processElement(element);
        }


        if (newsArray.length === 0) {
            return { isFetching: false, newsCount: 0 };
        }

        const insertedCount = await insertNewsBatch(connection, newsArray);
        return { isFetching: true, newsCount: insertedCount };

    } catch (error) {
        console.error('Error while fetching or processing data:', error);
        return { isFetching: false, newsCount: 0 };
    } finally {
        if (connection) {
            connection.release();  
        }
    }
};

const insertNewsBatch = async (connection, newsArray) => {
    if (newsArray.length === 0) {
        return 0;
    }

    const query = 'INSERT INTO news_tbl (title, date, image, url, keywords, source_id) VALUES ?';
    const values = newsArray.map(news => [
        news.title,
        news.date,
        news.image,
        news.url,
        news.keywords,
        news.source_id
    ]);

    try {
        const [result] = await connection.query(query, [values]);
        return newsArray.length;
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        return 0;
    }
};

export default scrapeAndInsert;
