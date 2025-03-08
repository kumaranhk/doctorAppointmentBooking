import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongooseConnect from "./configs/mongoose-connect.js";
import cloudinaryConnect from "./configs/cloudinary.js";
import router from "./routes/routes.js";

dotenv.config();

//app configs
const app = express();
const PORT = process.env.PORT;
mongooseConnect();
cloudinaryConnect();

//middlewares
app.use(express.json());
app.use(cors());

//endpoints
app.use('/api',router);
app.get("/", (req, res) => {
  res.json({ msg: "Server is running" });
});

app.listen(PORT, () => {
  console.log("Server listening in the port", PORT);
});
