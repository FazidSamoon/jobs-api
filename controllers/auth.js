import UserModel from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request.js";
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credintial");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credintial");
  }
  const token = Jwt.sign(
    { userID: user._id, name: user.username },
    process.env.JWT_WEB_TOKEN,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
};

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new BadRequestError("Please provide username and password");
  }

  //method 1 implementing the hashing function inside the user model
  const user = await UserModel.create({ ...req.body });

  //method 2 implementing the hashing function inside the controller

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { username, email, password: hashedPassword };
  // const user = await UserModel.create({ ...tempUser })
  //   .then(() => console.log("user creation success"))
  //   .catch((err) => console.log(err));

  const token = Jwt.sign(
    { userID: user._id, name: user.username },
    process.env.JWT_WEB_TOKEN,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username }, token });
};
