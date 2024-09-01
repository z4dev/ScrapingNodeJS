// routes/index.js
import express from 'express';
const router = express.Router();

import homeController from '../controllers/homeController.js';
import sourcesController from '../controllers/sourcesController.js';
import newsController from '../controllers/newsController.js';

// Home routes
router.get('/home', homeController.home_get);
router.get('/sources', sourcesController.sources_get);
router.get('/news', newsController.news_get);

export default router;
