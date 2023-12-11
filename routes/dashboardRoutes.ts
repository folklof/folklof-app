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

router.get("/admin", adminAuthorization, dashboardAdminAccess);
router.get("/user", isAuthenticatedGoogle, dashboardUserAccess);

export default router;
