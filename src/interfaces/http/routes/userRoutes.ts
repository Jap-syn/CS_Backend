import { Router } from 'express';
import { loginUser, createUser, getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
