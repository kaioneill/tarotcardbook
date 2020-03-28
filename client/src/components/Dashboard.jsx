import React, { Component } from "react";
import "../App.css";
import Card from "./Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      spreads: [],
      cardData: []
    };
    this.getSpreads = this.getSpreads.bind(this);
    this.transformCards = this.transformCards.bind(this);
    this.spreadsToCardData = this.spreadsToCardData.bind(this);
  }

  componentDidMount() {
    this.getSpreads();
  }

  spreadsToCardData = (spreads) => {
    let cards = [];
    let reversals = [];
    spreads.forEach(spread => {
      cards.push(spread._cards);
      reversals.push(spread.reversals);
    });
    this.transformCards(cards.flat(), reversals.flat());
  };

  transformCards = (cards, reversals) => {
    let cardData = [];
    cards.forEach((card, i) => {
      cardData.push({ card: card, reversed: reversals[i] });
    });
    this.setState({ cardData: cardData }, () => {
      this.setState({ loading: false });
    });
  };

  getSpreads = () => {
    fetch("spreads/list")
      .then(res => res.json())
      .then(spreads => {
        this.setState({ spreads: spreads }, () => {
          this.spreadsToCardData(spreads);
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="Dashboard shadow-box">
          <h2>dashboard</h2>
          <div>
            <div className="card-container flex flex-center flex-wrap">
              loading...
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Dashboard shadow-box">
          <h2>dashboard</h2>
          <div>
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
        </div>
      );
    }
  }
}

export default Dashboard;
