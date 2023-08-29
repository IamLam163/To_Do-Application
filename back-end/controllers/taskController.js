import User from "../models/user.js";
import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  let tasks;
  try {
    tasks = await Task.find({}).exec();
  } catch (error) {
    console.log(error.toString());
    return res.status(404).json({ error: error });
  }
  if (!tasks || tasks.length === 0) {
    return res.status(404).json({ error: "Empty Set! No Tasks to Display" });
  }
  return res.status(200).json({ tasks });
};

export const createTask = async (req, res) => {
  const { name, owner } = req.body;
  const user = await User.findById(owner);
  if (!user) {
    return res
      .status(404)
      .json({ error: "Task cannot be created without a valid user" });
  }
  try {
    const taskData = {
      name,
      owner: user,
    };
    const task = new Task(taskData);
    console.log(task);
    await task.save();
    console.log("Task created successfully");
    return res.status(201).json({ task });
  } catch (error) {
    console.log("Error creating folder", error.toString());
    return res.json({ error: error.toString() });
  }
};

export const renameTask = async (req, res) => {
  const taskId = req.params.id;
  const { newName } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    task.name = newName;
    const updatedTask = await task.save();
    res.json({ updatedTask });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "No user found!" });
    }
    const task = await Task.findOne({ owner: user._id });

    if (!task) {
      return res
        .status(404)
        .json({ error: "No Task was created by this user" });
    }
    return res.status(200).json({
      taskId: task._id,
      task: task.name,
    });
  } catch (error) {
    console.error("Error fetching folder:", error);
    return res
      .status(500)
      .json({ error: "An error occured while fetching the folder" });
  }
};

export const getUserTask = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tasks = await Task.find({ owner: user._id });

    if (tasks.length === 0) {
      return res.status(404).json({ error: "User has not created any tasks" });
    }

    return res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error getting user tasks" });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();
    res.json({ updatedTask });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    console.log("Task Deleted Successfully");
    return res.status(204).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.log(error.toString());
  }
};
