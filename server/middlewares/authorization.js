import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import { verifyJWT } from "../utils/jwt.js";

export const isAdmin = async (req, res, next) => {
    const {authorization} = req.headers;
  try {
    if(!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({msg : ReasonPhrases.UNAUTHORIZED});
    const [ _, access_token ] = authorization.split(' ');
    const user = verifyJWT(access_token);
    if(user.role !== 'admin') return res.status(StatusCodes.UNAUTHORIZED).json({msg : 'User not authorized'});
    next();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export const authorization = (req,res,next) => {
  const {authorization} = req.headers;
  try {
    if(!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({msg : ReasonPhrases.UNAUTHORIZED});
    const [ _, access_token ] = authorization.split(' ');
    const user = verifyJWT(access_token);
    if (!user){
      return res.status(StatusCodes.UNAUTHORIZED).json({msg : ReasonPhrases.UNAUTHORIZED});
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
}

export const authorizeRoles = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};
