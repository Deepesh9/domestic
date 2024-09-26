import mongoose from "mongoose";

const CdeviceInfoSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  plans: { type: Number, required: true },
  expiry: { type: Number, required: true },
},
{
    timestamps: true
}
);

const ReportData = mongoose.model('CdeviceInfo', CdeviceInfoSchema);

export default CdeviceInfo;