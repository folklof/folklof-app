import { Application } from "express";
import session from "express-session";

const expressSession = (app: Application) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    })
  );
};

export default expressSession;
