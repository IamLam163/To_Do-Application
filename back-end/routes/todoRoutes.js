import express from "express";
import cors from "cors";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  getUserTask,
  renameTask,
  toggleTaskCompletion,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5173"],
  }),
);

taskRouter.get("/tasks", getAllTasks);
taskRouter.post("/addtask", createTask);
taskRouter.patch("/rename/:id", renameTask);
taskRouter.get("/task/:id", getTaskById);
taskRouter.get("/usertasks/:id", getUserTask);
taskRouter.delete("/deletetask/:id", deleteTaskById);
taskRouter.patch("/toggletask/:id", toggleTaskCompletion);

export default taskRouter;
