import jwt from "jsonwebtoken";
import { User } from "./modles/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(401).json("No token, access denied");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const foundUser = await User.findById(decoded.id);
    if (!foundUser) {
      return res.status(401).json("user not found");
    }
    req.user = foundUser;
    next();
  } catch (e) {
    console.log(e);
  }
};
