import Devices from '../Models/Devices.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Device
export const createDevices = async (req, res, next) => {
    const { deviceId, phone, access, curr_plan, status } = req.body;

    // Check if all required fields are provided
    if (!deviceId || !phone || !access || !curr_plan || !status) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newDevices = new Devices({
        deviceId,
        phone: Number(phone),
        access: String(access), 
        curr_plan: Number(curr_plan),
        status: String(status),
    });

    try {
        await newDevices.save();
        res.status(201).json({ message: "Device created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Devices
export const getDevicess = async (req, res, next) => {
    try {
        const devices = await Devices.find();
        res.status(200).json(devices);
    } catch (error) {
        next(error);
    }
};

// Update a Device by ID
export const updateDevices = async (req, res, next) => {
    const { id } = req.params;
    const { deviceId, phone, access, curr_plan, status } = req.body;

    try {
        const updatedDevice = await Devices.findByIdAndUpdate(
            id,
            { deviceId, phone, access, curr_plan, status },
            { new: true } // Return the updated document
        );

        if (!updatedDevice) return next(errorHandler(404, 'Device not found'));
        res.status(200).json(updatedDevice);
    } catch (error) {
        next(error);
    }
};

// Delete a Device by ID
export const deleteDevices = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedDevice = await Devices.findByIdAndDelete(id);
        if (!deletedDevice) return next(errorHandler(404, 'Device not found'));
        res.status(200).json({ message: "Device deleted successfully" });
    } catch (error) {
        next(error);
    }
};
