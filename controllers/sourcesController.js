import sourcesModel from '../models/SourcesModel.js';
import scrapeAndInsert from '../utils/scrapData.js';
import { SOURCES } from '../helpers/constants.js';


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

            if (!url) {
                let totalNewsCount = 0;
                for (const source of SOURCES) {
                    const data = await scrapeAndInsert(source.url);
                    totalNewsCount += data.newsCount || 0;
                }
                return res.json({ isFetching: totalNewsCount > 0, newsCount: totalNewsCount });
            }


            // Attempt to scrape and insert data
            const data = await scrapeAndInsert(url);

            // Check if data was successfully scraped
            if (!data || data.length === 0) {
                console.warn(`No data scraped from URL: ${url}`);
                return res.status(404).json({ error: 'No data found for the provided URL.' });
            }

            return res.json(data);

        } catch (error) {
            console.error('Error in sources_scrap:', error);

            if (error.response && error.response.status === 404) {
                return res.status(404).json({ error: 'The requested URL was not found.' });
            }

            return res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }
    
    
    
};


export default sourcesController;
