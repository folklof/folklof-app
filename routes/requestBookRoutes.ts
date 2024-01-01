import {
  getAllRequestBooks,
  getRequestBookByUserId,
  getRequestBookById,
  createRequestBook,
  updateRequestBookById,
  deleteRequestBookById
} from "../controller/requestBookController";
import { Router } from "express";

const router = Router();

router.get("/", getAllRequestBooks);
router.get("/:id", getRequestBookById);
router.get("/user/:user_id", getRequestBookByUserId);
router.post("/", createRequestBook);
router.put("/:id", updateRequestBookById);
router.delete("/:id", deleteRequestBookById);

export default router;
