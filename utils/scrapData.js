import axios from 'axios';
import * as cheerio from 'cheerio';
import pool from '../config/dbConfig.js';

const url = 'https://www.aitnews.com/';

const scrapeAndInsert = async () => {
    let connection;
    try {
        connection = await pool.getConnection();  // Get a connection from the pool
        console.log('Database connection established.');

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        console.log('Webpage content fetched successfully.');

        const newsArray = [];

        // Function to process each element
        const processElement = async (element) => {
            const title = $(element).find('a[aria-label]').attr('aria-label');
            const articleUrl = $(element).find('a').attr('href');
            const date = $(element).find('.date').text();
            let image = $(element).find('img').attr('src');
        
            if (!image) {
                const divStyle = $(element).find('.big-thumb-left-box-inner').attr('style');
                const urlRegex = /url\(["']?(.*?)["']?\)/;
                const match = divStyle ? divStyle.match(urlRegex) : null;
                image = match ? match[1] : null;
            }
        
            const [rows] = await connection.query('SELECT * FROM news_tbl WHERE url = ?', [articleUrl]);
            if (rows.length > 0) {
                console.log('This article already exists in the database:', title);
            } else {
                console.log('This article does not exist in the database:', title);
                // Add the new article to the newsArray
                newsArray.push({
                    title: title || "No title",  // Handle cases where the title might be undefined
                    date: date || "No date",    // Handle cases where the date might be undefined
                    image: image || "No image",  // Handle cases where the image might be undefined
                    url: articleUrl,
                    keywords: '',  // Add logic to extract keywords if needed
                    source_id: 1   // Assuming a static source_id, change as necessary
                });
            }
        };
        
        // Process elements for both classes
        const elements = $('.post-item, .tie-video').toArray();
        console.log('Number of elements found:', elements.length);

        for (const element of elements) {
            await processElement(element);
        }

        console.log('Total new articles to insert:', newsArray.length);

        // Check if there's data to insert
        if (newsArray.length === 0) {
            console.log('No new articles to insert.');
            return { isFetching: false, newsCount: 0 };
        }

        // Insert the news data into the database
        const insertedCount = await insertNewsBatch(connection, newsArray);

        console.log('Insert operation completed. Inserted count:', insertedCount);
        return { isFetching: true, newsCount: insertedCount };

    } catch (error) {
        console.error('Error while fetching or processing data:', error);
        return { isFetching: false, newsCount: 0 };
    } finally {
        if (connection) {
            connection.release();  // Release the connection back to the pool
            console.log('Database connection closed.');
        }
    }
};

// Function to insert news data into the database in batch
const insertNewsBatch = async (connection, newsArray) => {
    if (newsArray.length === 0) {
        console.log('No data to insert.');
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
        console.log('Batch insert successful:', result);
        return newsArray.length;
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        return 0;
    }
};

export default scrapeAndInsert;
