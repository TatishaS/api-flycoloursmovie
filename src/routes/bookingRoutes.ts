import { Router } from "express";

import { bookingCreateValidation } from "../validations";
import checkAuth from "../utils/checkAuth";
import checkAdmin from "../utils/checkAdmin";
import checkValidationErrors from "../utils/checkValidationErrors";
import { BookingController } from "../controllers/index";

const router = Router();

router.post(
  "/",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.create,
);
router.get("/", checkAuth, checkAdmin, BookingController.getAll);
router.get("/:id", checkAuth, BookingController.getItem);
router.delete(
  "/:id",
  checkAuth,
  bookingCreateValidation,
  BookingController.remove,
);
router.patch(
  "/:id",
  checkAuth,
  bookingCreateValidation,
  checkValidationErrors,
  BookingController.update,
); // Возможно, функция не нужна

export default router;
