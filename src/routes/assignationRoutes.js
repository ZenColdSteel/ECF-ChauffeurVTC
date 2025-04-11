import express from "express";
import * as assignationController from "../controllers/assignationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/:id",authMiddleware,assignationController.getAssignationById);
router.get("/car/:id" ,authMiddleware,assignationController.getAssignationByCarId);
router.get("/driver/:id", authMiddleware,assignationController.getAssignationByDriverId);
router.post("", authMiddleware,assignationController.createAssignation);
router.delete("/:id", authMiddleware,assignationController.deleteAssignation);
router.get("",assignationController.getAssignations);
export default router;