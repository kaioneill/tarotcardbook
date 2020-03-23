import express from "express"
import Spread from '../models/spread'
// import CardSpreadMapping from '../models/card_spread_mapping'
import Card from '../models/card'
import User from "../models/user";
var router = express.Router();

router.get('/cards', function (req, res, next) {
  // res.send('respond with a resource');

  Card.findRandom({}, {}, {
    limit: 3
  }, function (err, cards) {
    if (err) return console.error(err);
    console.log(cards);
    res.send(cards);
  });

});


router.post('/save', function (req, res, next) {

  let cardIds = [];


  req.body.cards.forEach((card_json) => {
    let card = new Card(card_json);
    cardIds.push(card._id)
  });

  let newData = {
    _user: req.user._id,
    _cards: cardIds,
    reversals: req.body.reversals,
    notes: req.body.notes,
    date: req.body.date
  };

  if (req.body.id) {
    Spread.findOneAndUpdate({ _id: req.body.id }, newData).exec(function (err, spread) {
      if (err) return console.error(err);
      console.log(spread);
      res.send(spread);
    });
    return;
  }



  let newSpread = new Spread(newData);

  newSpread.save(function (err, newSpread) {
    if (err) return console.error(err);
    console.log('newSpread has been saved');
  });


  res.send(newSpread);

});



router.delete("/delete/:id", function (req, res, next) {

  console.log(req.params);

  Spread.deleteOne({ _id: req.params.id }, function(err) {
    if (err) return console.error(err);
    console.log('spread has been deleted');
  });

  res.send('success');
});


router.get('/list', function (req, res, next) {

  Spread.find({ _user: req.user._id }).populate('_cards').sort([['date', -1]]).exec(function (err, spreads) {
    if (err) return console.error(err);
    console.log(spreads);
    res.send(spreads);
  });


});

export default router;
