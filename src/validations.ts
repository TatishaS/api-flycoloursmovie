import { body, check } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  check(
    "password",
    "Password must be at least 8 characters long and contain at least one letter, one number, and one special character",
  )
    .isString()
    .trim()
    .isLength({ min: 8, max: 20 })
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  body("fullname", "Please enter a valid name").isString().trim().isLength({ min: 2 }),
  body("group", "Invalid group format")
    .optional()
    .isString()
    .isLength({ min: 2, max: 10 }),
];

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 characters long")
    .trim()
    .isLength({
      min: 8,
    }),
];

export const bookingCreateValidation = [
  body("seats", "Select at least one seat").isArray().isLength({ min: 1 }),
  body("activityDate", "Select a date").notEmpty(),
  body("activity", "Select a movie or event").notEmpty(),
];

export const activityCreateValidation = [
  body("type", "Select an activity type").notEmpty(),
  body("date", "Enter the activity date").isDate(),
  body("title", "Enter a title").isString().isLength({
    min: 2,
  }),
  body("imageUrl", "Invalid image URL").isURL(),
  body("description", "Description must be between 10 and 350 characters")
    .isString()
    .isLength({
      min: 10,
      max: 350,
    }),
];

export const activityUpdateValidation = [
  body("type", "Select an activity type").optional().notEmpty(),
  body("date", "Enter the activity date").optional().isDate(),
  body("title", "Enter a title").optional().isString().isLength({
    min: 2,
  }),
  body("imageUrl", "Invalid image URL").optional().isURL(),
  body("description", "Description must be between 10 and 350 characters")
    .optional()
    .isString()
    .isLength({
      min: 10,
      max: 350,
    }),
];
