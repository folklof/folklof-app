import StandardError from "../utils/constants/standardError";
import { IRequestBookDao, IRequestBookService } from "../utils/types";

class RequestBookService implements IRequestBookService {
  private requestBookDao: IRequestBookDao;

  constructor(requestBookDao: IRequestBookDao) {
    this.requestBookDao = requestBookDao;
  }

  async getAllRequestBooks() {
    try {
      const requestBooks = await this.requestBookDao.getAllRequestBooks();

      if (!requestBooks || requestBooks.length === 0) {
        throw new StandardError({
          success: false,
          message: "No request book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: requestBooks,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getRequestBookById(id: string) {
    try {
      const requestBook = await this.requestBookDao.getRequestBookById(id);

      if (!requestBook || requestBook.length === 0) {
        throw new StandardError({
          success: false,
          message: "No request book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: requestBook,
        status: 200,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async getRequestBookByUserId(user_id: string) {
    try {
      const requestBook = await this.requestBookDao.getRequestBookByUserId(
        user_id
      );

      if (!requestBook || requestBook.length === 0) {
        throw new StandardError({
          success: false,
          message: "No request book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: requestBook,
        status: 200,
      };
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async createRequestBook(
    user_id: string,
    title: string,
    desc: string,
    cover_image: string
  ) {
    try {
      const getUserById = await this.requestBookDao.getUserById(user_id);
      const existingRequestBook =
        await this.requestBookDao.getRequestBookByTitle(title);

      if (!getUserById) {
        throw new StandardError({
          success: false,
          message: "No user found",
          status: 404,
        });
      }

      if (existingRequestBook) {
        throw new StandardError({
          success: false,
          message: "Error: A request book with the same title already exists",
          status: 400,
        });
      }

      if (desc.length > 2500) {
        throw new StandardError({
          success: false,
          message:
            "Error: Description exceeds the maximum character limit of 2500",
          status: 400,
        });
      }

      const requestBook = await this.requestBookDao.createRequestBook(
        user_id,
        title,
        desc,
        cover_image
      );

      return {
        success: true,
        message: requestBook,
        status: 200,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async updateRequestBook(
    id: string,
    user_id: string,
    status_id: string,
    title: string,
    desc: string,
    cover_image: string
  ) {
    try {
      const getUserById = await this.requestBookDao.getUserById(user_id);

      if (!getUserById) {
        throw new StandardError({
          success: false,
          message: "No user found",
          status: 404,
        });
      }

      if (desc.length > 2500) {
        throw new StandardError({
          success: false,
          message:
            "Error: Description exceeds the maximum character limit of 2500",
          status: 400,
        });
      }

      const requestBook = await this.requestBookDao.updateRequestBook(
        id,
        user_id,
        status_id,
        title,
        desc,
        cover_image
      );

      return {
        success: true,
        message: requestBook,
        status: 200,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async deleteRequestBook(id: string) {
    try {
      const requestBook = await this.requestBookDao.deleteRequestBook(id);

      return {
        success: true,
        message: requestBook,
        status: 200,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }
}

export default RequestBookService;
