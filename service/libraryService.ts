import { is } from "date-fns/locale";
import StandardError from "../utils/constants/standardError";
import { ILibraryDao, ILibraryService } from "../utils/types";

class LibraryService implements ILibraryService {
  private libraryDao: ILibraryDao;

  constructor(libraryDao: ILibraryDao) {
    this.libraryDao = libraryDao;
  }

  async getAllLibraries() {
    try {
      const libraries = await this.libraryDao.getAllLibraries();

      if (!libraries || libraries.length === 0) {
        throw new StandardError({
          success: false,
          message: "No library list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: libraries,
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

  async createLibrary(
    user_id: string,
    book_id: string,
    is_read: boolean
  ): Promise<any> {
    const allowedIsRead = [true, false];
    if (!allowedIsRead.includes(is_read)) {
      throw new StandardError({
        success: false,
        message: "error create a library: is_read must be true or false",
        status: 400,
      });
    }

    try {
      const existingLibrary = await this.libraryDao.getLibraryByUserIdAndBookId(
        user_id,
        book_id
      );
      if (existingLibrary?.length !== 0) {
        throw new StandardError({
          success: false,
          message:
            "error create a library: User already has a library with the same book",
          status: 400,
        });
      }
      const library = await this.libraryDao.createLibrary(
        user_id,
        book_id,
        is_read
      );
      return {
        success: true,
        message: library,
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

  async updateIsReadLibraryById(id: string, is_read: boolean): Promise<any> {
    const allowedIsRead = [true, false];
    if (!allowedIsRead.includes(is_read)) {
      throw new StandardError({
        success: false,
        message: "error updating a library: is_read must be true or false",
        status: 400,
      });
    }
    try {
      const library = await this.libraryDao.updateIsReadLibraryById(
        id,
        is_read
      );
      return {
        success: true,
        message: library,
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

  async getLibraryIsReadByUserId(user_id: string, is_read: boolean) {
    const allowedIsRead = [true, false];
    if (!allowedIsRead.includes(is_read)) {
      throw new StandardError({
        success: false,
        message: "error updating a library: is_read must be true or false",
        status: 400,
      });
    }
    try {
      const library = await this.libraryDao.getLibraryIsReadByUserId(
        user_id,
        is_read
      );

      if (!library || library.length === 0) {
        throw new StandardError({
          success: false,
          message: "No library list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: library,
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

  async deleteLibraryById(id: string): Promise<any> {
    try {
      const library = await this.libraryDao.deleteLibraryById(id);
      return {
        success: true,
        message: library,
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

  async getLibraryByUserId(user_id: string): Promise<any> {
    try {
      const library = await this.libraryDao.getLibraryByUserId(user_id);

      if (!library || library.length === 0) {
        throw new StandardError({
          success: false,
          message: "No library list found",
          status: 404,
        });
      }
      return {
        success: true,
        message: library,
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

export default LibraryService;
