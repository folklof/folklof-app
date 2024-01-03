import { PrismaClient } from "@prisma/client";
import { IUserAttributes, IUserDao } from "../utils/types";
import StandardError from "../utils/constants/standardError";
import { generateJakartaDate } from "../utils/helpers/jakartaTime";

class UserDao implements IUserDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.db.user.findFirst({
        where: { email: email },
        include: {
          role: true,
        },
      });
      return user as any;
    } catch (error: any) {
      console.log(error, "Error retrieving user by email");
      throw new StandardError({
        success: false,
        message: "Error retrieving user by email",
        status: 500,
      });
    }
  }

  async getAllUsers(): Promise<IUserAttributes[] | any> {
    try {
      const users = await this.db.user.findMany({
        orderBy: {
          username: "asc",
        },
        include: {
          role: true,
        },
      });
      return users;
    } catch (error: any) {
      console.log(error, "Error retrieving all users");
      throw new StandardError({
        success: false,
        message: "Error retrieving all users",
        status: 500,
      });
    }
  }

  async getUserById(id: string): Promise<IUserAttributes | any> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          ID: id,
        },
        include: {
          role: true,
        },
      });

      return user;
    } catch (error: any) {
      console.log(error, "Error retrieving user by ID");
      throw new StandardError({
        success: false,
        message: "Error retrieving user by ID",
        status: 500,
      });
    }
  }
  async createUser(
    email: string,
    name: string,
    picture: string
  ): Promise<IUserAttributes | any> {
    const default_role_id: number = 1;
    const default_null = null;

    try {
      const result = await this.db.user.create({
        data: {
          email,
          username: name,
          avatar: picture,
          age: default_null,
          phone: default_null,
          role_id: default_role_id,
          created_date: generateJakartaDate(),
        },
      });
      return result;
    } catch (error: any) {
      console.log(error, "Error creating user");
      throw new StandardError({
        success: false,
        message: "Error creating user",
        status: 500,
      });
    }
  }

  async updateUserById(
    id: string,
    phone: string,
    age: number,
    name: string,
    avatar: string
  ): Promise<IUserAttributes | any> {
    try {
      const user = await this.db.user.update({
        where: {
          ID: id,
        },
        data: {
          age: age,
          phone: phone,
          username: name,
          avatar: avatar,
        },
      });

      return user;
    } catch (error: any) {
      console.log(error, "Error updating user");
      throw new StandardError({
        success: false,
        message: "Error updating user",
        status: 500,
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
  ): Promise<IUserAttributes | any> {
    try {
      const user = await this.db.user.update({
        where: {
          ID: id,
        },
        data: {
          role_id: role_id,
          age: age,
          phone: phone,
          username: name,
          avatar: avatar,
        },
      });

      return user;
    } catch (error: any) {
      console.log(error, "Error updating user for admin");
      throw new StandardError({
        success: false,
        message: "Error updating user for admin",
        status: 500,
      });
    }
  }
}

export default UserDao;
