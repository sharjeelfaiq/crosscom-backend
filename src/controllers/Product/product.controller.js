import ProductService from "../../services/Product/product.service.js";

export default {
  add_product: (req, res) => {
    const productData = req.body;

    try {
      const response = ProductService.add_product(productData);
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
  get_products: (req, res) => {
    try {
      const response = ProductService.get_products(req, res);
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
  delete_product: (req, res) => {
    try {
      const response = ProductService.delete_product(req, res);
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
  delete_all_products: (req, res) => {
    try {
      const response = ProductService.deleted_all_products(req, res);
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
  update_product: (req, res) => {
    try {
      const response = ProductService.update_product(req, res);
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
  search: (req, res) => {
    try {
      const response = ProductService.search(req, res);
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
