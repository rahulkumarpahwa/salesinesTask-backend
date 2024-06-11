import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide an Username"],
    unique: [true, "Please Provide an Unique Username"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    unique: [true, "Please Provide an Unique Email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide an Password"],
  },
});

const User = mongoose.models.users || mongoose.model("User", userSchema); //User will get converted to users in mongoose.

export default User;
