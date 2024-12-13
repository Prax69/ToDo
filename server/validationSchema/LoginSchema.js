import { check } from "express-validator";
export const LoginSchema = [
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric")
    .trim()
    .isLength({ min: 6, max: 20 }),

  check("password", "password is required")
    .exists()
    .isLength({ min: 6 })
    .trim(),
];
