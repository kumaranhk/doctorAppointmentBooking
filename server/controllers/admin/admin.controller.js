import { ReasonPhrases, StatusCodes } from "http-status-codes";
import doctorModel from "../../models/doctor.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const adminController = {
  createDoctor: async (req, res) => {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      isAvailable,
      fees,
      address,
      slots_booked,
    } = req.body;
    const imageFile = req.file;
    try {
      if (
        !name ||
        !email ||
        !password ||
        !speciality ||
        !degree ||
        !experience ||
        !about ||
        !isAvailable ||
        !fees ||
        !address ||
        !slots_booked
      ) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Some of the details missing" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      //upload image to cloudinary
      const uploadResult = await cloudinary.uploader
        .upload(imageFile.path, { resorceType: "image" })
        .catch((error) => {
          console.log("Error while uploading the image", error);
        });
      console.log(uploadResult);

      const doctor = await doctorModel.create({
        name,
        email,
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        isAvailable,
        fees,
        address,
        slots_booked,
        image : uploadResult.secure_url
      });

      res.status(StatusCodes.CREATED).json({ msg: ReasonPhrases.CREATED });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },
  adminLogin : async (req,res) => {
    const {email,password} = req.body;
    try {
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const access_token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn : '120m'});
            res.status(StatusCodes.OK).json({access_token});
        }
        else{
            res.status(StatusCodes.UNAUTHORIZED).json({msg : ReasonPhrases.UNAUTHORIZED});
        }
    } catch (error) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  } 
};

export default adminController;
