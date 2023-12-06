import {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
} from "../controller/categoryController";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;
  if (name) {
    await getCategoryByName(req, res, next);
  } else {
    await getAllCategories(req, res, next);
  }
});
router.get("/:id", getCategoryById);

export default router;
