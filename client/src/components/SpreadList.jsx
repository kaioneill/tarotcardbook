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
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.listSpreads();
  }

  delete = (id) => {
    if (!window.confirm("are you sure you want to remove this day?")) return
    fetch("/spreads/delete/" + id, {
      method: "DELETE"
    })
      .then(data => {
        if (data) {
          console.log("spread deleted");
          this.setState({ spreads: this.state.spreads.filter(spread => spread._id !== id) });
        }
      })
      .catch(e => console.log(e));
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
          <div className="spread-container flex flex-center flex-wrap pad">
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
                <div className="flex flex-center">
                  <h2>{moment(spread.date).format("MMMM D, YYYY")}</h2>
                  <div className="pad">
                    <button onClick={() => this.delete(spread._id)}>remove</button>
                  </div>
                </div>
                <div>{spread.notes}</div>
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
