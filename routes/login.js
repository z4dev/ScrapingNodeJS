// routes/index.js
import express from 'express';
const router = express.Router();

import loginController from '../controllers/loginController.js';

// Auth routes
router.get('/', loginController.login_get);
router.post('/', loginController.login_post);
router.get('/logout', loginController.logout_get);

export default router;
