import { PrismaClient } from "@prisma/client";
import StandardError from "../utils/constants/standardError";
import { IAgeGroupAttributes, IAgeGroupDao } from "../utils/types";

class AgeGroupDao implements IAgeGroupDao {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getAllAgeGroups(): Promise<IAgeGroupAttributes[] | undefined> {
    try {
      const ageGroups = await this.db.ageGroup.findMany();
      return ageGroups;
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting all age groups",
        status: 500,
      });
    }
  }

  async getAgeGroupById(
    id: string
  ): Promise<IAgeGroupAttributes[] | undefined> {
    try {
      const ageGroup = await this.db.ageGroup.findUnique({
        where: {
          ID: id,
        },
      });
      return ageGroup ? [ageGroup] : [];
    } catch (error: any) {
      throw new StandardError({
        success: false,
        message: "Error getting age group by ID",
        status: 500,
      });
    }
  }
}

export default AgeGroupDao;
