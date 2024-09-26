import mongoose from "mongoose";

const CreportSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  datetime: { type: Date, default: Date.now },
  tds: { type: Number, required: true },
  litersRemaining: { type: Number, required: true },
  cost: { type: Number, required: true },
  currentPlan: { type: Number, required: true },
  totalLiters: { type: Number, required: true },
  status: { type: String, required: true },
},
{
    timestamps: true
}
);

const ReportData = mongoose.model('Creport', CreportSchema);

export default Creport;