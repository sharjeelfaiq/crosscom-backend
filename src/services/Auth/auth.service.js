import createError from "http-errors";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../../models/User/user.model.js";
import TokenService from "../Token/token.service.js";
import helpers from "../helpers.service.js";
import tokenService from "../Token/token.service.js";
import { handleError } from "../../utils/utils.js";

const { createUserResponse } = helpers;

export default {
  signup: async (userData) => {
    const { email } = userData;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw createError(409, "User already exists");
      }

      const user = new User(userData);

      const token = TokenService.generateAuthToken(user);

      await user.save();

      return createUserResponse(user, token);
    } catch (error) {
      throw handleError("Failed to register user", error);
    }
  },

  signin: async (email, password) => {
    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw createError(404, "User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw createError(401, "Invalid credentials");
      }

      const token = TokenService.generateAuthToken(user);

      return createUserResponse(user, token);
    } catch (error) {
      throw handleError("Failed to login user", error);
    }
  },
};
