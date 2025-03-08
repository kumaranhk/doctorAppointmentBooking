import express from "express";
import doctorRouter from "../controllers/doctor/doctor.routes.js";
import adminRouter from "../controllers/admin/admin.routes.js";
const router = express.Router();

router.use('/doctor',doctorRouter);
router.use('/admin',adminRouter);

export default router;