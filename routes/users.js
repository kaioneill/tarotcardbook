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

  // newUser.save(function(err, newUser) {
  //   if (newUser) {
  //     res.status(400).json({ message:'user already exists' });
  //     return console.error(err);
  //   }
  //   console.log(`${newUser.username} has been saved`);
  //   res.status(200).json({ message: 'user created' });
  // });

  newUser.save(function (err, newUser) {
    if (newUser) {
      res.send(newUser);
    }
    console.log(`${newUser.username} has been saved`);
    return console.error(err);
  });

});


router.post("/login", passport.authenticate('local'), function(req, res, next) {
  console.log(req.body);


  User.findOne({
    username: req.body.username
  }).exec(function(err, user) {
    // if (err) {
    //   res.status(401).json({ message:'user does not exist' });
    //   return console.error(err);
    // }
    // if (!user.checkPassword(req.body.password)) {
    //   res.status(400).json({ message:'password incorrect' });
    //   return console.log(`${req.body.username} password incorrect`);
    // }
    req.session.save();
    console.log(req.user);
    console.log(`${user.username} logged in`);
    res.status(200).send(user);
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
    return console.log(`${req.user.username} already logged in`);
  }
  res.send({});
  return console.log('no user');
});


module.exports = router;
