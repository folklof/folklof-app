import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import {
  IStatusRequestBookAttributes,
  IStatusRequestBookDao,
} from "../utils/types";

class StatusRequestBookDao implements IStatusRequestBookDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllStatusRequestBooks(): Promise<
    IStatusRequestBookAttributes[] | undefined
  > {
    try {
      const statusRequestBooks = await this.db.statusRequestBook.findMany();
      return statusRequestBooks;
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: "Error getting all status request books",
        status: 500,
      });
    }
  }

  async createStatusRequestBook(
    name: string,
    desc: string
  ): Promise<IStatusRequestBookAttributes[] | undefined> {
    try {
      const statusRequestBook = await this.db.statusRequestBook.create({
        data: {
          name: name,
          desc: desc,
        },
      });
      return statusRequestBook ? [statusRequestBook] : [];
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: "Error creating status request book",
        status: 500,
      });
    }
  }

  async updateStatusRequestBook(
    id: string,
    name: string,
    desc: string
  ): Promise<IStatusRequestBookAttributes[] | undefined> {
    try {
      const statusRequestBook = await this.db.statusRequestBook.update({
        where: {
          ID: id,
        },
        data: {
          name: name,
          desc: desc,
        },
      });
      return statusRequestBook ? [statusRequestBook] : [];
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: "Error updating status request book",
        status: 500,
      });
    }
  }

  async deleteStatusRequestBook(
    id: string
  ): Promise<IStatusRequestBookAttributes[] | undefined> {
    try {
      const statusRequestBook = await this.db.statusRequestBook.delete({
        where: {
          ID: id,
        },
      });
      return statusRequestBook ? [statusRequestBook] : [];
    } catch (error: any) {
      console.log(error.message);
      throw new StandardError({
        success: false,
        message: "Error deleting status request book",
        status: 500,
      });
    }
  }
}

export default StatusRequestBookDao;
