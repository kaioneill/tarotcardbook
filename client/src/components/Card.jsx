import React, { Component } from "react";
import "../App.css";

class Card extends Component {

  render() {
    return (
      <div className="Card" key={this.props.card.name}>
        <div>
          <div>{this.props.card.name}</div>
          <a
            href={this.props.card.link}
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
