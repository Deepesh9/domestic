import mongoose from "mongoose";

const CtransactionSchema = new mongoose.Schema({
  deviceId: { type: Number, required: true },
  datetime: { type: Date, default: Date.now },
  emailId: { type: Strinf, required: true },
  liters: { type: Number, required: true },
  cost: { type: Number, required: true },
  TXN_Id: { type: String, required: true },
},
{
    timestamps: true
}
);

const ReportData = mongoose.model('Ctransaction', CtransactionSchema);

export default Ctransaction;