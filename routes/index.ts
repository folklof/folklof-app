import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/", homeRoutes);
routes.use("/api/v1/auth", authRoutes);
routes.use("/api/v1/user", userRoutes);

export default routes;
