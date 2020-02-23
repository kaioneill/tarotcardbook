import mongoose from "mongoose";
import random from "mongoose-simple-random";


const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  link: {
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
  }
});

cardSchema.plugin(random);

const Card = mongoose.model("Card", cardSchema);



const saveCards = () => {
  let cardHash = {
    "The Magician": "https://www.elliotoracle.com/blog/2018/1/30/the-card-of-the-day-the-magician",
    "The High Priestess": "https://www.elliotoracle.com/blog/2018/10/2/the-card-of-the-day-the-high-priestess",
    "The Empress": "https://www.elliotoracle.com/blog/2017/7/10/the-card-of-the-day-the-empress"
  };

  Object.keys(cardHash).forEach(function (name) {
    let newCard = new Card({ 
      name: name,
      link: cardHash[name]
    });

    newCard.save(function(err, newCard) {
      if (err) return console.error(err);
      console.log(`${name} has been saved`);
    });
  });
}

export { saveCards }
export default Card;