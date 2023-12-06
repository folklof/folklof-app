import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";

const router = Router();

router.use("/", homeRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/category", categoryRoutes);

export default router;
