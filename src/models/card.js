import mongoose from "mongoose";
import random from "mongoose-simple-random";
// import tarot_data from "./tarot_info.json";
import jsdom from "jsdom";
import async from "async";


const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    link: {
      type: String,
    },
    link_r: {
      type: String,
    },
    quote: {
      type: String,
    },
    quote_r: {
      type: String,
    },
    number: {
      type: Number,
    },
    arcana: {
      type: String,
    },
    suit: {
      type: String,
    },
    img: {
      type: String,
    },
    fortune_telling: {
      type: [String]
    },
    keywords: {
      type: [String]
    },
    light: {
      type: [String]
    },
    shadow: {
      type: [String]
    },
    archetype: {
      type: String
    },
    hebrew_alphabet: {
      type: String
    },
    numerology: {
      type: String
    },
    astrology: {
      type: String
    },
    affirmation: {
      type: String
    },
    elemental: {
      type: String
    },
    mythical_spiritual: {
      type: String
    },
    questions: {
      type: [String]
    },
  },
  { timestamps: true }
);

cardSchema.plugin(random);

const Card = mongoose.model("Card", cardSchema);

const deleteCards = () => {
  Card.deleteMany({}, function (err) {
    if (err) return console.error(err);
    console.log('cards deleted');
  });
}

const saveCards = () => {

  tarot_data.cards.forEach(function (card) {
    let newCard = new Card(card);

    newCard.save(function(err, newCard) {
      if (err) return console.error(err);
      console.log(`${newCard.name} has been saved`);
    });
  });
}

const updateCards = () => {

  tarot_data.cards.forEach(function (card) {
    let newData = card

    Card.findOneAndUpdate({ name: card.name }, newData).exec(function (err, card) {
      if (err) return console.error(err);
      console.log(`${card.name} has been updated`);
    });
  });
}

// async function addTarotData() {

//   let newCard = {};
//   let newCards = [];


//   await async.eachSeries(tarot_data.cards, function(card, done) {
//     newCard = card;
    
//     jsdom.JSDOM.fromURL(card.link).then(dom => {
//       setTimeout(() => {
//         let quote = dom.window.document.querySelector('meta[property="og:description"]').content.replace("&nbsp;", "");
//         newCard.quote = quote;
//       }, 1000);
//     }).catch(err => console.log(err));


//     jsdom.JSDOM.fromURL(card.link_r).then(dom => {
//       setTimeout(() => {
//         let quote_r = dom.window.document.querySelector('meta[property="og:description"]').content.replace("&nbsp;", "");
//         newCard.quote_r = quote_r;
//         newCards.push(newCard);
//         console.log("next");
//         done();
//       }, 1000);
//     }).catch(err => console.log(err));

//   });



//   console.log(JSON.stringify(newCards));
// }


// export { deleteCards, saveCards, addTarotData, updateCards }
export { deleteCards, saveCards, updateCards }
export default Card;