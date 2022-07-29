import authRoute from "./auth.routes";
import jobsRoute from "./jobs.routes";
import Express from "express";
const route = Express.Router();

route.use("/jobs", jobsRoute);
route.use("/auth", authRoute);

export default route;
