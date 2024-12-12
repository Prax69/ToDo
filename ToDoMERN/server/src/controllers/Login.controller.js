import { validationResult } from "express-validator";
import User from "../models/User.js";
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_SECRET_TOKEN, StatusCode } from "../utils/constants.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password } = req.body;
    // res.send("Login");
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }
    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }
    const token = Jwt.sign({ userId: user._id }, JWT_SECRET_TOKEN);
    return res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login Successful", {
        userId: user._id,
        token: token,
      })
    );
  }
  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation Error",
      errors.mapped()
    )
  );
  // res.send("Login");
};

export default Login;
