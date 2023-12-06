import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import {
  handleGoogleLogin,
  handleLoginFailed,
  handleLogout,
} from "../controller/authController";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req: Request, res: Response) => {
    res.redirect("/api/v1/auth/success");
  }
);

router.get("/success", handleGoogleLogin);
router.get("/failure", handleLoginFailed);
router.get("/logout", handleLogout);

export default router;
