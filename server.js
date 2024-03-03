// Import the database
require("./db/config");

// Create an Express App
const express = require("express");
const app = express();

// Require cors package to resolve cors error
const cors = require("cors");
app.use(cors());

// Import Models from mongodb database
const User = require("./db/models/user");
const Product = require("./db/models/product");

// Parses JSON requests to JavaScript Object
app.use(express.json());

// ROUTES
app.get("/", async (req, res) => {
  try {
    res.send("Hello from backend.");
  } catch (error) {
    console.error(error);
  }
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save(); // Saves in the database the data created with the help of the JSON data and the user model
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /register route", error);
  }
});

// Sign-in Route
app.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password) {
      if (user) {
        res.send(user);
      } else {
        res.send({ message: "No user found" });
      }
    } else {
      res.send({ message: "Email or password does not exist." });
    }
  } catch (error) {
    console.error("Error in server.js; /sigin route", error);
  }
});

// Add Product Route
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /add-product route", error);
  }
});

// Get Product Route
app.get("/get-products", async (req, res) => {
  try {
    const product = await Product.find({}, null, { timeout: 20000 });
    if (product.length > 0) {
      res.send(product);
    } else {
      res.send({ message: "No product found" });
    }
  } catch (error) {
    console.error("Error in server.js; /get-product route", error);
  }
});

// Delete Product Route
app.delete("/delete-product/:pid", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.pid });
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /delete-product route", error);
  }
});

// Delete All Products Route
app.delete("/delete-all-products/:uid", async (req, res) => {
  try {
    const result = await Product.deleteMany({ userId: req.params.uid });
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /delete-all route", error);
  }
});

// Update Product Route
app.put("/update-product/:pid", async (req, res) => {
  try {
    const result = await Product.updateOne(
      {
        _id: req.params.pid,
      },
      {
        $set: req.body,
      }
    );
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /update-product route", error);
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
