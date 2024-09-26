import express from 'express';
import { getCtransactions, getCtransaction, updateCtransaction, deleteCtransaction } from '../Controllers/Ctransaction.controllers';

const router = express.Router();

// Route to create a new transaction

router.get('/', getCtransactions);

// Route to get all transaction
router.get('/Ctransaction', getCtransaction);

// Route to update a transaction by ID
router.put('/:id', updateCtransaction);

// Route to delete a transaction by ID
router.delete('/:id', deleteCtransaction);

export default router;