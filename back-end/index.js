import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/todoRoutes.js";
import path from "path";

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

const allowedOrigins = [
  "https://to-do-application-swart.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
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

if (process.env.NODE_ENV === "production") {
  const reactBuildPath = path.join(__dirname, "front-end/build");

  app.use(express.static(reactBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(reactBuildPath, "index.html"));
  });
}
