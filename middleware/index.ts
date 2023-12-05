import { Application } from "express";
import bodyParserMiddleware from "./bodyParserMiddleware";
import helmetMiddleware from "./helmetMiddleware";
import corsMiddleware from "./corsMiddleware";
import morganMiddleware from "./morganMiddleware";
import databaseMiddleware from "./databaseMiddleware";
import cspPolicyMiddleware from "./cspPolicyMiddleware";

const applyMiddleware = (app: Application) => {
  morganMiddleware(app);
  helmetMiddleware(app);
  bodyParserMiddleware(app);
  corsMiddleware(app);
  cspPolicyMiddleware(app);
  app.use(databaseMiddleware);
};

export default applyMiddleware;