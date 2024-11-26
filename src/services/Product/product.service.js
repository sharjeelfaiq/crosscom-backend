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
  get_products: async () => {
    try {
      const product = await Product.find();
      console.log("product", product);

      if (product.length < 0) {
        throw Error("No Product Found");
      }

      return product;
    } catch (error) {
      console.error("Error in server.js; /get-product route", error);
      return error;
    }
  },
  delete_product: async (productId) => {
    try {
      const result = await Product.deleteOne({ _id: productId });
      return result;
    } catch (error) {
      console.error("Error in server.js; /delete-product route", error);
      return error;
    }
  },
  delete_all_products: async (userId) => {
    try {
      const result = await Product.deleteMany({ userId });
      return result;
    } catch (error) {
      console.error("Error in server.js; /delete-all route", error);
      return error;
    }
  },
  update_product: async (productId, productData) => {
    try {
      const result = await Product.updateOne(
        {
          _id: productId,
        },
        {
          $set: productData,
        },
      );
      return result;
    } catch (error) {
      console.error("Error in server.js; /update-product route", error);
      return error;
    }
  },
  search: async (searchKey) => {
    try {
      let result = await Product.find({
        $or: [
          { productName: { $regex: new RegExp(searchKey, "i") } },
          { productCategory: { $regex: new RegExp(searchKey, "i") } },
          { productCompany: { $regex: new RegExp(searchKey, "i") } },
          {
            productPrice: Number.isFinite(parseFloat(searchKey)) && {
              $eq: parseFloat(searchKey),
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
