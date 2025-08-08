import express from 'express';
import {
  getJusers,
  getJuserById,
  createJuser,
  updateJuser,
  deleteJuser,
} from '../controllers/juser.controller.js';


const router = express.Router();


router.get('/', getJusers);
router.get('/:id', getJuserById);
router.post('/', createJuser);
router.put('/:id', updateJuser);
router.delete('/:id', deleteJuser);

export default router;
