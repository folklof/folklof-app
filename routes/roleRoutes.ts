import { getAllRoles, getRoleById } from "../controller/roleController";
import { Router } from "express";

const router = Router();

router.get("/", getAllRoles);
router.get("/:id", getRoleById);

export default router;
