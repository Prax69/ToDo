import { JWT_SECRET_TOKEN, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Access error"));
  }
  const token = req.headers["auth"];

  try {
    const decoded = Jwt.verify(token, JWT_SECRET_TOKEN);
    console.log(decoded);

    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "invalid token")
    );
  }
};

export default AuthMiddleware;
