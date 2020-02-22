import React, { Component } from "react";
import "../App.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { card: {} };
  }


  render() {
    return (
      <div className="Card">
        <div key={this.state.card.name}>
          <div>{this.state.card.name}</div>
          <a
            href={this.state.card.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            more info
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
