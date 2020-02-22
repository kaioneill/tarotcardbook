import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  link: {
    type: String,
  }
});

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