import {
  getAllReviews,
  getReviewById,
  createReview,
  getBookRatingAverage,
  getReviewByBookId,
  updateReviewById,
  deleteReviewById,
} from "../controller/reviewController";
import { Router } from "express";

const router = Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/rating/:book_id", getBookRatingAverage);
router.post("/book/:book_id", createReview);
router.get("/book/:book_id", getReviewByBookId);
router.put("/:id/:user_id", updateReviewById);
router.delete("/:id/:user_id", deleteReviewById);

export default router;
