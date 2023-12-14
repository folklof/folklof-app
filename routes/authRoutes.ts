import express from "express";
import passport from "passport";
import { handleGoogleLogin, handleLogout } from "../controller/authController";
import { HOST_URL_FRONTEND } from "../utils/config/urlApi";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/callback",
  passport.authenticate("google", {
    failureRedirect: `${HOST_URL_FRONTEND}/auth/failure`, // Front end URL Login Google Failed
  }),
  handleGoogleLogin
);

router.get("/logout", handleLogout);

export default router;
