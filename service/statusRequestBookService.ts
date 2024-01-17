import StandardError from "../utils/constants/standardError";
import {
  IStatusRequestBookDao,
  IStatusRequestBookService,
} from "../utils/types";

class StatusRequestBookService implements IStatusRequestBookService {
  private statusRequestBookDao: IStatusRequestBookDao;

  constructor(statusRequestBookDao: IStatusRequestBookDao) {
    this.statusRequestBookDao = statusRequestBookDao;
  }

  async getAllStatusRequestBooks() {
    try {
      const statusRequestBooks =
        await this.statusRequestBookDao.getAllStatusRequestBooks();

      if (!statusRequestBooks || statusRequestBooks.length === 0) {
        throw new StandardError({
          success: false,
          message: "No status request book list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: statusRequestBooks,
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

  async createStatusRequestBook(name: string, desc: string) {
    try {
      const statusRequestBook =
        await this.statusRequestBookDao.createStatusRequestBook(name, desc);

      if (!statusRequestBook || statusRequestBook.length === 0) {
        throw new StandardError({
          success: false,
          message: "No status request book created",
          status: 404,
        });
      }

      return {
        success: true,
        message: statusRequestBook,
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

  async updateStatusRequestBook(id: string, name: string, desc: string) {
    try {
      const statusRequestBook =
        await this.statusRequestBookDao.updateStatusRequestBook(id, name, desc);

      if (!statusRequestBook || statusRequestBook.length === 0) {
        throw new StandardError({
          success: false,
          message: "No status request book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: statusRequestBook,
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

  async deleteStatusRequestBook(id: string) {
    try {
      const statusRequestBook =
        await this.statusRequestBookDao.deleteStatusRequestBook(id);

      if (!statusRequestBook || statusRequestBook.length === 0) {
        throw new StandardError({
          success: false,
          message: "No status request book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: statusRequestBook,
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
}

export default StatusRequestBookService;
