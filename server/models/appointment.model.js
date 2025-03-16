import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  cancelledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
},
  { timestamps: true }
);

const appointmentModel = mongoose.model('Appointment',AppointmentSchema,'appointments');
export default appointmentModel;
