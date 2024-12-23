import express from "express";
import { authRoutes, productRoutes } from "../../routes/index.routes.js";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send("Welcome to the CrossCom Backend");
});

const v1Router = express.Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/product", productRoutes);

apiRouter.use("/api/v1", v1Router);

apiRouter.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const configureRoutes = (app) => {
  app.use(apiRouter);
};

export default configureRoutes;
