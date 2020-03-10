import React, { Component } from "react";
import "../App.css";
import Card from "./Card";

class BuildCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: [],
      card: {},
      reversed: false
    };
    this.updateResults = this.updateResults.bind(this);
    this.saveCard = this.saveCard.bind(this);
  }

  componentDidMount() {
    this.updateResults();
  }

  updateResults = (event) => {
    if (event) this.setState({ query: event.target.value });
    fetch("cards/search?query=" + this.state.query)
      .then(res => res.json())
      .then(results => this.setState({ results: results }))
      .catch(e => console.log(e));
  };

  saveCard = () => {
    fetch("/spreads/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        cards: this.state.cardData.map(cardData => cardData.card),
        reversals: this.state.cardData.map(cardData => cardData.reversed)
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
      <div className="BuildCard">
        <h2>build card</h2>
        <div className="flex flex-center vertical">
          <div>
            <input
              placeholder="search for a card"
              type="text"
              value={this.state.query}
              onChange={event => this.updateResults(event)}
            ></input>
            <input
              type="checkbox"
              onChange={event => this.setState({ reversed: event.target.checked })}
            >
            </input>reversed
          </div>
          <div className="flex flex-center vertical">
            {this.state.results.map(card => (
              <Card
                card={card}
                key={card.name}
                reversed={this.state.reversed}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BuildCard;
