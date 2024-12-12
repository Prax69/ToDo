import { check } from "express-validator";
export const RegisterSchema = [
  check("name").trim().isAlpha().withMessage("Name must be alphabetic"),
  check("username", "username is required").exists().isAlphanumeric().withMessage("Username must be alphanumeric").trim().isLength({ min: 6, max: 20 }),

  check("password", "password is required").exists().isLength({ min: 6 }).trim(),
    check("email", "email is required").exists().isEmail(),
];