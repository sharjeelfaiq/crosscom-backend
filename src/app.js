import express from "express";

import {
  connectDatabase,
  configureRoutes,
  configureMiddleware,
  listenServer,
} from "./config/index.config.js";

const app = express();

connectDatabase();
configureRoutes(app);
configureMiddleware(app);
listenServer(app);
