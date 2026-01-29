import { body, check } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат e-mail").isEmail(),
  check(
    "password",
    "Длина пароля должна быть не менее 8 символов и содержать хотя бы 1 латинскую букву, цифры и специальные символы",
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
  body("fullname", "Укажите верное имя").isString().trim().isLength({ min: 2 }),
  body("group", "Неверный формат группы")
    .optional()
    .isString()
    .isLength({ min: 2, max: 10 }),
];

export const loginValidation = [
  body("email", "Неверный формат e-mail").isEmail(),
  body("password", "Длина пароля должна быть не менее 8 символов")
    .trim()
    .isLength({
      min: 8,
    }),
];

export const bookingCreateValidation = [
  body("seats", "Выберите хотя бы одно место").isArray().isLength({ min: 1 }),
  body("activityDate", "Выберите дату").notEmpty(),
  body("activity", "Выберите фильм или событие").notEmpty(),
];

export const activityCreateValidation = [
  body("type", "Выберите тип активности").notEmpty(),
  body("date", "Укажите дату мероприятия").isDate(),
  body("title", "Укажите название").isString().isLength({
    min: 2,
  }),
  body("imageUrl", "Неверная ссылка на изображение").isURL(),
  body("description", "Длина описания должна быть от 10 до 350 символов")
    .isString()
    .isLength({
      min: 10,
      max: 350,
    }),
];
