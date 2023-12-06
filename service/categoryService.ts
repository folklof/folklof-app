import StandardError from "../utils/constants/standardError";
import { ICategoryService, ICategoryDao } from "../utils/types";

class CategoryService implements ICategoryService {
  private categoryDao: ICategoryDao;

  constructor(categoryDao: ICategoryDao) {
    this.categoryDao = categoryDao;
  }

  async createCategory(name: string, desc: string) {
    try {
      const isCategoryExist = await this.categoryDao.getOneCategoryByName(
        name
      );

      console.log(isCategoryExist);

      if (isCategoryExist && isCategoryExist.length > 0) {
        throw new StandardError({
          success: false,
          message: "Category already exist",
          status: 400,
        });
      }

      const result = await this.categoryDao.createCategory(name, desc);

      return {
        success: true,
        message: result,
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

  async updateCategory(id: number, name: string, desc: string) {
    try {
      const isCategoryExist = await this.categoryDao.getCategoryById(id);

      if (!isCategoryExist || isCategoryExist.length === 0) {
        throw new StandardError({
          success: false,
          message: "Category not found",
          status: 404,
        });
      }

      const result = await this.categoryDao.updateCategory(id, name, desc);

      return {
        success: true,
        message: result,
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

  async getAllCategories() {
    try {
      const categories = await this.categoryDao.getAllCategories();

      if (!categories || categories.length === 0) {
        throw new StandardError({
          success: false,
          message: "Category not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: categories,
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

  async getCategoryById(id: number) {
    try {
      const category = await this.categoryDao.getCategoryById(id);

      if (!category || category.length === 0) {
        throw new StandardError({
          success: false,
          message: "Category not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: category,
        status: 200,
      };
    } catch (error: any) {
      return new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async getCategoryByName(name: string) {
    try {
      const category = await this.categoryDao.getCategoryByName(name);

      if (!category || category.length === 0) {
        throw new StandardError({
          success: false,
          message: "Category not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: category,
        status: 200,
      };
    } catch (error: any) {
      return new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async deleteCategory(id: number) {
    try {
      const isCategoryExist = await this.categoryDao.getCategoryById(id);

      if (!isCategoryExist || isCategoryExist.length === 0) {
        throw new StandardError({
          success: false,
          message: "Category not found",
          status: 404,
        });
      }

      const result = await this.categoryDao.deleteCategory(id);

      return {
        success: true,
        message: result,
        status: 200,
      };
    } catch (error: any) {
      return new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }
}

export default CategoryService;
