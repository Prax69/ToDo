import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode, JWT_SECRET_TOKEN } from "../utils/constants.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Jwt from "jsonwebtoken";


const Register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // password = hashedPassword;

    const userExist = await User.findOne({
        $or: [{ username: username }, { email: email }]
    });

    if(userExist) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "User or email already exists"));
    }

    try {
      const result = await User.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      });
      const token = Jwt.sign({ userId: result._id }, JWT_SECRET_TOKEN);
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registered Successfully", {userId:result._id, token: token})
      );
      
    } catch (err) {
      console.log(err);
    }
  }

  

  res.json(
    jsonGenerate(
      StatusCode.VALIDATION_ERROR,
      "Validation Error",
      errors.mapped()
    )
  );
};

export default Register;
