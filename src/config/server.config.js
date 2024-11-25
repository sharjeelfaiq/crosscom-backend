import { PORT } from "./env.config.js";

export default function (app) {
    const port = PORT || 5000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}