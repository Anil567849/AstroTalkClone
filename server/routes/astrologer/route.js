import express from 'express';
const router = express.Router();
import RouteController from '../../controllers/astrologer/routeController.js';
import AuthMiddleware from '../../middlewares/astrologer/authMiddleware.js';

router.get('/home', AuthMiddleware.checkAuthentication, RouteController.home);
router.post('/callToUser', AuthMiddleware.checkAuthentication, RouteController.callToUser);
router.post('/saveCallData', AuthMiddleware.checkAuthentication, RouteController.saveCallData);
router.post('/addCallRequest', AuthMiddleware.checkAuthentication, RouteController.addCallRequest);
router.post('/deleteCallRequest', AuthMiddleware.checkAuthentication, RouteController.deleteCallRequest);
router.post('/getCallRequests', AuthMiddleware.checkAuthentication, RouteController.getCallRequests);
router.post('/fetchAllChatUser', AuthMiddleware.checkAuthentication, RouteController.fetchAllChatUser);
router.post('/fetchAllChats', AuthMiddleware.checkAuthentication, RouteController.fetchAllChats);
router.post('/addChat', AuthMiddleware.checkAuthentication, RouteController.addChat);

export default router;