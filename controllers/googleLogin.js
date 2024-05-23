const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const auth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const existingUser = await User.findOne({
        googleId: profile.id,
      });
      if (existingUser) {
        return cb(null, existingUser);
      }
      // if user doesn't exist, create a new user
      const user = await new User({
        googleId: profile.id,
        userName: profile.displayName,
        email: profile.emails[0].value,
        accessToken: accessToken,
        refreshToken: refreshToken,
      }).save();

      console.log(user);

      return cb(null, user);
    }
  )
);

const profile = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const authCallback = passport.authenticate("google", {
  failureRedirect: "/login",
});

module.exports = {
  auth,
  profile,
  authCallback,
};
