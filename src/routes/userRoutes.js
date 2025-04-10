import express from "express";
import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRegister, validateLogin } from "../validators/userValidator.js";

const router = express.Router();

// Routes publiques
router.post("/register", validateRegister, userController.register);
router.post("/login", validateLogin, userController.login);

// Routes protégées
router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;