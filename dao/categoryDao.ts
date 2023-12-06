import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import { ICategoryDao, ICategoryAttributes } from "../utils/types";

class CategoryDao implements ICategoryDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createCategory(
    name: string,
    desc: string
  ): Promise<ICategoryAttributes | any> {
    try {
      const result = await this.db.category.create({
        data: {
          name,
          desc,
        },
      });

      return result;
    } catch (error: any) {
      console.log(error, "Error creating category");
      throw new StandardError({
        success: false,
        message: "Error creating category",
        status: 500,
      });
    }
  }

  async getAllCategories(): Promise<ICategoryAttributes[] | undefined> {
    try {
      const categories = await this.db.category.findMany({
        orderBy: {
          name: "asc",
        },
      });
      return categories;
    } catch (error: any) {
      console.log(error, "Error retrieving all category");
      throw new StandardError({
        success: false,
        message: "Error retrieving all category",
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

  async getOneCategoryByName(
    name: string
  ): Promise<ICategoryAttributes[] | undefined> {
    try {
      const category = await this.db.category.findFirst({
        where: {
          name: name,
        },
      });
      return category ? [category] : [];
    } catch (error: any) {
      console.log(error, "Error retrieving category by name");
      throw new StandardError({
        success: false,
        message: "Error retrieving category by name",
        status: 500,
      });
    }
  }

  async getCategoryByName(
    name: string
  ): Promise<ICategoryAttributes[] | undefined> {
    try {
      const category = await this.db.category.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });

      return category;
    } catch (error: any) {
      console.log(error, "Error retrieving category by name");
      throw new StandardError({
        success: false,
        message: "Error retrieving category by name",
        status: 500,
      });
    }
  }

  async updateCategory(
    id: string,
    name: string,
    desc: string
  ): Promise<ICategoryAttributes | any> {
    try {
      const result = await this.db.category.update({
        where: {
          ID: id,
        },
        data: {
          name,
          desc,
        },
      });

      return result;
    } catch (error: any) {
      console.log(error, "Error updating category");
      throw new StandardError({
        success: false,
        message: "Error updating category",
        status: 500,
      });
    }
  }

  async deleteCategory(id: string): Promise<ICategoryAttributes | any> {
    try {
      const result = await this.db.category.delete({
        where: {
          ID: id,
        },
      });

      return result;
    } catch (error: any) {
      console.log(error, "Error deleting category");
      throw new StandardError({
        success: false,
        message: "Error deleting category",
        status: 500,
      });
    }
  }
}

export default CategoryDao;
