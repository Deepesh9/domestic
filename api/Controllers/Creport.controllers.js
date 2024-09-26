import Creport from '../Models/Creport.model.js';
import { errorHandler } from '../utils/error.js';
import moment from 'moment-timezone';

export const getReport = async (req, res, next) => {
    const { data } = req.query;

    if (!data) {
        return next(errorHandler(400, 'Data field must be provided'));
    }

    const [deviceId, tds, litersRemaining , cost, currentPlan, totalLiters, status] = data.split(',');

    if ( !deviceId || !tds || litersRemaining || cost || currentPlan || totalLiters || status) {
        return next(errorHandler(400, 'All required fields must be provided'));
    }

    const istDatetime = moment().tz('Asia/Kolkata').format(); // Get current date and time in IST

    const newReport = new Creport({
        deviceId,
        datetime: istDatetime, // Set the IST datetime
        tds: Number(tds),
        litersRemaining: Number(litersRemaining),
        cost: Number(cost),
        currentPlan: Number(currentPlan),
        totalLiters: Number(totalLiters),
        status: Number(status),
    });
    try {
        await newReport.save();
        res.status(201).json({ message: "Report created successfully" });
    } catch (error) {
        next(error);
    }
};

export const getReports = async (req, res, next) => {
    try {
        const reports = await Creport.find();
        res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
};

export const updateReport = async (req, res, next) => {
    const { id } = req.params;
    const { deviceId, tds, litersRemaining , cost, currentPlan, totalLiters, status } = req.body;

    try {
        const updatedReport = await Creport.findByIdAndUpdate(
            id,
            { deviceId, tds, litersRemaining , cost, currentPlan, totalLiters, status },
        );
        if (!updatedReport) return next(errorHandler(404, 'Report not found'));
        res.status(200).json(updatedReport);
    } catch (error) {
        next(error);
    }
};
export const deleteReport = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedReport = await Creport.findByIdAndDelete(id);
        if (!deletedReport) return next(errorHandler(404, 'Report not found'));
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        next(error);
    }
};