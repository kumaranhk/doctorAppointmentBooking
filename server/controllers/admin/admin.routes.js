import express from 'express';
import upload from "../../middlewares/multer.js";
import adminController from './admin.controller.js'
import { isAdmin } from '../../middlewares/authorization.js';

const adminRouter = express.Router();

adminRouter.post('/doctor',isAdmin,upload.single('image'),adminController.createDoctor);
adminRouter.post('/login',adminController.adminLogin);
export default adminRouter;