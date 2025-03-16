import jwt from "jsonwebtoken";
import 'dotenv/config';

const generateJWT = (data) => {
  // console.log(data, "data");
  let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '120m' });
  return token;
};

const verifyJWT = (token) => {
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user ;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export { generateJWT, verifyJWT };