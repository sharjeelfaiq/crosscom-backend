try {
  const mongoose = require("mongoose");
  mongoose
    .connect(
      "mongodb+srv://sharjeelfaiq:wnvVkHx9TlXdpioG@cluster0.xvomymy.mongodb.net/e-dashboard"
    )
    .then(() => console.log("Database Connection Established."))
    .catch((err) =>
      console.error("Failed to establish connection to database. Error:", err)
    );
} catch (error) {
  console.error("Error in config.js", error);
}
