import { Router, Request, Response, NextFunction } from "express";
import {
  getBookByCode,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookByTitle,
  getBookByAgeGroupId,
  getBookByCategoryId,
  generateBookByAI,
  generateBookByAIStream,
  generateBookAndAudioByAI,
  generateImageByAI,
  generateAudioByAI,
  generateBookAudioAndImageByAI,
  generateBookByAIStreamChat,
  uploadImageToS3,
} from "../controller/bookController";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.query;
  if (title) {
    await getBookByTitle(req, res, next);
  } else {
    await getAllBooks(req, res, next);
  }
});
router.get("/:id", getBookById);
router.get("/code/:code", getBookByCode);
router.get("/category/:category_id", getBookByCategoryId);
router.get("/age-group/:agegroup_id", getBookByAgeGroupId);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

// Generated By AI
router.post("/generate", generateBookByAI);
router.post("/generate/chat", generateBookByAIStreamChat);
router.post("/generate/stream", generateBookByAIStream);
router.post("/generate/image", generateImageByAI);
router.post("/generate/audio", generateAudioByAI);
router.post("/generate/audio/stream", generateBookAndAudioByAI);
router.post("/generate/audio/image/stream", generateBookAudioAndImageByAI);

// Upload to S3
router.post("/image/upload", uploadImageToS3);
export default router;
