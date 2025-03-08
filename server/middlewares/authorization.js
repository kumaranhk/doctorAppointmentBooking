import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

export const isAdmin = async (req, res, next) => {
    const {authorization} = req.headers;
  try {
    if(!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({msg : ReasonPhrases.UNAUTHORIZED});
    const [ _, access_token ] = authorization.split(' ');
    const user = jwt.verify(access_token,process.env.JWT_SECRET);
    if(user.email !== process.env.ADMIN_EMAIL) return res.status(StatusCodes.UNAUTHORIZED).json({msg : ReasonPhrases.UNAUTHORIZED});

    next();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};
