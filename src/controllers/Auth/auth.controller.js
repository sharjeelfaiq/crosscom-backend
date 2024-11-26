import AuthService from "../../services/Auth/auth.service.js";
import { setTokenCookie, handleError } from "../../utils/utils.js";

export default {
  signup: async (req, res, next) => {    
    try {
      const userData = req.body;
      const user = await AuthService.signup(userData);
      const { token } = user;
      setTokenCookie(res, token);
      res.status(201).json({ user, message: "Registration successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(handleError("Failed to register user", error));
    }
  },
  signin: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await AuthService.signin(email, password);
      const { token } = user;
      setTokenCookie(res, token);
      res.status(200).json({ user, message: "Login successful" });
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(handleError("Failed to login", error));
    }
  },
};
