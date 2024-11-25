import dotenv from "dotenv";

dotenv.config();

export const JWT_KEY = process.env.JWT_KEY;
export const PORT = process.env.PORT;
export const MONGO_STRING = process.env.MONGO_STRING;
