import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import {
  IFavouriteDao,
  IFavouriteAttributes,
  IUserAttributes,
} from "../utils/types";
import { generateJakartaDate } from "../utils/helpers/jakartaTime";

class FavouriteDao implements IFavouriteDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllFavourites(): Promise<IFavouriteAttributes[] | undefined> {
    try {
      const favourites = await this.db.favourite.findMany();
      return favourites;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all favourites",
        status: 500,
      });
    }
  }

  async getFavouriteById(
    id: string
  ): Promise<IFavouriteAttributes[] | undefined> {
    try {
      const favourite = await this.db.favourite.findUnique({
        where: {
          ID: id,
        },
      });
      return favourite ? [favourite] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting favourite by ID",
        status: 500,
      });
    }
  }

  async getFavouriteByUserId(
    user_id: string
  ): Promise<IFavouriteAttributes[] | undefined> {
    try {
      const favourite = await this.db.favourite.findMany({
        where: {
          user_id: user_id,
        },
      });

      return favourite;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting favourite by user ID",
        status: 500,
      });
    }
  }

  async createFavourite(
    user_id: string,
    book_id: string,
    is_added: boolean
  ): Promise<any> {
    try {
      const favourite = await this.db.favourite.create({
        data: {
          user_id: user_id,
          book_id: book_id,
          is_added: is_added,
          created_date: generateJakartaDate(),
        },
      });

      return favourite;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error creating favourite",
        status: 500,
      });
    }
  }

  async getFavouriteIsFavouriteByUserId(
    user_id: string,
    is_added: boolean
  ): Promise<IFavouriteAttributes[] | undefined> {
    try {
      const favourite = await this.db.favourite.findMany({
        where: {
          user_id: user_id,
          is_added: is_added,
        },
        include: {
          book: true,
          user: true,
        },
      });

      return favourite;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting favourite by user ID",
        status: 500,
      });
    }
  }

  async updateIsFavouriteFavouriteById(
    id: string,
    is_added: boolean
  ): Promise<IFavouriteAttributes | undefined> {
    try {
      const favourite = await this.db.favourite.update({
        where: {
          ID: id,
        },
        data: {
          is_added: is_added,
        },
      });

      return favourite;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error updating favourite by ID",
        status: 500,
      });
    }
  }

  async deleteFavouriteById(
    id: string
  ): Promise<IFavouriteAttributes | undefined> {
    try {
      const favourite = await this.db.favourite.delete({
        where: {
          ID: id,
        },
      });

      return favourite;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error deleting favourite by ID",
        status: 500,
      });
    }
  }

  async updateIsAddedFavouriteById(
    id: string,
    is_added: boolean
  ): Promise<IFavouriteAttributes | undefined> {
    try {
      const favourite = await this.db.favourite.update({
        where: {
          ID: id,
        },
        data: {
          is_added: is_added,
        },
      });

      return favourite;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error updating favourite by ID",
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

export default FavouriteDao;
