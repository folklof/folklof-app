import {
  getFavouriteByUserId,
  getAllFavourites,
  getFavouriteIsFavouriteByUserId,
  updateIsAddedFavouriteById,
  createFavourite,
  deleteFavouriteById,
} from "../controller/favouriteController";
import { Router } from "express";

const router = Router();

router.get("/", getAllFavourites);
router.get("/user/:user_id", getFavouriteByUserId);
router.get("/added/:user_id", getFavouriteIsFavouriteByUserId);
router.post("/", createFavourite);
router.put("/:id", updateIsAddedFavouriteById);
router.delete("/:id", deleteFavouriteById);

export default router;
