import express from "express";
import doctorRouter from "../controllers/doctor/doctor.routes.js";
import adminRouter from "../controllers/admin/admin.routes.js";
import userRouter from "../controllers/user/user.routes.js";
import appointmentRouter from "../controllers/appointment/appointment.routes.js";
const router = express.Router();

router.use('/doctors',doctorRouter);
router.use('/admin',adminRouter);
router.use('/users',userRouter);
router.use('/appointments',appointmentRouter);

export default router;