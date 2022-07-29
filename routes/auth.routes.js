import Express from "express";
const authRoute = Express.Router();
import { login, registerUser } from "../controllers/auth.js";

authRoute.post("/login", login);
authRoute.post("/register", registerUser);

export default authRoute;
