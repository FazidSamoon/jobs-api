import authRoute from "./auth.routes.js";
import jobsRoute from "./jobs.routes.js";
import Express from "express";
import { authMiddleWare } from "../middleware/authentication.js";
const route = Express.Router();

route.use("/jobs", authMiddleWare, jobsRoute);
route.use("/auth", authRoute);

export default route;
