const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");

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
      callbackURL: "http://localhost:3000/auth/redirect/",
      scope: ["identify", "guilds", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile.username);
      console.log(profile.id);
      done(null, profile);
    }
  )
);
