import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model.js";
import doctorModel from "../../models/doctor.model.js"
import { generateJWT } from "../../utils/jwt.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const userController = {
    createUser: async (req, res) => {
        const  body  = req.body;
        const imageFile = req.file;
        const isDoctor = req?.query?.isDoctor === 'true';
        console.log(body,imageFile);
        try {
            let user = await userModel.findOne({ email: body.email });
            // console.log(user)
            if (user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User already registered' });
            //uploading image to cloud
            const uploadResult = await cloudinary.uploader
                .upload(imageFile.path, { resorceType: "image" })
                .catch((error) => {
                    console.log("Error while uploading the image", error);
                });
            console.log(uploadResult);
            // user = await userModel.create({ email: body.email, name: body.name, password: body.password, phone: body.phone, role: body.role });
            user = await userModel.create({ ...body, image: uploadResult });
            console.log(user, 'usercreared');
            if (body.role === 'doctor') {
                await doctorModel.create({ userId: user._id, specialization: body.specialization, experience: body.experience, qualifications: body.qualifications, fees: body.fees, degree: body.degree })
            }
            res.status(StatusCodes.CREATED).json({ msg: 'User craeted successfully' })

        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    login: async (req, res) => {
        const { body } = req;
        try {
            let user = await userModel.findOne({ email: body.email }, { __v: 0 });
            if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User not yet registered' });
            if (user.password !== body.password) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid email or password' });
            user = await userModel.findOne({ email: body.email }, { name: 1, email: 1, _id: 1, role: 1 });
            console.log(user)
            const access_token = generateJWT({ user });
            res.status(StatusCodes.OK).json({ msg: 'User logged in successfully', user, access_token });
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    update: async (req, res) => {
        const { body } = req;
        const userFromToken = req.user;
        const { id } = req.params
        try {
            const user = await userModel.findOne({ _id: id });
            if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User not found' });
            await userModel.updateOne({ _id: userFromToken._id }, { $set: { ...body } });
            if (user.role == 'doctor') {
                console.log("requested user is a doctor");
                const doctor = await doctorModel.findOne({ userId: id });
                if (!doctor) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Doctor not found' });
                await doctorModel.deleteOne({ email: user.email });
            }
            res.status(StatusCodes.OK).json({ msg: 'User upadted successfully' });
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    reomve: async (req, res) => {
        const userFromToken = req.user;
        try {
            const user = await userModel.findOne({ _id: id });
            if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User not found' });
            await userModel.deleteOne({ _id: userFromToken._id });
            if (user.role == 'doctor') {
                console.log("requested user is a doctor");
                const doctor = await doctorModel.findOne({ email: user.email });
                if (!doctor) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Doctor not found' });
                await doctorModel.deleteOne({ email: user.email });
            }
            res.status(StatusCodes.OK).json({ msg: 'User upadted successfully' });
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        const isDoctor = req?.query?.isDoctor === 'true';
        const userFromToken = req.user;
        const specialization = req?.query?.specialization;

        // console.log(id, isDoctor, userFromToken);

        try {
            if (!isDoctor) {
                if (id) {
                    const user = await userModel.findOne({ _id: id }, { __v: 0, password: 0 });
                    return res.status(StatusCodes.OK).json(user);
                } else {
                    const users = await userModel.find({}, { __v: 0, password: 0 });
                    return res.status(StatusCodes.OK).json(users);
                }
            }
            else if (isDoctor && userFromToken.role === 'admin' || userFromToken.role === 'doctor') {
                let matchCondition = {};

                if (id) matchCondition.userId = new mongoose.Types.ObjectId(id);
                if (specialization) matchCondition.specialization = specialization;
                // console.log(matchCondition)

                const doctors = await doctorModel.aggregate([
                    {
                        $match: { ...matchCondition }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "userId",
                            foreignField: "_id",
                            as: "userDetails"
                        }
                    },
                    {
                        $unwind: '$userDetails'
                    },
                    {
                        $replaceRoot: { newRoot: { $mergeObjects: ["$userDetails", "$$ROOT"] } }
                    },
                    {
                        $project: { __v: 0, password: 0, userDetails: 0 }
                    }
                ]);

                if (id) {
                    return res.status(StatusCodes.OK).json(doctors[0] || {});
                }

                return res.status(StatusCodes.OK).json(doctors);
            }

            res.status(StatusCodes.FORBIDDEN).json({ msg: "Unauthorized" });

        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }

}

export default userController;