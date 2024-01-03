import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL as string;
const GOOGLE_CALLBACK_URL_ADMIN = process.env
  .GOOGLE_CALLBACK_URL_ADMIN as string;

function configureGoogleStrategy(
  clientID: string,
  clientSecret: string,
  callbackURL: string
) {
  return new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  );
}

passport.use(
  "user",
  configureGoogleStrategy(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
  )
);
passport.use(
  "admin",
  configureGoogleStrategy(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL_ADMIN
  )
);
passport.serializeUser((user, done) => {
  // Serialize user data
  done(null, user);
});

passport.deserializeUser<any, any>((obj, done) => {
  // Deserialize user data
  done(null, obj);
});

export default passport;
