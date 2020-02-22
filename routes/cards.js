var express = require('express');
var router = express.Router();
import Card from '../models/card'


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');


  Card.find({}, function (err, cards) {
    if (err) return console.error(err);
    console.log(cards)
    res.send(cards);
  })



});

module.exports = router;
