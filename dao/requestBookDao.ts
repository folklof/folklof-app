import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import {
  IRequestBookAttributes,
  IRequestBookDao,
  IUserAttributes,
} from "../utils/types";

class RequestBookDao implements IRequestBookDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllRequestBooks(): Promise<IRequestBookAttributes[] | undefined> {
    try {
      const requestBooks = await this.db.requestBook.findMany();
      return requestBooks;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all request books",
        status: 500,
      });
    }
  }

  async getRequestBookById(
    id: string
  ): Promise<IRequestBookAttributes[] | undefined> {
    try {
      const requestBook = await this.db.requestBook.findUnique({
        where: {
          ID: id,
        },
      });
      return requestBook ? [requestBook] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting request book by ID",
        status: 500,
      });
    }
  }

  async getRequestBookByUserId(
    user_id: string
  ): Promise<IRequestBookAttributes[] | undefined> {
    try {
      const requestBook = await this.db.requestBook.findMany({
        where: {
          user_id: user_id,
        },
      });
      return requestBook ? requestBook : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting request book by user ID",
        status: 500,
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
      const getStatusRequestBook = await this.db.statusRequestBook.findFirst({
        where: {
          name: "Waiting for approval",
        },
      });

      if (!getStatusRequestBook) {
        throw new StandardError({
          success: false,
          message: "Error getting status request book",
          status: 500,
        });
      }

      const requestBook = await this.db.requestBook.create({
        data: {
          user_id: user_id,
          status_id: getStatusRequestBook.ID,
          title: title,
          desc: desc,
          cover_image: cover_image,
        },
      });
      return requestBook ? [requestBook] : [];
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: "Error creating request book",
        status: 500,
      });
    }
  }

  async getRequestBookByTitle(
    title: string
  ): Promise<IRequestBookAttributes[] | undefined> {
    try {
      const requestBook = await this.db.requestBook.findFirst({
        where: {
          title: title,
        },
      });
      console.log(requestBook);
      return requestBook ? [requestBook] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting request book by title",
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
  ): Promise<IRequestBookAttributes[] | undefined> {
    try {
      const requestBook = await this.db.requestBook.update({
        where: {
          ID: id,
        },
        data: {
          user_id: user_id,
          status_id: status_id,
          title: title,
          desc: desc,
          cover_image: cover_image,
        },
      });
      return requestBook ? [requestBook] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error updating request book",
        status: 500,
      });
    }
  }

  async deleteRequestBook(id: string): Promise<IRequestBookAttributes[] | any> {
    try {
      const requestBook = await this.db.requestBook.delete({
        where: {
          ID: id,
        },
      });
      return requestBook ? [requestBook] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error deleting request book",
        status: 500,
      });
    }
  }

  async getUserById(user_id: string): Promise<IUserAttributes | any> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          ID: user_id,
        },
      });
      return user;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting user by ID",
        status: 500,
      });
    }
  }
}

export default RequestBookDao;
