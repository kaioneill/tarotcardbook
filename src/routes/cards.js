import express from "express";
import Card from '../models/card';
var router = express.Router();


const cleanQuery = (query) => {
  let hash = {
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten"
  };
  let result = query.replace("10", hash[10]);
  Object.entries(hash).forEach((arr) => {
    result = result.replace(arr[0], arr[1]);
  });
  return result;
}


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

router.get('/search', function (req, res, next) {
  let cleaned = cleanQuery(req.query.query)
  Card.find({ name: { '$regex' : cleaned, '$options' : 'i' } })
  .sort([
    ['img']
  ]).exec(function (err, cards) {
    if (err) return console.error(err);
    console.log(cards);
    res.send(cards);
  });

});


export default router;
