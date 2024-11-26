import mongoose from "mongoose";

import { configureEnvironment } from "../index.config.js";

export default async () => {
  try {
    const { MONGO_STRING } = configureEnvironment();

    await mongoose.connect(MONGO_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error in config.js", error);
  }
};
