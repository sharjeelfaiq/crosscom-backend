import express from "express";

import connectDb from "./config/db.config.js";
import configureRoutes from "./config/routes.config.js";
import configureMiddleware from "./config/middleware.config.js";
import listenServer from "./config/server.config.js";

const app = express();

connectDb();
configureRoutes(app);
configureMiddleware(app);
listenServer(app);