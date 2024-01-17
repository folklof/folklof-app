import UserDao from "../dao/userDao";
import UserService from "../service/userService";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);

  try {
    const { id } = req.params as any;
    const result = await userService.getUserById(id);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a user",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);

  try {
    const result = await userService.getAllUsers();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all users",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getUserProfile(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);

  try {
    const { _json } = req.user as any;
    const result = await userService.getUserProfile(_json.email);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a user",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function uploadImageToS3(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { db } = req as any;
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);

    upload.single("image_file")(req, res, async function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err.message,
        });
      }

      try {
        const imageFile = req.file;
        const { id } = req.params as any;
        const result = await userService.uploadImageToS3(imageFile, id);
        if (result.success) {
          return res.status(200).json({
            success: true,
            message: "Successfully uploaded to AWS S3",
            data: { image_link: result.message },
          });
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

async function updateUserById(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);

  try {
    const { id } = req.params as any;
    const { phone, age, name, avatar } = req.body as any;
    const result = await userService.updateUserById(
      id,
      phone,
      age,
      name,
      avatar
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a user",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function updateUserForAdminById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { db } = req as any;
  const userDao = new UserDao(db);
  const userService = new UserService(userDao);

  try {
    const { id } = req.params as any;
    const { role_id, phone, age, name, avatar } = req.body as any;
    const result = await userService.updateUserForAdminById(
      id,
      role_id,
      phone,
      age,
      name,
      avatar
    );
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a user",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export {
  getUserById,
  getUserProfile,
  getAllUsers,
  updateUserById,
  updateUserForAdminById,
  uploadImageToS3,
};
