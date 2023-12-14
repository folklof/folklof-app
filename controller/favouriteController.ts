import FavouriteDao from "../dao/favouriteDao";
import FavouriteService from "../service/favouriteService";
import { Request, Response, NextFunction } from "express";

async function getAllFavourites(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const favouriteDao = new FavouriteDao(db);
  const favouriteService = new FavouriteService(favouriteDao);

  try {
    const result = await favouriteService.getAllFavourites();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all favourites",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List favourites not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function createFavourite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const favouriteDao = new FavouriteDao(db);
  const favouriteService = new FavouriteService(favouriteDao);

  try {
    const { user_id, book_id, is_added } = req.body as any;
    const result = await favouriteService.createFavourite(
      user_id,
      book_id,
      is_added
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully create a favourite",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getFavouriteByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const favouriteDao = new FavouriteDao(db);
  const favouriteService = new FavouriteService(favouriteDao);

  try {
    const { user_id } = req.params as any;
    const result = await favouriteService.getFavouriteByUserId(user_id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a favourite",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getFavouriteIsFavouriteByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const favouriteDao = new FavouriteDao(db);
  const favouriteService = new FavouriteService(favouriteDao);

  try {
    const { user_id, is_added } = req.params as any;
    const result = await favouriteService.getFavouriteIsFavouriteByUserId(
      user_id,
      is_added
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a favourite",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteFavouriteById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const favouriteDao = new FavouriteDao(db);
  const favouriteService = new FavouriteService(favouriteDao);

  try {
    const { id } = req.params as any;
    const result = await favouriteService.deleteFavouriteById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully delete a favourite",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateIsAddedFavouriteById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const favouriteDao = new FavouriteDao(db);
  const favouriteService = new FavouriteService(favouriteDao);

  try {
    const { id } = req.params as any;
    const { is_added } = req.body as any;
    const result = await favouriteService.updateIsAddedFavouriteById(
      id,
      is_added
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a favourite",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getAllFavourites,
  createFavourite,
  getFavouriteByUserId,
  getFavouriteIsFavouriteByUserId,
  deleteFavouriteById,
  updateIsAddedFavouriteById,
};
