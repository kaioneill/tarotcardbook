import React, { Component } from 'react';
import "../App.css";
import Card from "./Card";
import moment from 'moment';

export class SpreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spreads: []
    };
    this.listSpreads = this.listSpreads.bind(this);
    this.transformCards = this.transformCards.bind(this);
  }

  componentDidMount() {
    this.listSpreads();
  }

  transformCards = (cards, reversals) => {
    let cardData = [];
    cards.forEach((card, i) => {
      cardData.push({ card: card, reversed: reversals[i] });
    });
    return cardData;
  }

  listSpreads = () => {
    fetch("spreads/list")
      .then(res => res.json())
      .then(spreads => this.setState({ spreads: spreads }))
      .catch(e => console.log(e));
  }

  render() {
    if (this.state.spreads.length === 0) {
      return (
        <div className="SpreadList">
          <div className="spread-container flex flex-center flex-wrap">
            loading...
          </div>
        </div>
      );
    } else {
      return (
        <div className="SpreadList">
          <div className="spread-container flex flex-center flex-wrap">
            {this.state.spreads.map(spread => (
              <div key={spread._id}>
                <h2>{moment(spread.createdAt).format("MMMM D, YYYY")}</h2>
                <div className="flex flex-center">
                  {this.transformCards(spread._cards, spread.reversals).map(
                    cardData => (
                      <Card
                        card={cardData.card}
                        key={cardData.card.name}
                        reversed={cardData.reversed}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default SpreadList;
