import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

import Admin from "./models/Admin.js";
import Survey from "./models/Survey.js";

import adminRoutes from "./routes/adminRoutes.js";
import surveyRoutes from "./routes/surveyFormRoutes.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import jwtStrategy from "./config/passportJWT.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(passport.initialize())

app.use("/admin", adminRoutes);
app.use("/survey", surveyRoutes);

const initializeDB = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connected.."))
    .catch((error) => console.log("Error in DB: ", error));
};

initializeDB();

app.listen(PORT, (error) =>
  console.log(
    error
      ? `Error in running server: , ${error}`
      : `Server is running on Port : ${PORT} `
  )
);
