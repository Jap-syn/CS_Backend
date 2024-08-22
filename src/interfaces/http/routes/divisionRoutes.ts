import { Router } from 'express';
import { createDivision, getDivisions, getDivision, updateDivision, deleteDivision } from '../controllers/divisionController';

const router = Router();

router.post('/', createDivision);
router.get('/', getDivisions);
router.get('/:id', getDivision);
router.put('/:id', updateDivision);
router.delete('/:id', deleteDivision);

export default router;
