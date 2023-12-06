import { PrismaClient } from "@prisma/client";
import { IUserAttributes, IUserDao } from "../utils/types";
import StandardError from "../utils/constants/standardError";

class UserDao implements IUserDao {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: email },
      });
      return user as any;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }

  async getUserById(id: number): Promise<IUserAttributes | any> {
    try {
      const userId = parseInt(String(id), 10);
      const user = await this.prisma.user.findUnique({
        where: {
          ID: userId,
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
    const created_date: Date = new Date();

    try {
      const result = await this.prisma.user.create({
        data: {
          email,
          username: name,
          avatar: picture,
          role_id: default_role_id,
          created_date,
        },
      });
      return result;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }
}

export default UserDao;
