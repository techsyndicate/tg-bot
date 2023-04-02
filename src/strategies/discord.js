const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
require("dotenv").config();

var cur_user = null;

passport.serializeUser(function (user, done) {
  cur_user = user;
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  if (cur_user) {
    done(null, cur_user);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.ID,
      clientSecret: process.env.SECRET,
      callbackURL: process.env.URL,
      scope: ["identify", "guilds", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile.username);
      console.log(profile.id);
      done(null, profile);
    }
  )
);
