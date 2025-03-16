import express from 'express';
import adminController from './admin.controller.js'
import { authorization, authorizeRoles } from '../../middlewares/authorization.js';

const adminRouter = express.Router();
adminRouter.use(authorization);
adminRouter.use(authorizeRoles(['admin']));

adminRouter.get('/dashboardStats',adminController.dashboardStats);
export default adminRouter;