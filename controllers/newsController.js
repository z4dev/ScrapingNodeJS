import newsModel from '../models/NewsModel.js';

const newsController = {

    async news_get(req, res) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 10;
        let { news, totalPages } = await newsModel.getNews(page, limit);
        
        res.render('news', {
            layout: 'layouts/main-layout',
            route: 'news',
            title: 'الأخبار',
            news: news,
            currentPage: page,
            totalPages: totalPages
        });
    },
};

export default newsController;
