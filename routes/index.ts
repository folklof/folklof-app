import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import bookRoutes from "./bookRoutes";
import roleRoutes from "./roleRoutes";
import dashboardRoutes from "./dashboardRoutes";
import ageGroupRoutes from "./ageGroupRoutes";
import reviewRoutes from "./reviewRoutes";

const router = Router();

router.use("/", homeRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/category", categoryRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);
router.use("/api/v1/roles", roleRoutes);
router.use("/api/v1/dashboard", dashboardRoutes);
router.use("/api/v1/age-groups", ageGroupRoutes);
router.use("/api/v1/reviews", reviewRoutes);

export default router;
