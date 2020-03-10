import React, { Component } from "react";
import "../App.css";
import Card from "./Card";
import BuildCard from "./BuildCard";

class BuildSpread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      saved: false,
      initState: true
    };
    this.moreCards = this.moreCards.bind(this);
    this.saveSpread = this.saveSpread.bind(this);
    this.transformCards = this.transformCards.bind(this);
  }

  transformCards = (cards) => {
    let cardData = [];
    cards.forEach((card) => {
      cardData.push({ card: card, reversed: Math.random() >= 0.5 });
    });
    return cardData;
  }

  moreCards = () => {
    this.setState({ cardData: [], initState: false });
    fetch("spreads/cards")
      .then(res => res.json())
      .then(cards => this.setState({ cardData: this.transformCards(cards) }))
      .catch(e => console.log(e));
  }

  saveSpread = () => {
    fetch("/spreads/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        cards: this.state.cardData.map((cardData) => cardData.card),
        reversals: this.state.cardData.map((cardData) => cardData.reversed)
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
        <div className="card-container flex flex-center flex-wrap">
          <BuildCard />
        </div>
      </div>
    );
  }
}

export default BuildSpread;
