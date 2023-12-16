import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import {
  ILibraryDao,
  ILibraryAttributes,
  IUserAttributes,
} from "../utils/types";

class LibraryDao implements ILibraryDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllLibraries(): Promise<ILibraryAttributes[] | undefined> {
    try {
      const libraries = await this.db.library.findMany({
        include: {
          book: true,
          user: true,
        },
      });
      return libraries;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all libraries",
        status: 500,
      });
    }
  }

  async getLibraryById(id: string): Promise<ILibraryAttributes[] | undefined> {
    try {
      const library = await this.db.library.findUnique({
        where: {
          ID: id,
        },
        include: {
          book: true,
          user: true,
        },
      });
      return library ? [library] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting library by ID",
        status: 500,
      });
    }
  }

  async getLibraryByUserId(
    user_id: string
  ): Promise<ILibraryAttributes[] | undefined> {
    try {
      const library = await this.db.library.findMany({
        where: {
          user_id: user_id,
        },
        include: {
          book: true,
          user: true,
        },
      });

      return library;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting library by user ID",
        status: 500,
      });
    }
  }

  async createLibrary(
    user_id: string,
    book_id: string,
    is_read: boolean
  ): Promise<any> {
    try {
      const library = await this.db.library.create({
        data: {
          user_id: user_id,
          book_id: book_id,
          is_read: is_read,
        },
      });

      return library;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error creating library",
        status: 500,
      });
    }
  }

  async getLibraryIsReadByUserId(
    user_id: string,
    is_read: boolean
  ): Promise<ILibraryAttributes[] | undefined> {
    try {
      const library = await this.db.library.findMany({
        where: {
          user_id: user_id,
          is_read: is_read,
        },
        include: {
          book: true,
          user: true,
        },
      });

      return library;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting library by user ID",
        status: 500,
      });
    }
  }

  async updateIsReadLibraryById(
    id: string,
    is_read: boolean
  ): Promise<ILibraryAttributes | undefined> {
    try {
      const library = await this.db.library.update({
        where: {
          ID: id,
        },
        data: {
          is_read: is_read,
        },
      });

      return library;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error updating library by ID",
        status: 500,
      });
    }
  }

  async deleteLibraryById(id: string): Promise<ILibraryAttributes | undefined> {
    try {
      const library = await this.db.library.delete({
        where: {
          ID: id,
        },
      });

      return library;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error deleting library by ID",
        status: 500,
      });
    }
  }

  async getUserById(user_id: string): Promise<IUserAttributes[] | any> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          ID: user_id,
        },
      });

      return user ? [user] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting user by ID",
        status: 500,
      });
    }
  }
}

export default LibraryDao;
