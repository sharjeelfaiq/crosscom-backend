import express from "express";

import ProductController from "../../controllers/Product/product.controller.js";

const router = express.Router();

router
  .post("/add-product", ProductController.add_product)
  .get("/get-products", ProductController.get_products)
  .delete("/delete-product/:pid", ProductController.delete_product)
  .delete("/delete-all-products/:uid", ProductController.delete_all_products)
  .put("/update-product/:pid", ProductController.update_product)
  .get("/search/:key", ProductController.search);

export default router;
