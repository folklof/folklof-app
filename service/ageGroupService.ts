import StandardError from "../utils/constants/standardError";
import { IAgeGroupDao, IAgeGroupService } from "../utils/types";

class AgeGroupService implements IAgeGroupService {
  private ageGroupDao: IAgeGroupDao;

  constructor(ageGroupDao: IAgeGroupDao) {
    this.ageGroupDao = ageGroupDao;
  }

  async getAllAgeGroups() {
    try {
      const ageGroups = await this.ageGroupDao.getAllAgeGroups();

      if (!ageGroups || ageGroups.length === 0) {
        throw new StandardError({
          success: false,
          message: "No age group list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: ageGroups,
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

  async getAgeGroupById(id: string) {
    try {
      const ageGroup = await this.ageGroupDao.getAgeGroupById(id);

      if (!ageGroup || ageGroup.length === 0) {
        throw new StandardError({
          success: false,
          message: "No age group found",
          status: 404,
        });
      }

      return {
        success: true,
        message: ageGroup,
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

export default AgeGroupService;
