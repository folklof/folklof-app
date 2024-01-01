import ReviewDao from "../dao/reviewDao";
import ReviewService from "../service/reviewService";
import { Request, Response, NextFunction } from "express";

async function getAllReviews(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const result = await reviewService.getAllReviews();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all reviews",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List reviews not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createReview(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { book_id } = req.params;
    const { user_id, title, description, rating } = req.body;
    const result = await reviewService.createReview(
      book_id,
      user_id,
      title,
      description,
      rating
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a review",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getReviewById(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { id } = req.params as any;
    const result = await reviewService.getReviewById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a review",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getBookRatingAverage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { book_id } = req.params;
    const result = await reviewService.getBookRatingAverage(book_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get average rating & total book reviews",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getReviewByBookId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { book_id } = req.params as any;
    const result = await reviewService.getReviewByBookId(book_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get reviews by book ID",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateReviewById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { id, user_id } = req.params;
    const { title, description, rating } = req.body;
    const result = await reviewService.updateReviewById(
      id,
      user_id,
      title,
      description,
      rating
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a review",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getMostPopularBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { limit, page } = req.query as any;
    const result = await reviewService.getMostPopularBook(limit, page);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get most popular book",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteReviewById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const reviewDao = new ReviewDao(db);
  const reviewService = new ReviewService(reviewDao);

  try {
    const { id, user_id } = req.params;
    const result = await reviewService.deleteReviewById(id, user_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a review",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllReviews,
  updateReviewById,
  deleteReviewById,
  createReview,
  getReviewById,
  getBookRatingAverage,
  getReviewByBookId,
  getMostPopularBook
};
