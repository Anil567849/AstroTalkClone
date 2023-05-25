import express from 'express';
const router = express.Router();
import RouteController from '../controllers/routeController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

router.get('/', AuthMiddleware.checkAuthentication, RouteController.home);
router.get('/fetchAllAstrologer', AuthMiddleware.checkAuthentication, RouteController.fetchAllAstrologer);
router.post('/addChat', AuthMiddleware.checkAuthentication, RouteController.addChat);
router.post('/fetchAllChats', AuthMiddleware.checkAuthentication, RouteController.fetchAllChats);

export default router;