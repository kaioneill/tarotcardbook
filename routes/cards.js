import express from "express"
import Card from '../models/card'
var router = express.Router();



router.get('/', function(req, res, next) {
  // res.send('respond with a resource');


  Card.findRandom({}, {}, { limit: 5 }, function(err, cards) {
    if (err) return console.error(err);
    res.send(cards);
    console.log(cards);
  });


  // Card.find({}, function (err, cards) {
  //   if (err) return console.error(err);
  //   console.log(cards)
  //   res.send(cards);
  // }).limit(1);



});

module.exports = router;
