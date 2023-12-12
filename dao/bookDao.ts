import StandardError from "../utils/constants/standardError";
import { PrismaClient } from "@prisma/client";
import {
  IBookDao,
  IBookAttributes,
  ICategoryAttributes,
  IAgeGroupAttributes,
} from "../utils/types";
import { generateJakartaDate } from "../utils/helpers/jakartaTime";
import { ca } from "date-fns/locale";

class BookDao implements IBookDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createBook(
    title: string,
    category_id: string,
    agegroup_id: string,
    desc: string,
    duration: string,
    audio_link: string,
    cover_image: string
  ): Promise<IBookAttributes | any> {
    const book_code = `HAN-${Math.floor(Math.random() * 1000)}`;

    console.log(agegroup_id, "agegroup_id");
    console.log(category_id, "category_id");

    try {
      const result = await this.db.book.create({
        data: {
          book_code,
          category_id,
          agegroup_id,
          title,
          desc,
          duration,
          audio_link,
          cover_image,
          created_date: generateJakartaDate(),
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

  async getAllBooks(
    page?: number,
    limit?: number,
    sort?: number,
    agegroup_id?: string,
    category_id?: string
  ): Promise<IBookAttributes[] | undefined> {
    const convertPage = Number(page) || 1;
    const convertLimit = Number(limit) || 25;
    const converSort = Number(sort) || 2;

    console.log(category_id, "category_id");
    console.log(agegroup_id, "agegroup_id");
    try {
      const sortOptions = converSort === 2 ? "desc" : "asc";
      let whereClause: any = {};

      if (category_id) {
        whereClause.category_id = category_id;
      }

      if (agegroup_id) {
        whereClause.agegroup_id = agegroup_id;
      }

      const books = await this.db.book.findMany({
        skip: (convertPage - 1) * convertLimit,
        take: convertLimit,
        orderBy: {
          created_date: sortOptions,
        },
        where: whereClause,
        include: {
          category: true,
          agegroup: true,
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
    agegroup_id: string,
    desc: string,
    duration: string,
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
          agegroup_id,
          desc,
          duration,
          audio_link,
          cover_image,
        },
      });

      return result ? [result] : [];
    } catch (error: any) {
      console.log(error, "Error updating book");
      throw new StandardError({
        success: false,
        message: "Error updating book. Please make sure you input valid data",
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
      const book = await this.db.book.findFirst({
        where: {
          category_id: category_id,
        },
      });

      return book ? [book] : [];
    } catch (error: any) {
      console.log(error, "Error retrieving book by category");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by category",
        status: 500,
      });
    }
  }

  async getBookByAgeGroupId(
    agegroup_id: string
  ): Promise<IBookAttributes[] | undefined> {
    try {
      const book = await this.db.book.findMany({
        where: {
          agegroup_id: agegroup_id,
        },
      });

      return book;
    } catch (error: any) {
      console.log(error, "Error retrieving book by agegroup");
      throw new StandardError({
        success: false,
        message: "Error retrieving book by agegroup",
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

  async getOneBookByTitle(title: string): Promise<IBookAttributes | undefined> {
    try {
      const book = await this.db.book.findFirst({
        where: {
          title: title,
        },
      });
      return book ? book : undefined;
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

  async getCategoryById(
    id: string
  ): Promise<ICategoryAttributes[] | undefined> {
    try {
      const category = await this.db.category.findUnique({
        where: {
          ID: id,
        },
      });

      return category ? [category] : [];
    } catch (error: any) {
      console.log(error, "Error retrieving category by ID");
      throw new StandardError({
        success: false,
        message: "Error retrieving category by ID",
        status: 500,
      });
    }
  }

  async getAgeGroupById(
    id: string
  ): Promise<IAgeGroupAttributes[] | undefined> {
    try {
      const ageGroup = await this.db.ageGroup.findUnique({
        where: {
          ID: id,
        },
      });
      return ageGroup ? [ageGroup] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting age group by ID",
        status: 500,
      });
    }
  }
}

export default BookDao;
