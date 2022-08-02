import { CustomAPIError } from "../errors/custom-api.js";
import StatusCodes from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  let customErrors = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong Try again later",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code && err.code === 11000) {
    customErrors.msg = `Duplicate values entered for ${Object.keys(
      err.keyValue
    )} failed. Please choose anther value`;
    customErrors.statusCode = 400;
  }
  return res.status(customErrors.statusCode).json({ msg: customErrors.msg });
};
