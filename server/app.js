import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";
import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/authmiddleware.js";
import cors from "cors";

const app = express();

mongoose.connect(DB_CONNECT, { useNewUrlParser: true });

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    topic: "health check",
    data: "Ok",
    uptime: process.uptime(),
    date: new Date(),
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
