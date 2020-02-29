import React, { Component } from 'react';
import "../App.css";
import Card from "./Card";

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    fetch("/cards/list")
      .then(res => res.json())
      .then(cards => this.setState({ cards }))
      .catch(e => console.log(e));
  }

  render() {
    if (this.state.cards.length === 0) {
      return (
        <div className="List">
          <h2>all the things</h2>
          <div className="card-container flex flex-center flex-wrap">
            loading...
          </div>
        </div>
      );
    } else {
      return (
        <div className="List">
          <h2>all the things</h2>
          <div className="card-container flex flex-center flex-wrap">
            {this.state.cards.map(card => (
              <Card card={card} key={card.name} noReverse={true} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default List;
