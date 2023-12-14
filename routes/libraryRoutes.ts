import {
  getLibraryByUserId,
  getAllLibraries,
  updateIsReadLibraryById,
  getLibraryIsReadByUserId,
  deleteLibraryById,
  createLibrary,
} from "../controller/libraryController";
import { Router } from "express";

const router = Router();

router.get("/", getAllLibraries);
router.get("/:user_id", getLibraryByUserId);
router.get("/read/:user_id", getLibraryIsReadByUserId);
router.post("/", createLibrary);
router.put("/:id", updateIsReadLibraryById);
router.delete("/:id", deleteLibraryById);

export default router;
