/* DATABASE CONFIGURATION */
require("./db/config");

/* CREATE AN EXPRESS APP */
const express = require("express");
const app = express();

/* JWT TOKEN AUTHENTICATION */
const JWT = require("jsonwebtoken");
const JWTKey = "bilo";

/* REQUIRE CORS TO AVOID CROSS-ORIGIN DATA TRANSFER ISSUES */
const cors = require("cors");
app.use(cors());

/* IMPORT DATABASE MODELS */
const User = require("./db/models/user");
const Product = require("./db/models/product");

/* PARSE JSON RESPONSE TO JAVASCRIPT OBJECT */
app.use(express.json());

/* '/' CONTROLLER */
const home = (req, res) => {
  try {
    res.send("Hello from backend.");
  } catch (error) {
    console.error(error);
  }
};

/* '/register' CONTROLLER */
const register = async (req, res) => {
  try {
    const user = new User(req.body);
    let alreadyRegistered = await User.findOne(req.body).select("-password");

    if (alreadyRegistered) {
      res.send({ message: "User Already Exist", status: 409 });
    } else {
      let result = await user.save();
      result = result.toObject();
      delete result.password;

      JWT.sign({ result }, JWTKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({
            result: "Something went wrong. Try again later. Error",
            err,
          });
        }
        res.send({ body: result, status: 200, auth: token });
      });
    }
  } catch (error) {
    console.error("Error in server.js; /register route", error);
  }
};

/* '/signin' CONTROLLER */
const sign_in = async (req, res) => {
  try {
    const user = await User.findOne(req.body).select("-password");
    if (req.body.email && req.body.password) {
      if (user) {
        JWT.sign({ user }, JWTKey, { expiresIn: "1h" }, (err, token) => {
          if (err) {
            res.send({ result: "Something went wrong. Try again later." });
          }
          res.send({ body: user, status: 200, auth: token });
        });
      } else {
        res.send({ body: { message: "No user found" }, status: 200 });
      }
    } else {
      res.send({
        body: { message: "Email or password does not exist." },
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error in server.js; /sigin route", error);
  }
};

/* '/add-products' CONTROLLER */
const add_product = async (req, res) => {
  try {
    const product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /add-product route", error);
  }
};

/* '/get-products' CONTROLLER */
const get_products = async (req, res) => {
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
};

/* '/delete-product/:uid' CONTROLLER */
const delete_product = async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.pid });
    res.send(result);
  } catch (error) {
    console.error("Error in server.js; /delete-product route", error);
  }
};

/* '/delete-all-products' CONTROLLER */
const delete_all_products = async (req, res) => {
 try {
   const result = await Product.deleteMany({ userId: req.params.uid });
   res.send(result);
 } catch (error) {
   console.error("Error in server.js; /delete-all route", error);
 }
}

/* '/update-product/:pid' CONTROLLER */
const update_product = async (req, res) => {
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
}

/* '/search/:key' CONTROLLER */
const search = async (req, res) => {
 try {
   let result = await Product.find({
     $or: [
       { productName: { $regex: new RegExp(req.params.key, "i") } },
       { productCategory: { $regex: new RegExp(req.params.key, "i") } },
       { productCompany: { $regex: new RegExp(req.params.key, "i") } },
       {
         productPrice: Number.isFinite(parseFloat(req.params.key)) && {
           $eq: parseFloat(req.params.key),
         },
       },
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
}

/* FUNCTIONS EXPORTS */
exports.home = home;
exports.register = register;
exports.sign_in = sign_in;
exports.add_product = add_product;
exports.get_products = get_products;
exports.delete_product = delete_product;
exports.delete_all_products = delete_all_products;
exports.update_product = update_product;
exports.search = search;
