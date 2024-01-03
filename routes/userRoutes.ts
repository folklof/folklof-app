import express from "express";
import {
  getUserById,
  getUserProfile,
  getAllUsers,
  updateUserById,
  updateUserForAdminById,
} from "../controller/userController";
import { isAuthenticatedGoogle } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", isAuthenticatedGoogle, getUserProfile);
router.get("/:id", getUserById);
router.get("/", getAllUsers);
router.put("/:id", updateUserById);
router.put("/admin/:id", updateUserForAdminById);

export default router;
