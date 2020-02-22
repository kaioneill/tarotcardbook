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


const saveMagician = () => {
  let magician = new Card({ 
    name: "The Magician",
    link: "https://www.elliotoracle.com/blog/2018/1/30/the-card-of-the-day-the-magician" 
  });

  magician.save(function(err, magician) {
    if (err) return console.error(err);
    console.log('magician has been saved');
  });
}

export { saveMagician }
export default Card;