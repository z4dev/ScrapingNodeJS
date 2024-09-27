import axios from 'axios';
import * as cheerio from 'cheerio';
import { queryWithRetry } from '../config/dbConfig.js';  // Import queryWithRetry function
import { SOURCES } from '../helpers/constants.js'; 



const scrapeAndInsert = async (url) => {
    try {
        console.log(url);
        const sourceConfig = SOURCES.find(source => source.url === url);
        console.log(sourceConfig);
        if (!sourceConfig) {
            throw new Error('No source configuration found for the provided URL');
        }

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const newsArray = [];

        // Function to process each element
     // Function to process each element
const processElement = async (element) => {
    let title;

    // Logic to handle SOURCES[0].url (existing logic)
    if (url === SOURCES[0].url) {
        title = $(element).find(sourceConfig.title).attr('aria-label').trim();
    } 
    // Logic for other sources
    else {
        title = $(element).find(sourceConfig.title).text().trim();
        console.log(title);
    }

    let articleUrl = $(element).find(sourceConfig.articleUrl).attr('href');
    
    if (articleUrl && articleUrl.startsWith('/')) {
        articleUrl = `https://arabic.rt.com${articleUrl}`; 
    }

    // Attempt to retrieve the date, if not found, set it to the current date
    let date = $(element).find(sourceConfig.date).text().trim();
    if (!date) {
        date = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });  // Default to current date
    }

    // General image extraction logic (existing logic)
    let image = $(element).find(sourceConfig.image).attr('src') || $(element).find(sourceConfig.image).attr('data-src');


    if (image && (image.startsWith('data:image/svg+xml') || image.includes('base64'))) {
        image = $(element).find('a.post-thumb img').attr('data-srcset') || null;
    }

    
    if (!image && sourceConfig.imageStyle) {
        const divStyle = $(element).find(sourceConfig.imageStyle).attr('style');
        const urlRegex = /url\(["']?(.*?)["']?\)/;
        const match = divStyle ? divStyle.match(urlRegex) : null;
        image = match ? match[1] : null;
    }

    // Query the database to check if the article already exists
    const rows = await queryWithRetry('SELECT * FROM news_tbl WHERE url = ?', [articleUrl]);
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

        const insertedCount = await insertNewsBatch(newsArray);
        return { isFetching: true, newsCount: insertedCount };

    } catch (error) {
        console.error('Error while fetching or processing data:', error);
        return { isFetching: false, newsCount: 0 };
    }
};

const insertNewsBatch = async (newsArray) => {
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
        // Insert news data using queryWithRetry
        const result = await queryWithRetry(query, [values]);
        return newsArray.length;
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        return 0;
    }
};

export default scrapeAndInsert;
