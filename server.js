// Import the database
require("./db/config");

// Create an Express App
const express = require("express");
const app = express();

require("dotenv").config();

// Require cors package to resolve cors error
const cors = require("cors");
app.use(cors());

// Import Models from mongodb database
const User = require("./db/models/user");
const Product = require("./db/models/product");

// Parses JSON requests to JavaScript Object
app.use(express.json());

// Home Route + API
app.get("/", (req, res) => {
  try {
    res.send("Hello from backend.");
  } catch (error) {
    console.error(error);
  }
});

// Get Product Route + API
app.get("/get-products", async (req, res) => {
  try {
    const product = await Product.find();
    if (product.length > 0) {
      res.send(product);
    } else {
      res.send({ message: "No product found" });
    }
  } catch (error) {
    console.error("Error in server.js; /get-product route", error);
  }
});

// Register Route + API
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

// Sign-in Route + API
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

// Add Product Route + API
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /add-product route", error);
  }
});

// Delete Product Route + API
app.delete("/delete-product/:pid", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.pid });
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /delete-product route", error);
  }
});

// Delete All Products Route + API
app.delete("/delete-all-products/:uid", async (req, res) => {
  try {
    const result = await Product.deleteMany({ userId: req.params.uid });
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /delete-all route", error);
  }
});

// Update Product Route + API
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

// Search Product Route + API
app.get("/search/:key", async (req, res) => {
  try {
    let result = await Product.find({
      $or: [
        { productName: { $regex: new RegExp(req.params.key, "i") } },
        { productCategory: { $regex: new RegExp(req.params.key, "i") } },
      ],
    });
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ result: "No Product Found" });
    }
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
