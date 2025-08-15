import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат e-mail").isEmail(),
  body("password", "Длина пароля должна быть не менее 6 символов")
    .isString()
    .isLength({
      min: 6,
    }),
  body("fullname", "Укажите верное имя").isString().isLength({ min: 2 }),
  body("group", "Неверный формат группы")
    .optional()
    .isString()
    .isLength({ min: 2, max: 4 }),
];

export const loginValidation = [
  body("email", "Неверный формат e-mail").isEmail(),
  body("password", "Длина пароля должна быть не менее 6 символов").isLength({
    min: 6,
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
  /*  body("description", "Длина описания должна быть от 10 до 200 символов")
    .isString()
    .isLength({
      min: 10,
      max: 200,
    }),

   */
];
