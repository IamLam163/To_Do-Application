import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const port = 7000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Database connection failed", err.toString());
  });

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function(origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", router);
app.use("/todo", taskRouter);

// server connection
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
