import express from "express";
import {
  getUserById,
  getUserProfile,
  getAllUsers,
} from "../controller/userController";
import { isAuthenticatedGoogle } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", isAuthenticatedGoogle, getUserProfile);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

export default router;
