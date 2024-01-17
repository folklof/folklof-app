import {
  getAllStatusRequestBooks,
  createStatusRequestBook,
  updateStatusRequestBookById,
  deleteStatusRequestBookById,
} from "../controller/statusRequestBookController";
import { Router } from "express";

const router = Router();

router.get("/", getAllStatusRequestBooks);
router.post("/", createStatusRequestBook);
router.put("/:id", updateStatusRequestBookById);
router.delete("/:id", deleteStatusRequestBookById);

export default router;
