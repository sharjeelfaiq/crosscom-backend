import Product from "../../models/Product/product.model.js";

export default {
  add_product: async (productData) => {
    try {
      const product = new Product(productData);
      const result = await product.save();
      return result;
    } catch (error) {
      console.error("Error in server.js; /add-product route", error);
      return error;
    }
  },
  get_products: async (req, res) => {
    try {
      const product = await Product.find();
      if (product.length > 0) {
        return product;
      } else {
        throw Error("No Product Found");
      }
    } catch (error) {
      console.error("Error in server.js; /get-product route", error);
      return error;
    }
  },
  delete_product: async (req, res) => {
    try {
      const result = await Product.deleteOne({ _id: req.params.pid });
      return result;
    } catch (error) {
      console.error("Error in server.js; /delete-product route", error);
      return error;
    }
  },
  delete_all_products: async (req, res) => {
    try {
      const result = await Product.deleteMany({ userId: req.params.uid });
      return result;
    } catch (error) {
      console.error("Error in server.js; /delete-all route", error);
      return error;
    }
  },
  update_product: async (req, res) => {
    try {
      const result = await Product.updateOne(
        {
          _id: req.params.pid,
        },
        {
          $set: req.body,
        },
      );
      return result;
    } catch (error) {
      console.error("Error in server.js; /update-product route", error);
      return error;
    }
  },
  search: async (req, res) => {
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
        return result;
      } else {
        throw Error("No Product Found");
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};
