// Import the database
require("./db/config");

// USE JWT AND JWTKey FOR VERIFICATION
const JWT = require("jsonwebtoken");
const JWTKey = "f6a8wef41w823f843afdc";

const controllers = require("./controllers");
const home = (req, res) => controllers.home(req, res);
const register = (req, res) => controllers.register(req, res);
const sign_in = (req, res) => controllers.sign_in(req, res);
const add_product = (req, res) => controllers.add_product(req, res);
const get_product = (req, res) => controllers.get_products(req, res);
const delete_product = (req, res) => controllers.delete_product(req, res);
const deleted_all_products = (req, res) =>
  controllers.delete_all_products(req, res);
const update_product = (req, res) => controllers.update_product(req, res);
const search = (req, res) => controllers.search(req, res);

// Create an Express App
const express = require("express");
const app = express();

require("dotenv").config();

// Require cors package to resolve cors error
const cors = require("cors");
app.use(cors());

// Parses JSON requests to JavaScript Object
app.use(express.json());

/* '/' ROUTE */
app.get("/", home);

/* '/register' ROUTE */
app.post("/register", register);

/* '/signin' ROUTE */
app.post("/signin", sign_in);

/* '/add-products' ROUTE */
app.post("/add-product", verifyToken, add_product);

/* '/get-products' ROUTE */
app.get("/get-products", verifyToken, get_product);

/* '/delete-product/:pid' ROUTE */
app.delete("/delete-product/:pid", verifyToken, delete_product);

/* '/delete-all-products' ROUTE */
app.delete("/delete-all-products/:uid", verifyToken, deleted_all_products);

/* '/update-product/:pid' ROUTE */
app.put("/update-product/:pid", verifyToken, update_product);

/* '/search/:key' ROUTE */
app.get("/search/:key", verifyToken, search);

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    JWT.verify(token, JWTKey, (err, valid) => {
      if (err) {
        res.status(401).send("Please provide a valid token", err);
      } else {
        next();
      }
    });
  } else {
    console.error("No token provided.");
  }
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
