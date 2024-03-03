require("dotenv").config();

const mongo_string = process.env.MONGO_STRING;

try {
  const mongoose = require("mongoose");
  mongoose
    .connect(mongo_string)
    .then(() => console.log("Database Connection Established."))
    .catch((err) =>
      console.error("Failed to establish connection to database. Error:", err)
    );
} catch (error) {
  console.error("Error in config.js", error);
}
