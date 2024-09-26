import express from 'express';
import { getCreports, getCreport, updateCreport, deleteCreport } from '../Controllers/Creport.controllers';

const router = express.Router();

// Route to create a new report
router.get('/', getCreports);

// Route to get all report
router.get('/Creport', getCreport);

// Route to update a report by ID
router.put('/:id', updateCreport);

// Route to delete a report by ID
router.delete('/:id', deleteCreport);

export default router;