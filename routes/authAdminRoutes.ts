import express from "express";
import passport from "passport";
import {
  handleGoogleLoginAdmin,
  handleLogout,
} from "../controller/authController";
import { HOST_URL_FRONTEND_ADMIN } from "../utils/config/urlApi";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("admin", { scope: ["profile", "email"] })
);

router.get(
  "/login/callback",
  passport.authenticate("admin", {
    failureRedirect: `${HOST_URL_FRONTEND_ADMIN}/auth/failure`,
  }),
  handleGoogleLoginAdmin
);

router.get("/logout", handleLogout);

export default router;
