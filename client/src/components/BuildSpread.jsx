import React, { Component } from "react";
import "../App.css";
import BuildCard from "./BuildCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BuildSpread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichCards: [],
      cardData: [],
      enoughCards: false,
      notes: "",
      date: new Date()
    };
    this.saveSpread = this.saveSpread.bind(this);
    this.transformCards = this.transformCards.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCardData = this.updateCardData.bind(this);
  }

  addCard = (card, which, reversed) => {
    let whichCards = this.state.whichCards.filter(obj => obj.which !== which);
    whichCards.push({ which: which, card: card, reversed: reversed });
    whichCards = whichCards.sort((a, b) => a.which.localeCompare(b.which));
    this.setState({ whichCards: whichCards }, () => {
      console.log(this.state.whichCards);
      if (this.state.whichCards.length === 3) {
        this.updateCardData();
        this.setState({ enoughCards: true })
      } else {
        this.setState({ enoughCards: false });
      };
    });
  }

  removeCard = (which) => {
    let whichCards = this.state.whichCards.filter(obj => obj.which !== which);
    this.setState({ whichCards: whichCards }, () => {
      console.log(this.state.whichCards);
    });
  }

  transformCards = (cards) => {
    let cardData = [];
    cards.forEach((card) => {
      cardData.push({ card: card, reversed: Math.random() >= 0.5 });
    });
    return cardData;
  }

  updateCardData = () => {
    let cardData = [];
    this.state.whichCards.forEach((obj) => {
      cardData.push({ card: obj.card, reversed: obj.reversed });
    });
    this.setState({ cardData: cardData })
  }

  saveSpread = () => {
    this.setState({ enoughCards: false });
    fetch("/spreads/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        cards: this.state.cardData.map((cardData) => cardData.card),
        reversals: this.state.cardData.map((cardData) => cardData.reversed),
        notes: this.state.notes,
        date: this.state.date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log("spread saved");
          this.setState({ saved: true });
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="BuildSpread">
        <h2>build spread</h2>
        <div className="flex vertical">
          <div>
            <button
              onClick={this.saveSpread}
              disabled={this.state.enoughCards ? false : true}
            >
              save spread
            </button>
          </div>
          <div className="pad" >
            <DatePicker selected={this.state.date} onChange={(date) => this.setState({ date: date })} />
          </div>
          <div>
            <textarea className="spread-notes" placeholder="write notes here" onChange={(event) => this.setState({ notes: event.target.value})}>
            </textarea>
          </div>
        </div>
        <div className="card-container flex flex-center flex-wrap">
          <BuildCard
            index="card1"
            addCard={this.addCard}
            removeCard={this.removeCard}
          />
          <BuildCard
            index="card2"
            addCard={this.addCard}
            removeCard={this.removeCard}
          />
          <BuildCard
            index="card3"
            addCard={this.addCard}
            removeCard={this.removeCard}
          />
        </div>
      </div>
    );
  }
}

export default BuildSpread;
