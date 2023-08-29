import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const taskSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  completed: { type: Boolean, default: false, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

taskSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

const taskModel = model("Task", taskSchema);

export default taskModel;
