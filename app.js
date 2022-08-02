import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
const app = express();
import connectDB from "./db/connect.js";
import route from "./routes/index.routes.js";

// error handler
import { notFound } from "./Middleware/not-found.js";
import { errorHandlerMiddleware } from "./Middleware/error-handler.js";

// extra security package
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

app.use(express.json());
app.set("trust proxy", 1); //since deploying in heroku
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15minitus
    max: 100, //maximum requests for each ip
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use("/api/v1", route);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
