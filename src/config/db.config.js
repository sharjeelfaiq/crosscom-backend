import mongoose from "mongoose";

import { MONGO_STRING } from "./env.config.js";

export default async () => {
  try {
    await mongoose.connect(MONGO_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error in config.js", error);
  }
};
