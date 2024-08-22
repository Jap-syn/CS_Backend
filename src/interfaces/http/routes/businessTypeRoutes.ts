import { Router } from 'express';
import { createBusinessType, getBusinessTypes, getBusinessType, updateBusinessType, deleteBusinessType } from '../controllers/businessTypeController';

const router = Router();

router.post('/', createBusinessType);
router.get('/', getBusinessTypes);
router.get('/:id', getBusinessType);
router.put('/:id', updateBusinessType);
router.delete('/:id', deleteBusinessType);

export default router;
