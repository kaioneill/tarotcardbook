import React, { Component } from "react";
import "../App.css";
import Card from "./Card";
import BuildSpread from "./BuildSpread";

class Spread extends Component {
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

  componentDidMount() {
    // this.moreCards();
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
    if (this.state.cardData.length === 0) {
      return (
        <div className="Spread">
          <h2>wisdom below</h2>
          <button onClick={this.moreCards}>{this.state.initState ? 'draw cards' : 'more cards'}</button>
          <button
            onClick={this.saveSpread}
            disabled={this.state.saved ? true : false}
          >
            save spread
          </button>
          <div className="card-container flex flex-center flex-wrap pad">
            {this.state.initState ? "set your intention and click 'draw cards'" : 'loading...'}
          </div>

          <BuildSpread />
        </div>
      );
    } else {
      return (
        <div className="Spread">
          <h2>wisdom below</h2>
          <button onClick={this.moreCards}>more cards</button>
          <button
            onClick={this.saveSpread}
            disabled={this.state.saved ? true : false}
          >
            save spread
          </button>
          <div className="card-container flex flex-center flex-wrap">
            {this.state.cardData.map(cardData => (
              <Card
                card={cardData.card}
                key={cardData.card.name}
                reversed={cardData.reversed}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Spread;
