import Express from "express";
const authRoute = Express.Router();
import { login, registerUser } from "../controllers/auth";

authRoute.post("/", login);
authRoute.post("/register", registerUser);

export default authRoute;
