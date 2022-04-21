if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const { users } = require("./routes/auth");
const initializedPassport = require("./passport-config");

initializedPassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //don't resave if nothing has changes after reload
    saveUninitialized: false, //don't save empty values
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

app.listen(4000);
