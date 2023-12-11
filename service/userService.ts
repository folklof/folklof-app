import StandardError from "../utils/constants/standardError";
import { IUserService, IUserDao } from "../utils/types";

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
}

export default UserService;
