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
          description: desc,
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
    id: number
  ): Promise<ICategoryAttributes[] | undefined> {
    try {
      const categoryId = parseInt(String(id), 10);
      const category = await this.db.category.findUnique({
        where: {
          ID: categoryId,
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
    id: number,
    name: string,
    desc: string
  ): Promise<ICategoryAttributes | any> {
    try {
      const categoryId = parseInt(String(id), 10);
      const result = await this.db.category.update({
        where: {
          ID: categoryId,
        },
        data: {
          name,
          description: desc,
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

  async deleteCategory(id: number): Promise<ICategoryAttributes | any> {
    try {
      const categoryId = parseInt(String(id), 10);
      const result = await this.db.category.delete({
        where: {
          ID: categoryId,
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
