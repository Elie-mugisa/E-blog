import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") // checking if it's a Bearer token
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(id).select("-password");

      next();
    } catch (error) {
      const err = new Error("No authorized, Token failed");
      err.statusCode = 401;

      next(err);
    }
  } else {
    let error = new Error("Not Authorizied, No token");
    error.statusCode = 401;
    next(error);
  }
};

export const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Non autorié(e), seuls les admins");
    error.statusCode = 401;
    next(error);
  }
};
