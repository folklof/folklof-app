import { Application } from 'express';
import passport from '../utils/config/passport-config';

const passportMiddleware = (app: Application) => {
    app.use(passport.initialize());
    app.use(passport.session());
};

export default passportMiddleware;
