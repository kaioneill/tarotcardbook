import mongoose from "mongoose";
import random from "mongoose-simple-random";
import tarot_data from "./tarot_info.json"


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

  tarot_data.cards.forEach(function (card) {
    let newCard = new Card(card);

    newCard.save(function(err, newCard) {
      if (err) return console.error(err);
      console.log(`${newCard.name} has been saved`);
    });
  });
}

export { saveCards }
export default Card;