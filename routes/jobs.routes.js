import Express from "express";
const jobsRoute = Express.Router();
import {
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob,
} from "../controllers/jobs";

jobsRoute.get("/", getAllJobs);
jobsRoute.get("/:id", getJobById);
jobsRoute.patch("/:id", updateJob);
jobsRoute.delete("/:id", deleteJob);

export default jobsRoute;
