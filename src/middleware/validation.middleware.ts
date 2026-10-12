import {
  body,
  validationResult,
  type ValidationChain,
} from "express-validator";
import type { RequestHandler } from "express";

const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerValidation: (ValidationChain | RequestHandler)[] = [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters long"),

  validateRequest,
];

export const loginValidation: (ValidationChain | RequestHandler)[] = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  validateRequest,
];
