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
      console.log(error, "Error retrieving user by email");
      throw new StandardError({
        success: false,
        message: "Error retrieving user by email",
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
    const default_null = null;

    try {
      const result = await this.prisma.user.create({
        data: {
          email,
          username: name,
          avatar: picture,
          age: default_null,
          phone: default_null,
          role_id: default_role_id,
          created_date,
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
}

export default UserDao;
