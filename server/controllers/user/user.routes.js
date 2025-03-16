import express from "express";
import userController from "./user.controller.js";
import { authorization, authorizeRoles, isAdmin } from "../../middlewares/authorization.js";
import userController2 from "./user.controller.2.js";
import upload from "../../middlewares/multer.js";


const userRouter = express.Router();

userRouter.post('/',upload.single('image'),userController2.createUser);
userRouter.post('/login',userController2.login);
userRouter.put('/:id',upload.single('image'),authorization,userController2.update);
userRouter.delete('/:id',authorization,authorizeRoles(['admin']),userController2.reomve)
userRouter.get('/:id?',userController2.getUser);

export default userRouter;