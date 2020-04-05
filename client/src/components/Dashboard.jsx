import React, { Component } from "react";
import "../App.css";
import Card from "./Card";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      spreads: [],
      cardData: [],
      commonSuit: "",
      secondCommonSuit: "",
      commonCardData: {}
    };
    this.getSpreads = this.getSpreads.bind(this);
    this.transformCards = this.transformCards.bind(this);
    this.spreadsToCardData = this.spreadsToCardData.bind(this);
    this.getCommonSuit = this.getCommonSuit.bind(this);
    this.getCommonCard = this.getCommonCard.bind(this);
  }

  componentDidMount() {
    this.getSpreads();
  }

  getCommonCard = () => {
    let cardData = this.state.cardData;
    let count = {};
    cardData.forEach(el => {
      let reversed = el.reversed ? " Reversed" : ""
      let key = `${el.card.name}${reversed}`;
      count[key] = count[key] || 0;
      count[key] += 1;
    });
    let cardName = Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
    let name = cardName.split(" Reversed")[0];
    let reversed = cardName.split(" Reversed").length > 1;
    let card = cardData.find(el => (el.card.name === name && el.reversed === reversed));
    this.setState({ commonCardData: card });
  }

  getCommonSuit = () => {
    let suits = this.state.cardData.map(obj => obj.card.suit);
    let count = {};
    suits.forEach(suit => {
      count[suit] = count[suit] || 0;
      count[suit] += 1;
    });
    let suit = Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
    if (suit === "Trump") {
      suit = "Major Arcana"; // unused, maybe later
    }
    if (Object.keys(count).length > 1) {
      let second = Object.keys(count).sort(function(a,b){return count[a]-count[b]})[1];
      this.setState({ secondCommonSuit: second });
    }
    this.setState({ commonSuit: suit });
  };

  spreadsToCardData = spreads => {
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

    // cardData = cardData.filter((elem, index, self) => self.findIndex((t) => {return (t.card.name === elem.card.name && t.reversed === elem.reversed)}) === index);

    this.setState({ cardData: cardData }, () => {
      this.setState({ loading: false });
      this.getCommonSuit();
      this.getCommonCard();
    });
  };

  getSpreads = () => {
    fetch("spreads/list")
      .then(res => res.json())
      .then(spreads => {
        if (!spreads.length) {
          this.setState({ loading: false });
          return;
        }
        this.setState({ spreads: spreads }, () => {
          this.spreadsToCardData(spreads);
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    if (!this.state.spreads.length && !this.state.loading) {
      return (
        <div className="Dashboard white-back shadow-box">
          <h2>dashboard</h2>
          <div>
            <div className="card-container flex flex-center flex-wrap">
              no cards yet, click on "pull cards" to get started
            </div>
          </div>
        </div>
      );
    } else if (this.state.loading) {
      return (
        <div className="Dashboard white-back shadow-box">
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
        <div className="Dashboard white-back shadow-box">
          <h2>dashboard</h2>
          <div>
            <div className="flex flex-center flex-wrap vertical">
              <div className="pad">
                your most common suit is&nbsp;
                <span className="bold">{this.state.commonSuit}</span>&nbsp;
                {this.state.secondCommonSuit ? (
                  <span>
                    (2nd place is{" "}
                    <span className="bold">{this.state.secondCommonSuit}</span>)
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="pad">
                your most common card is&nbsp;
                <span className="bold">
                  {this.state.commonCardData.card.name}{" "}
                  {this.state.commonCardData.reversed ? "Reversed" : ""}
                </span>
              </div>
              <div className="card-container flex flex-center">
                <Card
                  card={this.state.commonCardData.card}
                  reversed={this.state.commonCardData.reversed}
                />
              </div>
              {/* {this.state.cardData.map(cardData => (
                <Card
                  card={cardData.card}
                  key={`${cardData.card.name} ${cardData.reversed}`}
                  reversed={cardData.reversed}
                />
              ))} */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
