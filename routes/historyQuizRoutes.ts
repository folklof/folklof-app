import {
  getAllHistoryQuizzes,
  getHistoryQuizByBookQuizId,
  getHistoryQuizById,
  getHistoryQuizByUserId,
  createHistoryQuiz,
  updateScoresHistoryQuizById,
  deleteHistoryQuizById,
  calculateTotalScoreForUserInBookQuiz,
  calculateTotalScoreForUserInAllBookQuiz,
} from "../controller/historyQuizController";
import { Router } from "express";

const router = Router();

router.get("/", getAllHistoryQuizzes);
router.get("/:id", getHistoryQuizById);
router.get("/user/:user_id", getHistoryQuizByUserId);
router.get("/book/:book_id", getHistoryQuizByBookQuizId);
router.get(
  "/user/:user_id/book/:bookquiz_id/total",
  calculateTotalScoreForUserInBookQuiz
);
router.get("/user/:user_id/total", calculateTotalScoreForUserInAllBookQuiz);
router.post("/", createHistoryQuiz);
router.put("/:id", updateScoresHistoryQuizById);
router.delete("/:id", deleteHistoryQuizById);

export default router;
