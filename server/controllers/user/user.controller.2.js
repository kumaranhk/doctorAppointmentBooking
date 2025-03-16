import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userModel from "../../models/user.model.js";
import doctorModel from "../../models/doctor.model.js";
import { generateJWT } from "../../utils/jwt.js";
import { v2 as cloudinary } from "cloudinary";
import { assets } from "../../constants/constant.js";
import bcrypt from 'bcrypt';

const userController2 = {
    createUser: async (req, res) => {
        const {
            name, email, password, specialization = null, degree = null, experience = null, about = null, isAvailable = null, fees = null,
            address = null, role, } = req.body;
        const imageFile = req.file;
        const isDoctor = req?.query?.isDoctor === 'true';
        console.log(imageFile);
        try {

            let user = await userModel.findOne({ email: email });
            // console.log(user)
            if (user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User already registered' });

            // uploading image to cloud
            let uploadResult = null;
            if (req.file) {
                uploadResult = await cloudinary.uploader
                    .upload(imageFile.path, { resorceType: "image" })
                    .catch((error) => {
                        console.log("Error while uploading the image", error);
                    });
                console.log(uploadResult);
            }

            //hashing password
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, });
                }
                else {
                    user = await userModel.create({
                        name, email, password : hashedPassword, specialization, degree, experience, about, isAvailable, fees, address, role,
                        image: uploadResult?.secure_url || assets.dp
                    });
                    console.log(user, 'user creared');
                    res.status(StatusCodes.CREATED).json({ msg: 'User craeted successfully' })
                }
            })

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
            const isPassMatch = await bcrypt.compare(body.password,user.password);
            if (!isPassMatch) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid email or password' });
            user = await userModel.findOne({ email: body.email }, { name: 1, email: 1, _id: 1, role: 1 });
            console.log(user,'Logged in user')
            const access_token = generateJWT({ user });
            res.status(StatusCodes.OK).json({ msg: 'User logged in successfully', user, access_token });
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    update: async (req, res) => {
        const { name, email, birthday, gender, address, phone } = req.body;
        console.log({
            name, email, address, birthday, gender, phone
        })
        const userFromToken = req.user;
        const { id } = req.params
        try {
            const user = await userModel.findOne({ _id: id });
            if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User not found' });
            await userModel.updateOne({ _id: id }, {
                $set: {
                    name, email, birthday, gender, address, phone
                }
            });
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
            res.status(StatusCodes.OK).json({ msg: 'User upadted successfully' });
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR, })
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        const specialization = req?.query?.specialization;
        const role = req?.query?.role;
        const { recordsPerPage = 10, page = 0 } = req.query;
        const skip = page * recordsPerPage;
        const matchCondition = {};
        if (specialization) matchCondition.specialization = specialization;
        if (role) matchCondition.role = role;
        let excludeForDoc = { password: 0, __v: 0, createdAt: 0, updatedAt: 0 };
        const excludeForPatient = {
            name: 1,
            email: 1,
            image: 1,
            address: 1,
            birthday: 1,
            gender: 1,
            phone: 1
        }
        try {
            if (id) {
                let user = await userModel.findOne({ _id: id }, { ...excludeForDoc });
                if (user.role == 'patient') {
                    user = await userModel.findOne({ _id: id }, { ...excludeForPatient });
                }
                return res.status(StatusCodes.OK).json(user || {});
            }
            const totalCount = await userModel.countDocuments(matchCondition);
            const users = await userModel.find({ ...matchCondition }, { __v: 0, password: 0, createdAt: 0, updatedAt: 0 }).skip(skip).limit(+recordsPerPage);
            return res.status(StatusCodes.OK).json({
                totalPages: Math.ceil(totalCount / recordsPerPage),
                currentPage: page,
                totalCount,
                data: users
            });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }

}

export default userController2;