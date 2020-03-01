import express from "express"
import Card from '../models/card'
var router = express.Router();

router.get('/list', function (req, res, next) {

  Card.find().sort([['img']]).exec(function (err, cards) {
    if (err) return console.error(err);
    console.log(cards);
    res.send(cards);
  });

});

router.get('/suit', function (req, res, next) {

  Card.find({ suit: req.query.suit }).sort([
    ['number']
  ]).exec(function (err, cards) {
    if (err) return console.error(err);
    console.log(cards);
    res.send(cards);
  });

});

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  Card.findRandom({}, {}, { limit: 3 }, function(err, cards) {
    if (err) return console.error(err);
    console.log(cards);
    res.send(cards);
  });

});

module.exports = router;
