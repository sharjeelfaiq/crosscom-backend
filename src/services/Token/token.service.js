import createError from "http-errors";
import jwt from "jsonwebtoken";

import { handleError } from "../../utils/utils.js";
import { configureEnvironment } from "../../config/index.config.js";

const { JWT_KEY } = configureEnvironment();

export default {
  generateAuthToken: (user) => {
    try {
      const { email, firstName } = user;

      const token = jwt.sign(
        {
          _id: user._id.toString(),
          email,
          firstName,
        },
        JWT_KEY,
        { expiresIn: "1h" },
      );

      return token;
    } catch (error) {
      throw handleError("Failed to generate auth token", error);
    }
  },
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, JWT_KEY);

      if (!decoded) {
        throw createError(401, "Token invalid");
      }

      return decoded;
    } catch (error) {
      const { name: errorName } = error;

      if (errorName === "TokenExpiredError") {
        throw handleError("Token expired", error);
      } else if (errorName === "JsonWebTokenError") {
        throw handleError("Token invalid", error);
      } else {
        throw handleError("Failed to verify token", error);
      }
    }
  },
};
