import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import { IRoleAttributes, IRoleDao } from "../utils/types";

class RoleDao implements IRoleDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllRoles(): Promise<IRoleAttributes[] | any> {
    try {
      const roles = await this.db.role.findMany();
      return roles;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all roles",
        status: 500,
      });
    }
  }

  async getRoleById(id: number): Promise<IRoleAttributes[] | any> {
    try {
      const convertID = Number(id);
      const role = await this.db.role.findUnique({
        where: {
          ID: convertID,
        },
      });
      return role;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting role by ID",
        status: 500,
      });
    }
  }
}

export default RoleDao;
