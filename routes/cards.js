var express = require('express');
var router = express.Router();
import Card from '../models/card'


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  Card.count().exec(function (err, count) {
    if (err) return console.error(err);

    let random = Math.floor(Math.random() * count)

    Card.find({}).skip(random).limit(1).exec(function (err, card) {
      if (err) return console.error(err);
      res.send(card);
    });
  });


  // Card.find({}, function (err, cards) {
  //   if (err) return console.error(err);
  //   console.log(cards)
  //   res.send(cards);
  // }).limit(1);



});

module.exports = router;
