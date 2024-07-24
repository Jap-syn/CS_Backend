import { Router } from 'express';
import { loginUser,logoutUser, createUser } from '../controllers/userController';

const router = Router();

router.post('/login', loginUser);
router.post('/register', createUser);
router.post('/logout', logoutUser);

export default router;
