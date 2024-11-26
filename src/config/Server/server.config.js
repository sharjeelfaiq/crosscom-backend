import { configureEnvironment } from "../index.config.js";

export default function (app) {
  const { PORT } = configureEnvironment();

  const port = PORT || 5000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}
