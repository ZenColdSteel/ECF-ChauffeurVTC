import express from "express";
// import authRoutes from "./authRoutes.js";
// import carRoutes from "./carRoutes.js";
import driverRoutes from "./driverRoutes.js";


const router = express.Router();

router.use("/driver", driverRoutes);
// router.use("/car", carRoutes);
// router.use("/auth", authRoutes);
export default router;
