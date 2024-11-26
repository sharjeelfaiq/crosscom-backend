import express from "express";

import {
  connectDatabase,
  configureRoutes,
  configureMiddleware,
  listenServer,
} from "./config/index.config.js";

const app = express();

listenServer(app);

connectDatabase();
configureMiddleware(app);
configureRoutes(app);
