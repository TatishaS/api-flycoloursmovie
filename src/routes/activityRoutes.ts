import { Router } from "express";

import {
  activityCreateValidation,
  activityUpdateValidation,
} from "../validations";
import checkAuth from "../utils/checkAuth";
import checkAdmin from "../utils/checkAdmin";
import checkValidationErrors from "../utils/checkValidationErrors";
import { ActivityController } from "../controllers/index";

const router = Router();

router.post(
  "/",
  checkAuth,
  checkAdmin,
  activityCreateValidation,
  ActivityController.create,
);
router.get("/", ActivityController.getAll);
router.get("/:id", ActivityController.getItem);
router.delete("/:id", checkAuth, checkAdmin, ActivityController.remove);
router.patch(
  "/:id",
  checkAuth,
  checkAdmin,
  activityUpdateValidation,
  checkValidationErrors,
  ActivityController.update,
);

export default router;
