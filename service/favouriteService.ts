import StandardError from "../utils/constants/standardError";
import { IFavouriteDao, IFavouriteService } from "../utils/types";

class FavouriteService implements IFavouriteService {
  private favouriteDao: IFavouriteDao;

  constructor(favouriteDao: IFavouriteDao) {
    this.favouriteDao = favouriteDao;
  }

  async getAllFavourites() {
    try {
      const favourites = await this.favouriteDao.getAllFavourites();

      if (!favourites || favourites.length === 0) {
        throw new StandardError({
          success: false,
          message: "No favourite list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: favourites,
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

  async createFavourite(
    user_id: string,
    book_id: string,
    is_added: boolean
  ): Promise<any> {
    const allowedIsAdded = [true, false];
    if (!allowedIsAdded.includes(is_added)) {
      throw new StandardError({
        success: false,
        message: "error updating a favourite: is_added must be true or false",
        status: 400,
      });
    }
    try {
      const favourite = await this.favouriteDao.createFavourite(
        user_id,
        book_id,
        is_added
      );
      return {
        success: true,
        message: favourite,
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

  async updateIsAddedFavouriteById(
    id: string,
    is_added: boolean
  ): Promise<any> {
    const allowedIsAdded = [true, false];
    if (!allowedIsAdded.includes(is_added)) {
      throw new StandardError({
        success: false,
        message: "error updating a favourite: is_added must be true or false",
        status: 400,
      });
    }
    try {
      const favourite = await this.favouriteDao.updateIsAddedFavouriteById(
        id,
        is_added
      );
      return {
        success: true,
        message: favourite,
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

  async deleteFavouriteById(id: string): Promise<any> {
    try {
      const favourite = await this.favouriteDao.deleteFavouriteById(id);
      return {
        success: true,
        message: favourite,
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

  async getFavouriteByUserId(user_id: string): Promise<any> {
    try {
      const favourite = await this.favouriteDao.getFavouriteByUserId(user_id);

      if (!favourite || favourite.length === 0) {
        throw new StandardError({
          success: false,
          message: "No favourite list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: favourite,
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

  async getFavouriteIsFavouriteByUserId(
    user_id: string,
    is_added: boolean
  ): Promise<any> {
    try {
      const favourite = await this.favouriteDao.getFavouriteIsFavouriteByUserId(
        user_id,
        is_added
      );

      if (!favourite || favourite.length === 0) {
        throw new StandardError({
          success: false,
          message: "No favourite list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: favourite,
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
}

export default FavouriteService;
