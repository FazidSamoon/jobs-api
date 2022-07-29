import Mongoos from "mongoose";

const JobsSchema = new Mongoos.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide your position"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["Pending", "Declined", "Intervieved"],
      default: "Pending",
    },
    createdBy: {
      type: Mongoos.Types.ObjectId,
      ref: "User",
      required: [true, "Please proveid user"],
    },
  },
  { timestamps: true }
);

const Model = Mongoos.model("Jobs", JobsSchema);
export default Model;
