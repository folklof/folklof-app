import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import bookRoutes from "./bookRoutes";
import roleRoutes from "./roleRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();

router.use("/", homeRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);
router.use("/api/v1/roles", roleRoutes);
router.use("/api/v1/dashboard", dashboardRoutes);

export default router;
