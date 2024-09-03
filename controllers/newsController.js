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
        const postAll = req.query.all === 'true';

        if (postAll) {
            const allNews = await newsModel.getNews(); 
            if (!allNews || allNews.length === 0) {
                return res.json({ success: false, message: 'No news to post' });
            }

            let success = true;
            for (const news of allNews) {
                const posted = await sendPostToTelegram(news.id);
                if (!posted) {
                    success = false;
                    break;
                }
            }

            return res.json({ success: success, message: success ? 'All news posted to Telegram successfully' : 'Failed to post all news to Telegram' });
        }

        const news = await newsModel.getNewsById(id);
        if (!news) {
            return res.json({ success: false, message: 'News not found' });
        }

        const posted = await sendPostToTelegram(id);
        if (posted) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false, message: 'Failed to post to Telegram' });
        }
    }
};

export default newsController;
