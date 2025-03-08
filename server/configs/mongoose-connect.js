import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongooUrl = process.env.DB_URL;

const mongooseConnect = async () => {
  // console.log(mongooUrl);
  try {
    await mongoose.connect(mongooUrl);
    console.log("Mongoose connection established");
  } catch (error) {
    console.log("Error while connecting to mongoose");
    process.exit(1);
  }
};
export default mongooseConnect;