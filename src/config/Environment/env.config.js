import dotenv from "dotenv";

dotenv.config();

export default function () {
  const MONGO_STRING = process.env.MONGO_STRING;
  const JWT_KEY = process.env.JWT_KEY;
  const PORT = process.env.PORT;

  return {
    MONGO_STRING,
    JWT_KEY,
    PORT,
  };
}
