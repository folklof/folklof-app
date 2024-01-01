import StandardError from "../utils/constants/standardError";
import { generateJakartaDate } from "../utils/helpers/jakartaTime";
import {
  IReviewAttributes,
  IReviewDao,
  IUserAttributes,
  IBookAttributes,
} from "../utils/types";
import { PrismaClient } from "@prisma/client";

class ReviewDao implements IReviewDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllReviews(): Promise<IReviewAttributes[] | any> {
    try {
      const reviews = await this.db.review.findMany({
        orderBy: {
          created_date: "desc",
        },
        include: {
          user: true,
          book: true,
        },
      });
      return reviews;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all reviews",
        status: 500,
      });
    }
  }

  async createReview(
    book_id: string,
    user_id: string,
    title: string,
    description: string,
    rating: number
  ): Promise<IReviewAttributes | any> {
    try {
      const result = await this.db.review.create({
        data: {
          book_id,
          user_id,
          title,
          description,
          rating,
          created_date: generateJakartaDate(),
        },
      });

      return result;
    } catch (error: any) {
      console.log(error, "Error creating review");
      throw new StandardError({
        success: false,
        message: "Error creating review",
        status: 500,
      });
    }
  }

  async updateReviewById(
    id: string,
    user_id: string,
    title: string,
    description: string,
    rating: number
  ): Promise<IReviewAttributes | any> {
    try {
      const review = await this.db.review.findUnique({
        where: {
          ID: id,
        },
      });

      if (!review) {
        throw new StandardError({
          success: false,
          message: "Review not found",
          status: 404,
        });
      }

      console.log("perbandingan", review.user_id, user_id);

      if (review.user_id !== user_id) {
        throw new StandardError({
          success: false,
          message: "You are not authorized to delete this review",
          status: 403,
        });
      }
      const result = await this.db.review.update({
        where: {
          ID: id,
        },
        data: {
          title,
          description,
          rating,
        },
      });

      return result;
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
      const review = await this.db.review.findUnique({
        where: {
          ID: id,
        },
      });

      const user = await this.db.user.findUnique({
        where: {
          ID: user_id,
        },
      });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      if (!review) {
        throw new StandardError({
          success: false,
          message: "Review not found",
          status: 404,
        });
      }

      if (review.user_id !== user_id || user.role_id !== 3) {
        throw new StandardError({
          success: false,
          message: "You are not authorized to delete this review",
          status: 403,
        });
      }

      const result = await this.db.review.delete({
        where: {
          ID: id,
        },
      });

      return result;
    } catch (error: any) {
      console.log(error, "Error deleting review");
      throw new StandardError({
        success: false,
        message: "Error deleting review",
        status: 500,
      });
    }
  }

  async getReviewByBookId(book_id: string): Promise<IReviewAttributes[] | any> {
    try {
      const reviews = await this.db.review.findMany({
        where: {
          book_id: book_id,
        },
        orderBy: {
          created_date: "desc",
        },
        include: {
          user: true,
          book: true,
        },
      });

      return reviews;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting reviews by book ID",
        status: 500,
      });
    }
  }

  async getBookRatingAverage(
    book_id: string
  ): Promise<{ average: number; ratings: IReviewAttributes[] } | any> {
    try {
      const result = await this.db.review.aggregate({
        _avg: {
          rating: true,
        },
        where: {
          book_id,
          rating: {
            not: null,
          },
        },
      });

      console.log(result, "result");

      const totalBookReviews = await this.db.review.count({
        where: {
          book_id,
          rating: {
            not: null,
          },
        },
      });

      if (result && totalBookReviews) {
        return {
          avgRating: result._avg.rating,
          totalBookReviews,
        };
      } else {
        return {
          avgRating: 0,
          totalBookReviews: 0,
        };
      }
    } catch (error: any) {
      console.log(error, "Error getting average rating");
      throw new StandardError({
        success: false,
        message: "Error getting average rating & total book reviews",
        status: 500,
      });
    }
  }

  async getMostPopularBook(limit: number, page: number): Promise<any> {
    const convertPage = Number(page) || 1;
    const convertLimit = Number(limit) || 5;

    try {
      const bestStories = await this.db.review.groupBy({
        by: ["book_id"],
        _count: true,
        _avg: {
          rating: true,
        },
        orderBy: [
          {
            _count: {
              book_id: "desc",
            },
          },
          {
            _avg: {
              rating: "desc",
            },
          },
        ],
        take: convertLimit,
        skip: (convertPage - 1) * convertLimit,
      });

      const formattedBestStories = await Promise.all(
        bestStories.map(async (review) => {
          const [book] = await Promise.all([
            this.db.book.findUnique({
              where: {
                ID: review.book_id,
              },
            }),
          ]);

          return {
            book_id: review.book_id,
            total_reviews: review._count,
            avg_rating: review._avg.rating,
            book: book || null,
          };
        })
      );

      return formattedBestStories;
    } catch (error) {
      console.error("Error fetching best stories:", error);
      throw new StandardError({
        success: false,
        message: "Error retrieving most popular book",
        status: 500,
      });
    }
  }

  async getReviewById(id: string): Promise<IReviewAttributes | any> {
    try {
      const review = await this.db.review.findUnique({
        where: {
          ID: id,
        },
        include: {
          user: true,
          book: true,
        },
      });

      return review;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting review by ID",
        status: 500,
      });
    }
  }

  async getUserById(id: string): Promise<IUserAttributes | any> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          ID: id,
        },
      });

      return user;
    } catch (error: any) {
      console.log(error, "Error retrieving user by ID");
      throw new StandardError({
        success: false,
        message: "Error retrieving user by ID",
        status: 500,
      });
    }
  }

  async getBookById(id: string): Promise<IBookAttributes | any> {
    try {
      const book = await this.db.book.findUnique({
        where: {
          ID: id,
        },
      });

      return book;
    } catch (error: any) {
      console.log(error, "Error retrieving book by ID");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by ID",
        status: 500,
      });
    }
  }
}

export default ReviewDao;
