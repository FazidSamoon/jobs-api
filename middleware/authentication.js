import Jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import UserModel from "../models/User.js";

export const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = Jwt.verify(token, process.env.JWT_WEB_TOKEN);
    const {userID , name} = decode
    req.user = { userId: userID, username: name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authorized to access this route");
  }
};
