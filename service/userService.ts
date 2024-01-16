import moment from "moment";
import NodeCache from "node-cache";
import StandardError from "../utils/constants/standardError";
import { IUserService, IUserDao } from "../utils/types";
import { S3_AWS, S3_BUCKET } from "../utils/config/awsConfig";

const MAX_UPLOADS_PER_DAY = 3;
const userUploadCache = new NodeCache();

class UserService implements IUserService {
  private userDao: IUserDao;

  constructor(userDao: IUserDao) {
    this.userDao = userDao;
  }

  async checkAndCreateUser(email: string, name: string, picture: string) {
    try {
      const isUserExist = await this.userDao.getUserByEmail(email);

      if (!isUserExist) {
        await this.userDao.createUser(email, name, picture, 1, new Date());
        return {
          success: true,
          message: "The user has been created & authenticated",
          status: 200,
        };
      }

      return {
        success: true,
        message: "Successfully authenticated",
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

  async getUserProfile(email: string) {
    try {
      const user = await this.userDao.getUserByEmail(email);

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: user,
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

  async getUserById(id: string) {
    try {
      const user = await this.userDao.getUserById(id);
      console.log(user, "isi user");

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: user,
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

  async getAllUsers() {
    try {
      const users = await this.userDao.getAllUsers();

      if (!users || users.length === 0) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: users,
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

  async updateUserById(
    id: string,
    phone: string,
    age: number,
    name: string,
    avatar: string
  ) {
    try {
      const user = await this.userDao.updateUserById(
        id,
        phone,
        age,
        name,
        avatar
      );

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: user,
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

  async uploadImageToS3(image_file: any, id: string) {
    const specialCode = `HAN-${Math.floor(Math.random() * 1000)}`;

    try {
      const uploadCountKey = `uploadCount:${id}`;
      const lastUploadTimestampKey = `lastUploadTimestamp:${id}`;

      let uploadCount: number = userUploadCache.get(uploadCountKey) || 0;
      let lastUploadTimestamp: number =
        userUploadCache.get(lastUploadTimestampKey) || 0;

      const todayStart = moment().startOf("day").unix();

      if (lastUploadTimestamp < todayStart) {
        uploadCount = 1;
      } else if (uploadCount >= MAX_UPLOADS_PER_DAY) {
        throw new Error("Exceeded maximum daily upload limit");
      } else {
        uploadCount++;
      }

      // Update the cache
      userUploadCache.set(uploadCountKey, uploadCount);
      userUploadCache.set(lastUploadTimestampKey, moment().unix());

      const uploadParams: any = {
        Bucket: S3_BUCKET,
        Key: `profile/${id}-${specialCode}.jpg`,
        Body: image_file.buffer,
        ACL: "public-read",
      };

      const uploadResult = await S3_AWS.upload(uploadParams).promise();

      return {
        success: true,
        message: uploadResult.Location,
        status: 200,
      };
    } catch (error: any) {
      console.log(error, "Error uploading image to S3");
      throw new StandardError({
        success: false,
        message: error.message,
        status: error.status,
      });
    }
  }

  async updateUserForAdminById(
    id: string,
    role_id: number,
    phone: string,
    age: number,
    name: string,
    avatar: string
  ) {
    try {
      const user = await this.userDao.updateUserForAdminById(
        id,
        role_id,
        phone,
        age,
        name,
        avatar
      );

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: user,
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

export default UserService;
