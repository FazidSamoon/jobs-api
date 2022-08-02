import Jobs from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/bad-request.js";
import { NotFoundError } from "../errors/not-found.js";

export const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, length: jobs.length });
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const job = await Jobs.findOne({ _id: id, createdBy: userId });
  if (!job) {
    throw new NotFoundError("Job is not available at the moment");
  }
  res.send(job);
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await Jobs.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job});
};

export const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (!position || !company) {
    throw new BadRequestError("Company or position cannot be empty");
  }

  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
