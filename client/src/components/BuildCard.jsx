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
    this.checkMatch = this.checkMatch.bind(this);
    this.setCard = this.setCard.bind(this);
  }

  updateResults = (event) => {
    let timeout = null;
    if (event) this.setState({ query: event.target.value });
    this.checkMatch(event.target, event.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetch("cards/search?query=" + this.state.query)
        .then(res => res.json())
        .then(results => this.setState({ results: results }))
        .then(_ => (this.state.query === '' ? this.setState({ results: [] }) : null))
        .catch(e => console.log(e));
    }, 500);
  };

  checkMatch = (element, value) => {
    let datalist = element.parentNode.querySelector("#results");
    if (!datalist.options.length) return;
    if(Array.from(datalist.options).filter(option => option.value.toLowerCase() === value.toLowerCase()).length) {
      this.setCard(value);
    } else {
      this.state.card = {};
    }
  };

  setCard = (value) => {
    let matches = this.state.results.filter(card => card.name === value.replace("Reversed", ""));
    if (matches.length) {
      this.setState({ card: matches[0] });
    }
  };

  render() {
    return (
      <div className="BuildCard">
        <h2>build card</h2>
        <div className="flex flex-center vertical">
          <div>
            <input
              list="results"
              placeholder="search for a card"
              type="text"
              value={this.state.query}
              onChange={event => this.updateResults(event)}
            ></input>
            <datalist id="results">
              {this.state.results.map(card => (
                <option
                  key={card.name}
                  value={card.name + (this.state.reversed ? "Reversed" : "")}
                />
              ))}
            </datalist>
            <input
              type="checkbox"
              onChange={event =>
                this.setState({ reversed: event.target.checked })
              }
            ></input>
            reversed
            {this.state.card.name ? 
              <Card
                card={this.state.card}
                reversed={this.state.reversed}
              />
            : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default BuildCard;
