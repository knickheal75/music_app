//load necessary things
var LocalStrategy = require("passport-local").Strategy;

//load the user model

var User = require("./../models/user");

//expose the function to app
module.exports = function(passport) {
  //passport session setup
  //persistent login sessions
  //passport needs ability to serialize and deserialize users out of the session

  //serializing user for the session

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //deserializing user for the session

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  //local signup

  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password
        passReqToCallback: true
        // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({ username: username }, function(err, user) {
            if (err) return done(err);

            // check to see if theres already a user with that username
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken")
              );
            } else {
              // if there is no user with that username
              // create the user
              var newUser = new User();

              //set the user's new credentials
              newUser.username = username;
              newUser.password = newUser.generateHash(password);
              newUser.first_name = req.body.fname;
              newUser.last_name = req.body.lname;

              //save the user
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
