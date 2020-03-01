import React, { Component } from 'react';
import "../App.css";
import Card from "./Card";

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.getSuit = this.getSuit.bind(this);
    this.toggleDepressed = this.toggleDepressed.bind(this);
    this.getSuit(null, 'Trump');
  }

  getSuit = (e, suit) => {
    this.setState({cards: []});
    fetch("/cards/suit?suit=" + suit)
      .then(res => res.json())
      .then(cards => this.setState({ cards }))
      .then(this.toggleDepressed(e))
      .catch(e => console.log(e));
  }

  toggleDepressed = (e) => {
    if (e) {
      document.querySelector(".depressed").classList.remove("depressed");
      e.target.classList.add("depressed");
    }
  }

  render() {
    if (this.state.cards.length === 0) {
      return (
        <div className="List">
          <h2>all the things</h2>
          <button className="depressed" onClick={(e) => this.getSuit(e, 'Trump')}>major arcana</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Cups')}>cups</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Swords')}>swords</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Pentacles')}>pentacles</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Wands')}>wands</button>
          <div className="card-container flex flex-center flex-wrap">
            loading...
          </div>
        </div>
      );
    } else {
      return (
        <div className="List">
          <h2>all the things</h2>
          <button className="depressed" onClick={(e) => this.getSuit(e, 'Trump')}>major arcana</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Cups')}>cups</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Swords')}>swords</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Pentacles')}>pentacles</button>
          <button className="" onClick={(e) => this.getSuit(e, 'Wands')}>wands</button>
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
