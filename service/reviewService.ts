import StandardError from "../utils/constants/standardError";
import { IReviewDao, IReviewService } from "../utils/types";

class ReviewService implements IReviewService {
  private reviewDao: IReviewDao;

  constructor(reviewDao: IReviewDao) {
    this.reviewDao = reviewDao;
  }

  async getAllReviews() {
    try {
      const reviews = await this.reviewDao.getAllReviews();

      if (!reviews || reviews.length === 0) {
        throw new StandardError({
          success: false,
          message: "No reviews found",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: reviews,
      };
    } catch (error: any) {
      console.log(error, "Error getting all reviews");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createReview(
    book_id: string,
    user_id: string,
    title: string,
    description: string,
    rating: number
  ) {
    try {
      const getReviewBookID = await this.reviewDao.getBookById(book_id);
      const getUserReview = await this.reviewDao.getUserById(user_id);

      if (!getUserReview) {
        throw new StandardError({
          success: false,
          message: "Error creating a review: user not found",
          status: 404,
        });
      }

      if (!getReviewBookID) {
        throw new StandardError({
          success: false,
          message: "Error creating a review: book not found",
          status: 404,
        });
      }

      if (rating > 5 || rating < 1) {
        throw new StandardError({
          success: false,
          message: "Error creating a review: rating must be between 1 and 5",
          status: 400,
        });
      }
      const result = await this.reviewDao.createReview(
        book_id,
        user_id,
        title,
        description,
        rating
      );
      return {
        success: true,
        message: result,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error creating review");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateReviewById(
    id: string,
    user_id: string,
    title: string,
    description: string,
    rating: number
  ) {
    try {
      if (rating > 5 || rating < 1) {
        throw new StandardError({
          success: false,
          message: "Error creating a review: rating must be between 1 and 5",
          status: 400,
        });
      }

      const result = await this.reviewDao.updateReviewById(
        id,
        user_id,
        title,
        description,
        rating
      );

      return {
        success: true,
        message: result,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error updating review");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteReviewById(id: string, user_id: string): Promise<any> {
    try {
      const result = await this.reviewDao.deleteReviewById(id, user_id);

      if (!result) {
        throw new StandardError({
          success: false,
          message: "Review not found",
          status: 404,
        });
      }
      return {
        success: true,
        message: result,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error deleting review");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getReviewByBookId(book_id: string) {
    try {
      const reviews = await this.reviewDao.getReviewByBookId(book_id);

      if (!reviews || reviews.length === 0) {
        throw new StandardError({
          success: false,
          message: "No reviews found",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: reviews,
      };
    } catch (error: any) {
      console.log(error, "Error getting all reviews");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookRatingAverage(book_id: string) {
    try {
      const result = await this.reviewDao.getBookRatingAverage(book_id);

      if (!result || result.length === 0) {
        throw new StandardError({
          success: false,
          message: "Error getting average rating",
          status: 500,
        });
      }

      return {
        success: true,
        message: result,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error getting average rating");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getReviewById(id: string) {
    try {
      const result = await this.reviewDao.getReviewById(id);

      if (!result || result.length === 0) {
        throw new StandardError({
          success: false,
          message: "Review not found",
          status: 404,
        });
      }

      return {
        status: 200,
        success: true,
        message: result,
      };
    } catch (error: any) {
      console.log(error, "Error getting review by ID");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default ReviewService;
