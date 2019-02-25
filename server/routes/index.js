/*
File Name: Books 
Author's Name: Tom Tsiliopoulos
Name: Abdulghafor Nurali
Student Number: 300655894
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let userModel = require("../models/user");
let User = userModel.User; // alias

// define the game model
let book = require("../models/books");

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    books: ""
  });
});

/* GET home page. wildcard */
router.get("/login", (req, res, next) => {
  book.find((err, book) => {
    if (err) {
      return console.error(err);
    } else {
     

      res.render("auth/login", {
        title: "Login Page",
        book: " ",
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
});

router.post('/login', (req, res, next)=>{

  passport.authenticate('local', 
  (err, user, info) => {
    // server error?
    if(err) {
      return next(err);
    }
    // is there a user login error?
    if(!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      // server error?
      if(err) {
        return next(err);
      }
      return res.redirect('/books');
    });
})(req, res, next);
});



/* GET home page. wildcard */
router.get("/register", (req, res, next) => {
 
  if (!req.user) {
    res.render('auth/register', {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : ''
    });
  } else {
    return res.redirect("/");
}
});

router.post('/register', (req, res, next) => {
// define a new user object
let newUser = new User({
  username: req.body.username,
  //password: req.body.password
  email: req.body.email,
  displayName: req.body.displayName
});

User.register(newUser, req.body.password, (err) => {
  if (err) {
    console.log("Error: Inserting New User");
    if (err.name == "UserExistsError") {
      req.flash(
        "registerMessage",
        "Registration Error: User Already Exists!"
      );
      console.log("Error: User Already Exists!");
    }
    return res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : ''
    });
  } else {
    // if no error exists, then registration is successful

    // redirect the user
    return passport.authenticate("local")(req, res, () => {
      res.redirect("/books");
    });
  }
});
});


router.get('/logout', (req, res, next) => {
 
  req.logout();
  res.redirect("/");
});

module.exports = router;
