import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  productPrice: Number,
  productCategory: String,
  productCompany: String,
});

const Product = mongoose.model("products", ProductSchema);

export default Product;
