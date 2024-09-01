import newsModel from '../models/NewsModel.js';
import sendPostToTelegram from '../utils/sendPostToTelegram.js';

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
            totalPages: totalPages,
            is_published : news.is_published

        });
    },

    async share_telegram(req, res) {
        const { id } = req.params;
        const posted = await sendPostToTelegram(id);
        if (posted) 
          return res.json({ success: true });
        else
        return res.json({ success: false, message: 'Failed to post to Telegram' });

        
     
      
    }
};

export default newsController;
