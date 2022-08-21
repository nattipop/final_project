const passport = require("passport");
const { User } = require("../models/models");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys")

passport.initialize();

const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local")

const localOptions = { usernameField: "email"};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ "login.email": email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if(!user) {
      return done(null, false)
    }

    if(!user.validPassword(password)) {
      return done(null, false, { message: "Incorrect password"})
    }

    return done(null, user)
  })
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if(err) {
      return done(err, false)
    }

    if(user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
});

passport.use(jwtLogin);
passport.use(localLogin);