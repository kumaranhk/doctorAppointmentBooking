import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnect = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  } catch (error) {
    console.log("Error while connecting to cloudinary");
  }
};
export default cloudinaryConnect;