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

app.use(express.json());
// extra package

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
