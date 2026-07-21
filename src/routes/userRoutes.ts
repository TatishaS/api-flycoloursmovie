import { Router } from "express";

import checkAuth from "../utils/checkAuth";
import checkAdmin from "../utils/checkAdmin";
import { UserController } from "../controllers/index";

const router = Router();

router.get("/", checkAuth, checkAdmin, UserController.getAll);
router.patch("/:id", checkAuth, UserController.update);

export default router;
