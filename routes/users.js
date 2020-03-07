import express from "express";
import User from '../models/user';
import passport from "../passport";
var router = express.Router();

router.post('/signup', function (req, res, next) {

  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  console.log(newUser);

  newUser.save(function(err, newUser) {
    if (err) return console.error(err);
    console.log(`${newUser.username} has been saved`);
    res.send(newUser);
  });

});


router.post("/login", passport.authenticate('local'), function(req, res, next) {
  console.log(req.body);


  User.findOne({
    username: req.body.username
  }).exec(function(err, user) {
    if (err) return console.error(err);
    if (!user) {
      return console.log(`${req.body.username} does not exist`);
    }
    if (!user.checkPassword(req.body.password)) {
      return console.log(`${req.body.username} password incorrect`);
    }
    req.session.save();
    console.log(req.user);
    console.log(`${user.username} logged in`);
    res.send(user);
  });
});

router.post("/logout", function (req, res, next) {
  req.logout();
  res.send({});
  return console.log('user logged out');
});


router.get("/", function(req, res, next) {
  if (req.user) {
    res.send({ user: req.user });
    return console.log('user already logged in');
  }
  res.send({});
  return console.log('no user');
});


module.exports = router;
