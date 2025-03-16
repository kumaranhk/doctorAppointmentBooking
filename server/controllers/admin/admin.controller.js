import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model.js";
import appointmentModel from "../../models/appointment.model.js";

const adminController = {
  dashboardStats: async (req, res) => {
    try {
      const totalDoctors = (await userModel.find({ role: 'doctor' })).length;
      const totalPatients = (await userModel.find({ role: 'patient' })).length;
      const totalAppointments = (await appointmentModel.find()).length;
      const cancelledAppointments = (await appointmentModel.find({status : 'cancelled'})).length;
      const completedAppointments = (await appointmentModel.find({status : 'completed'})).length;
      console.log({ totalAppointments, totalDoctors, totalPatients })
      res.json({ totalAppointments, totalDoctors, totalPatients });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
      console.log(error);
    }
  }
};

export default adminController;
