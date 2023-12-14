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
import bookQuizRoutes from "./bookQuizRoutes";
import historyQuiz from "./historyQuizRoutes";
import libraryRoutes from "./libraryRoutes";
import favouriteRoutes from "./favouriteRoutes";

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
router.use("/api/v1/book-quiz", bookQuizRoutes);
router.use("/api/v1/history-quiz", historyQuiz);
router.use("/api/v1/library", libraryRoutes);
router.use("/api/v1/favourite", favouriteRoutes);

export default router;
