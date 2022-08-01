export const getAllJobs = async(req, res) => {
  res.json(req.user);
};

export const getJobById = async(req, res) => {
  res.send("get job by id");
};

export const createJob = async(req,res)=> {
  res.send("create job route")
}

export const deleteJob = async(req, res) => {
  res.send("delete job route");
};

export const updateJob = async(req, res) => {
  res.send("update jpb route");
};
