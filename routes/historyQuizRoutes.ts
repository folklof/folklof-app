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
  getHistoryQuizByUserIdAndBookQuizId,
  getAttemptQuizByUserIdAndBookQuizId,
} from "../controller/historyQuizController";
import { Router } from "express";

const router = Router();

router.get("/", getAllHistoryQuizzes);
router.get("/:id", getHistoryQuizById);
router.get("/user/:user_id", getHistoryQuizByUserId);
router.get("/book/:bookquiz_id", getHistoryQuizByBookQuizId);
router.get(
  "/user/:user_id/bookquiz/:bookquiz_id/total",
  calculateTotalScoreForUserInBookQuiz
);
router.get("/attempt/quiz/user/:user_id/bookquiz/:bookquiz_id", getAttemptQuizByUserIdAndBookQuizId)
router.get(
  "/bookquiz/:bookquiz_id/user/:user_id",
  getHistoryQuizByUserIdAndBookQuizId
);
router.get("/user/:user_id/total", calculateTotalScoreForUserInAllBookQuiz);
router.post("/", createHistoryQuiz);
router.put("/:id", updateScoresHistoryQuizById);
router.delete("/:id", deleteHistoryQuizById);

export default router;
