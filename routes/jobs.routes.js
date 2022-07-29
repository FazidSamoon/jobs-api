import Express from "express";
const jobsRoute = Express.Router();
import {
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob,
  createJob,
} from "../controllers/jobs.js";

jobsRoute.get("/", getAllJobs);
jobsRoute.get("/:id", getJobById);
jobsRoute.post("/", createJob);
jobsRoute.patch("/:id", updateJob);
jobsRoute.delete("/:id", deleteJob);

export default jobsRoute;
