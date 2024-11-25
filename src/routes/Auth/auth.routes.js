import express from "express";

import AuthController from "../../controllers/Auth/auth.controller.js";

const router = express.Router();

router
  .post("/signup", AuthController.signup)
  .post("/signin", AuthController.signin);

export default router;
