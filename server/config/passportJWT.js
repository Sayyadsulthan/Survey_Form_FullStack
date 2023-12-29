import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { configDotenv } from "dotenv";
import Admin from "../models/Admin.js";
configDotenv();

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SecretKey,
};
passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const admin = await Admin.findById(payload._id);
      if (!admin) {
        return done(null, false);
      }

      done(null, admin);
    } catch (error) {
      done(error, false);
    }
  })
);

export default passport;