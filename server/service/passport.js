const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../db/model/user');

const localStrategyOptions = {
  usernameField: 'email'
};

const localStrategy = new LocalStrategy(localStrategyOptions,
  function(email, password, done) {
    User.findOne({ email: email }).then((user) => {
      if (user == null) {
        done(null, false);
      } else {
        user.compare(password, function(error, match) {
          if (error) {
            done(error);
          } else if (match == false) {
            done(null, false);
          } else {
            done(null, user);
          }
        });
      }
    }).catch((error) => {
      done(error);
    });
  });


passport.use(localStrategy);

const jwtStrategyOption = {
  secretOrKey: 'dota2',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new JwtStrategy(jwtStrategyOption, function (payload, done) {
  const userId = payload.id;

  User.findById(userId).then((user) => {
    if (user == null) {
      done(null, false);
    } else {
      done(null, user);
    }
  }).catch((error) => {
    done(error);
  });
});

passport.use(jwtStrategy);

module.exports = passport;