import express, { Application } from "express";

const bodyParserMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default bodyParserMiddleware;
