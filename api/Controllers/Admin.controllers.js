import Admin from '../Models/Admin.models.js';
import { errorHandler } from '../utils/error.js';

// Create a new Admin
export const createAdmin = async (req, res, next) => {
    const { data } = req.query;

    // Check if 'data' query parameter is provided
    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [adminId, username, phone, email, access] = data.split(',');

    // Check if all required fields are provided
    if (!adminId || !username || !phone || !email|| !access) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const newAdmin = new Admin({
        adminId,
        username: String(username),
        phone: Number(phone),
        email: String(email),
        access: String(access),
    });

    try {
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all Admins
export const getAdmins = async (req, res, next) => {
    try {
        const Admins = await Admin.find();
        res.status(200).json(Admins);
    } catch (error) {
        next(error);
    }
};

// Update a Admin by ID
export const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
    const { adminId, username, phone, email, access } = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            {adminId, username, phone, email, access },
            { new: true } // Return the updated document
        );

        if (!updatedAdmin) return next(errorHandler(404, 'Admin not found'));
        res.status(200).json(updatedAdmin);
    } catch (error) {
        next(error);
    }
};

// Delete a Admin by ID
export const deleteAdmin = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) return next(errorHandler(404, 'Admin not found'));
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        next(error);
    }
};
