import ProductService from "../../services/Product/product.service.js";

export default {
  add_product: async (req, res) => {
    try {
      const productData = req.body;
      const response = await ProductService.add_product(productData);
      res.json(response);
    } catch (error) {
      return {
        status: 500,
        message: "Error in server.js; /add-product route",
        error: error,
      };
      res.json({
        status: 500,
        message: "Error in server.js; /add-Product route",
      });
    }
  },
  get_products: async (req, res) => {
    try {
      const response = await ProductService.get_products();
      console.log("response", response);
      res.json(response);
    } catch (error) {
      return {
        status: 500,
        message: "Error in server.js; /get-product route",
        error: error,
      };
      res.json({
        status: 500,
        message: "Error in server.js; /get-Product route",
      });
    }
  },
  delete_product: async (req, res) => {
    try {
      const productId = req.params.pid;
      const response = await ProductService.delete_product(productId);
      res.json(response);
    } catch (error) {
      return {
        status: 500,
        message: "Error in server.js; /delete-product route",
        error: error,
      };
      res.json({
        status: 500,
        message: "Error in server.js; /delete-Product route",
      });
    }
  },
  delete_all_products: async (req, res) => {
    try {
      const userId = req.params.uid
      const response = await ProductService.delete_all_products(userId);
      res.json(response);
    } catch (error) {
      return {
        status: 500,
        message: "Error in server.js; /delete-all route",
        error: error,
      };
      res.json({
        status: 500,
        message: "Error in server.js; /delete-all route",
      });
    }
  },
  update_product: async (req, res) => {
    try {
      const productId = req.params.pid;
      const productData = req.body;
      const response = await ProductService.update_product(productId, productData);
      res.json(response);
    } catch (error) {
      return {
        status: 500,
        message: "Error in server.js; /update-product route",
        error: error,
      };
      res.json({
        status: 500,
        message: "Error in server.js; /update-Product route",
      });
    }
  },
  search: async (req, res) => {
    try {
      const searchKey = req.params.key;
      const response = await ProductService.search(searchKey);
      res.json(response);
    } catch (error) {
      return {
        status: 500,
        message: "Error in server.js; /search route",
        error: error,
      };
      res.json({ status: 500, message: "Error in server.js; /search route" });
    }
  },
};
