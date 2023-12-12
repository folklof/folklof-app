import StandardError from "../utils/constants/standardError";
import { IBookService, IBookDao } from "../utils/types";

class BookService implements IBookService {
  private bookDao: IBookDao;

  constructor(bookDao: IBookDao) {
    this.bookDao = bookDao;
  }

  async createBook(
    title: string,
    category_id: string,
    agegroup_id: string,
    desc: string,
    duration: string,
    audio_link: string,
    cover_image: string
  ) {
    try {
      const getCategoryId = await this.bookDao.getCategoryById(category_id);
      const getAgeGroupById = await this.bookDao.getAgeGroupById(agegroup_id);
      const getBookTitle = await this.bookDao.getOneBookByTitle(title);

      if (!getAgeGroupById || getAgeGroupById.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error creating a book: Age group not found. Please check the age group ID",
          status: 404,
        });
      }

      if (!getCategoryId || getCategoryId.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error creating a book: Category not found. Please check the category ID",
          status: 404,
        });
      }

      if (getBookTitle) {
        throw new StandardError({
          success: false,
          message: "Error creating a book: Book title already exists",
          status: 400,
        });
      }

      const book = await this.bookDao.createBook(
        title,
        category_id,
        agegroup_id,
        desc,
        duration,
        audio_link,
        cover_image
      );

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error creating book");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getAllBooks(
    page: number,
    limit: number,
    sort: number,
    agegroup_id: string,
    category_id: string
  ) {
    try {
      const books = await this.bookDao.getAllBooks(
        page,
        limit,
        sort,
        category_id,
        agegroup_id
      );

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving all books");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookById(id: string) {
    try {
      const book = await this.bookDao.getBookById(id);

      if (!book || book.length === 0) {
        throw new StandardError({
          success: false,
          message: "No book found",
          status: 404,
        });
      }

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by ID");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateBook(
    id: string,
    title: string,
    category_id: string,
    agegroup_id: string,
    duration: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ) {
    try {
      const getCategoryId = await this.bookDao.getCategoryById(category_id);
      const getAgeGroupById = await this.bookDao.getAgeGroupById(agegroup_id);
      const getBookTitle = await this.bookDao.getOneBookByTitle(title);

      if (!getAgeGroupById || getAgeGroupById.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error updating a book: Age group not found. Please check the age group ID",
          status: 404,
        });
      }

      if (!getCategoryId || getCategoryId.length === 0) {
        throw new StandardError({
          success: false,
          message:
            "Error updating a book: Category not found. Please check the category ID",
          status: 404,
        });
      }

      if (getBookTitle) {
        throw new StandardError({
          success: false,
          message: "Error updating a book: Book title already exists",
          status: 400,
        });
      }

      const book = await this.bookDao.updateBook(
        id,
        title,
        category_id,
        agegroup_id,
        desc,
        duration,
        audio_link,
        cover_image
      );

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error updating book");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookByAgeGroupId(agegroup_id: string): Promise<any> {
    try {
      const books = await this.bookDao.getBookByAgeGroupId(agegroup_id);

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by age group");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by age group",
        status: 500,
      });
    }
  }

  async deleteBook(id: string) {
    try {
      const book = await this.bookDao.deleteBook(id);

      if (!book || book.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error deleting book");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookByCategoryId(category_id: string) {
    try {
      const books = await this.bookDao.getBookByCategoryId(category_id);

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by category");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by category",
        status: 500,
      });
    }
  }

  async getBookByTitle(title: string) {
    try {
      const books = await this.bookDao.getBookByTitle(title);

      if (!books || books.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: books,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by title");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getBookByCode(book_code: string) {
    try {
      const book = await this.bookDao.getBookByCode(book_code);

      if (!book || book.length === 0) {
        throw new StandardError({
          success: false,
          message: "Book not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: book,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error retrieving book by code");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default BookService;
