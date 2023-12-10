import RoleDao from "../dao/roleDao";
import RoleService from "../service/roleService";
import { Request, Response, NextFunction } from "express";

async function getAllRoles(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const roleDao = new RoleDao(db);
  const roleService = new RoleService(roleDao);

  try {
    const result = await roleService.getAllRoles();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get all roles",
        data: result.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "List roles not found",
      });
    }
  } catch (error: any) {
    next(error);
  }
}

async function getRoleById(req: Request, res: Response, next: NextFunction) {
  const { db } = req as any;
  const roleDao = new RoleDao(db);
  const roleService = new RoleService(roleDao);

  try {
    const { id } = req.params as any;
    const result = await roleService.getRoleById(id);
    console.log(result, "isi role controller");
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully get a role",
        data: result.message,
      });
    }
  } catch (error: any) {
    next(error);
  }
}

export { getAllRoles, getRoleById };
