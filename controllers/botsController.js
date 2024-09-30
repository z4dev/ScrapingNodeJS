import botsModel from '../models/BotsModel.js';

const botsController = {

    async bots_get(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 10;
        let { bots, totalPages } = await botsModel.getBots(page, limit);
        
        res.render('bots', {
            layout: 'layouts/main-layout',
            route: 'bots',
            title: 'البوتات',
            bots: bots,
            currentPage: page,
            totalPages: totalPages,

        });
    },

   
};

export default botsController;
