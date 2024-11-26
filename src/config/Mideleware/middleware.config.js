import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

export default function configureMiddleware(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("dev"));
}
