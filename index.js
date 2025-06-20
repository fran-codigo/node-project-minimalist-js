import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const server = express();

// Cors config
const whiteList = [process.env.FRONTEND_URL, undefined];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Middleware
server.use(express.json());
server.use(cors(corsOptions));
server.use(morgan("dev"));

// Routes
server.use("/api/v1", userRouter);

// Server config
const PORT = process.env.PORT || 4000;

// Server start
server.listen(PORT, () => {
  console.log(
    colors.bgBlue.white("Server running on port: " + colors.bgRed(PORT))
  );
});
