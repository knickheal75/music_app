const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("path");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//basic modules needed

require("./middlewares/passport")(passport);

//passport configuration

const mongoose = require("mongoose");

const PORT = 3000 || process.env.PORT;

const configDB = require("./middlewares/database");

// Database setup complete

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// bodyparser setup

require("jade");
app.set("view engine", "jade");

app.use("/", express.static(__dirname + "/public"));
app.use("/login", express.static(__dirname + "/public"));
app.use("/signup", express.static(__dirname + "/public"));

//jade setup

app.use(morgan("dev")); //log every request to the console
app.use(cookieParser()); //reading cookies,required for auth

app.use(
  session({ secret: "ilovefootball", resave: true, saveUninitialized: true })
); //session secret
app.use(passport.initialize());
app.use(passport.session()); //required for persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

//passsport requisites

require("./controllers/routes")(app, passport); //load our routes and pass in our app and fully configured passport

//express-static files and initial page setup

app.listen(3000, err => {
  if (err) throw err;
  else console.log(`Server running at port ${PORT}`);
});

// defining port to listen
