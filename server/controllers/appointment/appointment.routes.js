import express from "express";
import appointmentController from "./appointment.controller.js";
import { authorization, authorizeRoles } from "../../middlewares/authorization.js";

const appointmentRouter = express.Router();
appointmentRouter.use(authorization);

appointmentRouter.post('/',appointmentController.createAppointment);
appointmentRouter.get('/trends',authorizeRoles(['admin']),appointmentController.trends);
appointmentRouter.get('/bookedSlots',appointmentController.bookedSlots);
appointmentRouter.get('/:id?',appointmentController.getAppointment);
appointmentRouter.put('/:id',appointmentController.update);

export default appointmentRouter;