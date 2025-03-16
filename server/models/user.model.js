import mongoose from "mongoose";
import { assets } from "../constants/constant.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: assets.dp },
    address: { type: String, default: "" },
    gender: { type: String, default: "Not selected" },
    birthday: { type: String, default: "Not selected" },
    phone: { type: String, default: "" },
    role: { type: String, default: 'patient' },
    specialization: { type: String, required: false,},
    experience: { type: Number, required: false },
    degree: { type: String, required: false },
    // availability: [{ type: mongoose.Schema.Types.ObjectId, ref: "Availability" }],
    fees: { type: Number, required: false },
  },
  { timestamps: true }
);

const userModel = mongoose.models.users || mongoose.model("User", userSchema, "users");

export default userModel;

// name : 'Dr.Ricahrd James',email : 'richard@gmail.com',password : 'kums',address : 'USA Kurukku street',role : 'doctor'
