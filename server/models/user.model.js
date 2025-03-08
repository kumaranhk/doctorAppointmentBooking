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
  },
  { timestamps: true }
);

const userModel =
  mongoose.models.users || mongoose.model("User", userSchema, "users");

export default doctorModel;
