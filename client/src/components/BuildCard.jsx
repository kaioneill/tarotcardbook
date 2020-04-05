import React, { Component } from "react";
import "../App.css";
import Card from "./Card";

class BuildCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.card ? this.props.card.name : "",
      results: [],
      card: this.props.card || {},
      reversed: this.props.reversed || false,
    };
    this.updateResults = this.updateResults.bind(this);
    this.moveDropdown = this.moveDropdown.bind(this);
    this.cycleDropdown = this.cycleDropdown.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.setCard = this.setCard.bind(this);
    this.setReversed = this.setReversed.bind(this);
  }

  moveDropdown = (event) => {
    if (
      event.target.parentNode.querySelector(
        `#results${this.props.index} .dropdown-option`
      ) &&
      event.keyCode === 40
    ) {
      event.preventDefault();
      event.target.parentNode
        .querySelector(`#results${this.props.index} .dropdown-option`)
        .focus();
    }
  };

  cycleDropdown = (event) => {
    if (event.keyCode === 38) {
      if (event.target.previousSibling) {
        event.preventDefault();
        event.target.previousSibling.focus();
      } else {
        event.target.parentNode.previousSibling.previousSibling.focus();
      }
    } else if (event.keyCode === 40 && event.target.nextSibling) {
      event.preventDefault();
      event.target.nextSibling.focus();
    }
  };

  updateResults = (event) => {
    let timeout = null;
    if (event) this.setState({ query: event.target.value });
    // this.checkMatch(event.target, event.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetch("cards/search?query=" + this.state.query)
        .then((res) => res.json())
        .then((results) => this.setState({ results: results }))
        .then((_) =>
          this.state.query === "" ? this.setState({ results: [] }) : null
        )
        .catch((e) => console.log(e));
    }, 500);
  };

  checkMatch = (element, value) => {
    let datalist = element.parentNode.querySelector(
      `#results${this.props.index}`
    );
    if (!datalist.options.length) return;
    if (
      Array.from(datalist.options).filter(
        (option) => option.value.toLowerCase() === value.toLowerCase()
      ).length
    ) {
      this.setCard(value);
    } else {
      this.setState({ card: {} });
      this.props.removeCard(this.props.index);
    }
  };

  setCard = (value) => {
    let matches = this.state.results.filter(
      (card) => card.name === value.replace(" Reversed", "")
    );
    if (matches.length) {
      this.setState({ card: matches[0] });
      this.props.addCard(matches[0], this.props.index, this.state.reversed);
    }
  };

  setReversed = (event) => {
    if (this.state.card.name) {
      this.setState({ reversed: event.target.checked }, () => {
        this.props.addCard(
          this.state.card,
          this.props.index,
          this.state.reversed
        );
      });
    } else {
      this.setState({ reversed: event.target.checked });
    }
  };

  render() {
    return (
      <div className="BuildCard">
        <h2>{this.props.index}</h2>
        <div className="flex flex-center vertical">
          <div>
            <input
              // list={`results${this.props.index}`}
              placeholder="search for a card"
              type="text"
              value={this.state.query}
              onChange={(event) => this.updateResults(event)}
              onKeyUp={(event) => this.moveDropdown(event)}
            ></input>
            <br />
            <div id={`results${this.props.index}`} className="flex vertical">
              {this.state.results.map((card) => (
                <input
                  type="text"
                  className="dropdown-option"
                  key={card.name}
                  value={card.name + (this.state.reversed ? " Reversed" : "")}
                  onChange={() => {}}
                  onKeyUp={(event) => this.cycleDropdown(event)}
                >
                  {/* {card.name + (this.state.reversed ? " Reversed" : "")} */}
                </input>
              ))}
            </div>
            <br />
            <input
              type="checkbox"
              onChange={(event) => this.setReversed(event)}
              checked={this.state.reversed}
            ></input>
            reversed
            {this.state.card.name ? (
              <Card card={this.state.card} reversed={this.state.reversed} />
            ) : (
              <div className="card-size"></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BuildCard;
