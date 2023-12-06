import express from "express";
import { getUserById, getUserProfile } from "../controller/userController";
import { isAuthenticatedGoogle } from "../controller/authController";

const router = express.Router();

router.get("/profile", isAuthenticatedGoogle, getUserProfile);
router.get("/:id", getUserById);

export default router;
