import express from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../Controllers/Admin.controllers.js';

const router = express.Router();

// Route to create a new Admin
router.get('/', getAdmins);

// Route to get all Admin
router.get('/Creport', createAdmin);

// Route to update a Admin by ID
router.put('/:id', updateAdmin);

// Route to delete a Admin by ID
router.delete('/:id', deleteAdmin);

export default router;