import createError from "http-errors";
import jwt from "jsonwebtoken";

import { handleError } from "../../utils/utils.js";

export default {
  verifyToken: async (token) => {
    // eslint-disable-next-line no-undef
    const { JWT_SECRET } = process.env;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
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

  generateAuthToken: (user) => {
    try {
      // eslint-disable-next-line no-undef
      const { JWT_SECRET } = process.env;
      const { email, firstName } = user;

      const token = jwt.sign(
        {
          _id: user._id.toString(),
          email,
          firstName,
        },
        JWT_SECRET,
        { expiresIn: "1h" },
      );

      return token;
    } catch (error) {
      throw handleError("Failed to generate auth token", error);
    }
  },
};
