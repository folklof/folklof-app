import { Router, Request, Response, NextFunction } from "express";
import {
  getBookByCode,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookByTitle,
  getBookByCategoryId,
} from "../controller/bookController";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.query;
  if (title) {
    await getBookByTitle(req, res, next);
  } else {
    await getAllBooks(req, res, next);
  }
});
router.get("/:id", getBookById);
router.get("/code/:code", getBookByCode);
router.get("/category/:category_id", getBookByCategoryId);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
