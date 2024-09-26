import express from 'express';
import { getCdeviceInfos, getCdeviceInfo, updateCdeviceInfo, deleteCdeviceInfo } from '../Controllers/CdeviceInfo.controllers';

const router = express.Router();

// Route to create a new device info
router.get('/', getCdeviceInfos);

// Route to get all device info
router.get('/CdeviceInfo', getCdeviceInfo);

// Route to update a device
router.put('/:id', updateCdeviceInfo);

// Route to delete a device info
router.delete('/:id', deleteCdeviceInfo);

export default router;