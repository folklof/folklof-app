import express from "express";
import passport from "passport";
import { handleGoogleLogin, handleLogout } from "../controller/authController";
import { HOST_URL_FRONTEND } from "../utils/config/urlApi";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("user", { scope: ["profile", "email"] })
);

router.get(
  "/login/callback",
  passport.authenticate("user", {
    failureRedirect: `${HOST_URL_FRONTEND}/auth/failure`,
  }),
  handleGoogleLogin
);

router.get("/logout", handleLogout);

export default router;
