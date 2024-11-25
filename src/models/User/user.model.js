import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserSchema = mongoose.model("users", UserModel);

export default UserSchema;
