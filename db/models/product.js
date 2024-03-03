const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  productPrice: String,
  productCategory: String,
  productCompany: String,
});

module.exports = mongoose.model("products", productSchema);