import express from "express";
import cors from "cors";
import {
  allUser,
  logOutUser,
  loginUser,
  registerUser,
  test,
} from "../controllers/userController.js";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://to-do-application-swart.vercel.app",
    ],
  }),
);

router.get("/", test);
router.get("/users", allUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);

export default router;
