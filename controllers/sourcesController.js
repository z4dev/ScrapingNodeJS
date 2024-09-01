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
       const data = await scrapeAndInsert();
  

    return res.json(data);   
    
    }
};

export default sourcesController;
