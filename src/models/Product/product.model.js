import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
  userId: String,
  productName: String,
  productPrice: Number,
  productCategory: String,
  productCompany: String,
});

const ProductSchema = mongoose.model("products", ProductModel);

export default ProductSchema;
