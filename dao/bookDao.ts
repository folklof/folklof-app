import StandardError from "../utils/constants/standardError";
import { PrismaClient } from "@prisma/client";
import { IBookDao, IBookAttributes } from "../utils/types";

class BookDao implements IBookDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createBook(
    title: string,
    category_id: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ): Promise<IBookAttributes | undefined> {
    const book_code = `HAN-${Math.floor(Math.random() * 1000)}`;
    try {
      const result = await this.db.book.create({
        data: {
          category_id,
          book_code,
          title,
          desc,
          audio_link,
          cover_image,
        },
      });

      return result;
    } catch (error: any) {
      console.log(error, "Error creating book");
      throw new StandardError({
        success: false,
        message: "Error creating book",
        status: 500,
      });
    }
  }

  async getAllBooks(): Promise<IBookAttributes[] | undefined> {
    try {
      const books = await this.db.book.findMany({
        orderBy: {
          title: "asc",
        },
      });
      return books;
    } catch (error: any) {
      console.log(error, "Error retrieving all books");
      throw new StandardError({
        success: false,
        message: "Error retrieving all books",
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

  async updateBook(
    id: string,
    title: string,
    category_id: string,
    desc: string,
    audio_link: string,
    cover_image: string
  ): Promise<IBookAttributes[] | undefined> {
    try {
      const result = await this.db.book.update({
        where: {
          ID: id,
        },
        data: {
          title,
          category_id,
          desc,
          audio_link,
          cover_image,
        },
      });

      return result ? [result] : [];
    } catch (error: any) {
      console.log(error, "Error updating book");
      throw new StandardError({
        success: false,
        message: "Error updating book",
        status: 500,
      });
    }
  }

  async getBookByCode(
    book_code: string
  ): Promise<IBookAttributes[] | undefined> {
    try {
      const book = await this.db.book.findFirst({
        where: { book_code: book_code },
      });
      return book as any;
    } catch (error: any) {
      console.log(error, "Error retrieving book by code");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by code",
        status: 500,
      });
    }
  }

  async getBookByCategoryId(
    category_id: string
  ): Promise<IBookAttributes[] | undefined> {
    try {
      const book = await this.db.book.findMany({
        where: {
          category_id: category_id,
        },
      });

      return book;
    } catch (error: any) {
      console.log(error, "Error retrieving book by category");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by category",
        status: 500,
      });
    }
  }

  async getBookByTitle(title: string): Promise<IBookAttributes[] | undefined> {
    try {
      const book = await this.db.book.findMany({
        where: {
          title: {
            contains: title,
          },
        },
      });

      return book;
    } catch (error: any) {
      console.log(error, "Error retrieving book by title");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by title",
        status: 500,
      });
    }
  }

  async deleteBook(id: string): Promise<IBookAttributes[] | undefined> {
    try {
      const result = await this.db.book.delete({
        where: {
          ID: id,
        },
      });

      return result ? [result] : [];
    } catch (error: any) {
      console.log(error, "Error deleting book");
      throw new StandardError({
        success: false,
        message: "Error deleting book",
        status: 500,
      });
    }
  }
}

export default BookDao;
