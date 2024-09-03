import sourcesModel from '../models/SourcesModel.js';
import scrapeAndInsert from '../utils/scrapData.js';

const sourcesController = {

    async sources_get(req, res) {
        let sources = await sourcesModel.getSources();
        res.render('sources', {
            layout: 'layouts/main-layout',
            route: 'sources',
            title: 'المصادر',
            sources: sources
        });
    },

    async sources_scrap(req, res) {
        try {
            const { url } = req.query;
    
            // Check if URL is provided
            if (!url) {
                return res.status(400).json({ error: 'URL is required' });
            }
    
            console.log(`Starting scrape for URL: ${url}`);
    
            // Attempt to scrape and insert data
            const data = await scrapeAndInsert(url);
    
            // Check if data was successfully scraped
            if (!data || data.length === 0) {
                console.warn(`No data scraped from URL: ${url}`);
                return res.status(404).json({ error: 'No data found for the provided URL.' });
            }
    
            console.log(`Successfully scraped data from URL: ${url}`);
            return res.json(data);
    
        } catch (error) {
            // Log the error details
            console.error('Error in sources_scrap:', error);
    
            // Determine if it's a client or server error
            if (error.response && error.response.status === 404) {
                return res.status(404).json({ error: 'The requested URL was not found.' });
            }
    
            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }
    
    
    
};


export default sourcesController;
