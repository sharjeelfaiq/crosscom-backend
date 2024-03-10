const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  productPrice: Number,
  productCategory: String,
  productCompany: String,
});

module.exports = mongoose.model("products", productSchema);