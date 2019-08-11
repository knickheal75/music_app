module.exports = function(app, passport) {
  //LANDING PAGE
  app.get("/", (req, res) => {
    res.render("index.jade");
  });

  //LOGIN PAGE
  app.get("/login", (req, res) => {
    //render the page and pass any flash data if it exists
    res.render("login.jade", { message: req.flash("loginMessage") });
  });

  // processing the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  app.get("/signup", (req, res) => {
    //render the page and pass any flash data if it exists
    res.render("signup.jade", { messsage: req.flash("signupMessage") });
  });

  // processing the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", //redirect to secure profile section
      failureRedirect: "/signup", //redirect to signup page if there is error
      failureFlash: true //allow flash messages
    })
  );

  //PROFILE SECTION HERE
  //WE want this protected as you should be logged in to visit
  // We will use route middleware to verify this--isAuthenticated function

  app.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile.jade", { user: req.user }); // get the requset out of the session and pass to jade
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // the middleware isAuthenticated to ensure user is logged in
  function isLoggedIn(req, res, next) {
    //if user is authenticated in the session , carry on
    if (req.isAuthenticated()) return next();

    //if not authenticated redirect to home page
    res.redirect("/");
  }
};
