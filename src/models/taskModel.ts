import mongoose from "mongoose";
import User from "./userModel";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.models['Task'] || mongoose.model("Task", taskSchema); //User will get converted to users in mongoose. //error happened here but resolved. (OverwriteModelError)

export default Task;
