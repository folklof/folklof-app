import StandardError from "../utils/constants/standardError";
import { IRoleService, IRoleDao } from "../utils/types";

class RoleService implements IRoleService {
  private roleDao: IRoleDao;

  constructor(roleDao: IRoleDao) {
    this.roleDao = roleDao;
  }

  async getAllRoles() {
    try {
      const roles = await this.roleDao.getAllRoles();

      if (!roles || roles.length === 0) {
        throw new StandardError({
          success: false,
          message: "No role list found",
          status: 404,
        });
      }

      return {
        success: true,
        message: roles,
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

  async getRoleById(id: number) {
    try {
      const role = await this.roleDao.getRoleById(id);
      console.log(role, "isi role service");

      if (!role) {
        throw new StandardError({
          success: false,
          message: "Role not found",
          status: 404,
        });
      }

      return {
        success: true,
        message: role,
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

export default RoleService;
