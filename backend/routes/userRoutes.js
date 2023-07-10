import express from 'express';
const router = express.Router();
import * as controller from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


router.post('/auth',controller.authUser)
router.post('/',controller.registerUser)
router.post('/logout',controller.logoutUser)
router.get('/profile',protect, controller.getUserProfile)
router.put('/profile',protect, controller.updateUserProfile)

export default router