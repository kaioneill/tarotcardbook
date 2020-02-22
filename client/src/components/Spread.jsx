import React, { Component } from "react";
import "../App.css";
import Card from "./Card";

class Spread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.moreCards = this.moreCards.bind(this);
    this.moreCards();
    console.log(this.state.cards);
  }

  moreCards = () => {
    fetch("/cards")
      .then(res => res.json())
      .then(cards => this.setState({ cards }))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="Spread">
        <h2>spread</h2>
        <button onClick={this.moreCards}>more cards</button>
        <div className="card-container">
          {this.state.cards.map(card => (
            <Card card={card} key={card.name} />
          ))}
        </div>
      </div>
    );
  }
}

export default Spread;
