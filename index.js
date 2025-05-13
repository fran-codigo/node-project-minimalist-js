import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

// Variables de entorno
dotenv.config();

const server = express();

// Leer los datos del body
server.use(express.json());

// config cors
server.use(cors());

// config morgan
server.use(morgan("dev"));

// Define routes
server.use("/", userRouter);

// Define port
const PORT = process.env.PORT || 4000;

// start server
server.listen(PORT, () => {
    console.log(colors.bgBlue.white("Server running on port: " + colors.bgRed(PORT)));
})

