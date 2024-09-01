import sourcesModel from '../models/SourcesModel.js';

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
};

export default sourcesController;
