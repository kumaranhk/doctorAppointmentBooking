import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: String, required: true },
    slots_booked: { type: Object, required: true, default: {} },
  },
  { minimize: false, timestamps: true }
);

const doctorModel = mongoose.models.doctors || mongoose.model("Doctor", doctorSchema, "doctors");

export default doctorModel;
