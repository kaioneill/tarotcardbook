import React, { Component } from 'react';
import "../App.css";
import Card from "./Card";

export class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.getSuit = this.getSuit.bind(this);
    this.toggleDepressed = this.toggleDepressed.bind(this);
  }

  componentDidMount() {
    this.getSuit(null, "Trump");
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
      document.querySelector(".CardList .depressed").classList.remove("depressed");
      e.target.classList.add("depressed");
    }
  }

  render() {
    if (this.state.cards.length === 0) {
      return (
        <div className="CardList shadow-box">
          <h2>all cards</h2>
          <div className="btn-group">
            <div className="button depressed" onClick={(e) => this.getSuit(e, 'Trump')}>major arcana</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Cups')}>cups</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Swords')}>swords</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Pentacles')}>pentacles</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Wands')}>wands</div>
          </div>
          <div className="card-container flex flex-center flex-wrap pad">
            loading...
          </div>
        </div>
      );
    } else {
      return (
        <div className="CardList shadow-box">
          <h2>all cards</h2>
          <div className="btn-group">
            <div className="button depressed" onClick={(e) => this.getSuit(e, 'Trump')}>major arcana</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Cups')}>cups</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Swords')}>swords</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Pentacles')}>pentacles</div>
            <div className="button" onClick={(e) => this.getSuit(e, 'Wands')}>wands</div>
          </div>
          <div className="card-container flex flex-center flex-wrap">
            {this.state.cards.map(card => (
              <Card card={card} key={card.name} reversed={false} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default CardList;
