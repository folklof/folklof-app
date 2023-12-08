import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import bookRoutes from "./bookRoutes";

const router = Router();

router.use("/", homeRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);

export default router;
