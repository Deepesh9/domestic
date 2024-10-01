import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  adminId: { type: Number, required: true },
  username: { type: String, default: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  access: { type: String, required: true },
},
{
    timestamps: true
}
);

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;