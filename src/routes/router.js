import express from "express";
import carRoutes from "./carRoutes.js";
import driverRoutes from "./driverRoutes.js";
import assignationRoutes from "./assignationRoutes.js";
const router = express.Router();
router.use("/driver", driverRoutes);
router.use("/car", carRoutes);
router.use("/assignation", assignationRoutes);
export default router;
