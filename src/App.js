import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.routes.js";
const App = express();

dotenv.config();
const PORT = process.env.PORT;

App.listen(PORT, () => {
  console.log("server on port", PORT);
});

App.use(cookieParser());
App.use(morgan("dev"));
App.use(express.json());
App.use(
  cors({
    origin: "http://localhost:5173/",
  })
);

App.use("/auth", authRoutes);
App.use("/user", userRoutes);
App.use("/task", taskRouter);
