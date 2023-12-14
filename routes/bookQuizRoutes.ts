import {
  createBookQuiz,
  getBookQuizByBookId,
  getBookQuizById,
  getAllBookQuizzes,
  updateBookQuiz,
  answerBookQuiz,
  deleteBookQuiz,
} from "../controller/bookQuizController";
import { Router } from "express";

const router = Router();

router.get("/", getAllBookQuizzes);
router.get("/:id", getBookQuizById);
router.get("/book/:book_id", getBookQuizByBookId);
router.post("/answer/:id", answerBookQuiz);
router.post("/", createBookQuiz);
router.put("/:id", updateBookQuiz);
router.delete("/:id", deleteBookQuiz);

export default router;
