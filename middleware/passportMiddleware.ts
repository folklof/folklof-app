import { Application } from 'express';
import passport from '../utils/config/passportConfig';

const passportMiddleware = (app: Application) => {
    app.use(passport.initialize());
    app.use(passport.session());
};

export default passportMiddleware;
