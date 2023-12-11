import {
  getAgeGroupById,
  getAllAgeGroups,
} from "../controller/ageGroupController";
import { Router } from "express";

const router = Router();

router.get("/", getAllAgeGroups);
router.get("/:id", getAgeGroupById);

export default router;