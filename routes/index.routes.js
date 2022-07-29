import authRoute from "./auth.routes.js";
import jobsRoute from "./jobs.routes.js";
import Express from "express";
const route = Express.Router();

route.use("/jobs", jobsRoute);
route.use("/auth", authRoute);

export default route;
