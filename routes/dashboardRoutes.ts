import {
  dashboardAdminAccess,
  dashboardUserAccess,
} from "../controller/dashboardController";
import { Router } from "express";
import {
  adminAuthorization,
  isAuthenticatedGoogle,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/admin", isAuthenticatedGoogle, dashboardAdminAccess);
router.get("/user", adminAuthorization, dashboardUserAccess);

export default router;
