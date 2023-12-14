import {
  dashboardAdminAccess,
  dashboardUserAccess,
} from "../controller/dashboardController";
import { Router } from "express";
import {
  isAuthenticatedGoogle,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/admin", isAuthenticatedGoogle, dashboardAdminAccess);
router.get("/user", isAuthenticatedGoogle, dashboardUserAccess);

export default router;
